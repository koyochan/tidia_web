'use client'

import { Fragment, useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductDetails from '@/components/ProductDetails'
import { useCart } from '@/context/CartContext'
import { fetchProductById, fetchProducts } from '@/lib/firestore'
import type { Product } from '@/types/product'
import { useNotification } from '@/context/NotificationContext'
import { useLanguage } from '@/context/LanguageContext'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import {
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'

function classNames(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}

const colorClassMap: Record<string, string> = {
  "Brass": "bg-[#B59A5A]",
  "Matte Black": "bg-[#1A1A1A]",
  "Silver": "bg-[#C0C0C0]",
  "Ivory": "bg-[#FDFCF8]",
  "Racing Green": "bg-[#004225]",
}

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const { addItem } = useCart()
  const { showNotification } = useNotification()
  const { language, t } = useLanguage()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [selectedMaterial, setSelectedMaterial] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!productId) return

    const loadData = async () => {
      try {
        const [found, allProducts] = await Promise.all([
          fetchProductById(productId),
          fetchProducts()
        ])

        if (found) {
          setProduct(found)
          setSelectedColor(found.colors[0] || "")
          setSelectedMaterial(found.materials[0] || "")
          
          // Current product以外の製品を表示
          const related = allProducts.filter(p => p.id !== productId).slice(0, 4)
          setRelatedProducts(related)
        }
      } catch (err) {
        console.error("Failed to fetch product data", err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [productId])

  if (loading) return (
    <div className="bg-ivory min-h-screen flex items-center justify-center font-jetbrains">
      LOADING...
    </div>
  )
  
  if (!product) return (
    <div className="bg-ivory min-h-screen flex items-center justify-center font-jetbrains">
      PRODUCT NOT FOUND
    </div>
  )

  // Price calculation
  const basePrice = product.price || 0
  let modifiersPrice = 0
  if (product.priceModifiers[selectedColor]) modifiersPrice += product.priceModifiers[selectedColor]
  if (product.priceModifiers[selectedMaterial]) modifiersPrice += product.priceModifiers[selectedMaterial]
  if (product.priceModifiers[`${selectedColor} ${selectedMaterial}`]) {
    modifiersPrice += product.priceModifiers[`${selectedColor} ${selectedMaterial}`]
  }
  const totalPrice = basePrice + modifiersPrice

  // Image switching
  let currentImage = product.images[0]
  const variantKey = `${selectedColor} ${selectedMaterial}`.trim()
  if (product.variantImages[variantKey]) {
    currentImage = product.variantImages[variantKey]
  } else if (product.variantImages[selectedColor]) {
    currentImage = product.variantImages[selectedColor]
  } else if (product.variantImages[selectedMaterial]) {
    currentImage = product.variantImages[selectedMaterial]
  }

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      priceId: product.priceId || "",
      name: product.name,
      basePrice: basePrice,
      modifiersPrice: modifiersPrice,
      totalPrice: totalPrice,
      priceString: `¥${totalPrice.toLocaleString()}`,
      color: selectedColor,
      material: selectedMaterial,
      imageSrc: currentImage,
      imageAlt: product.name,
      quantity: 1,
    })
    
    showNotification(
      t('product_detail.added_to_cart'),
      `${product.name} ${t('product_detail.added_to_cart_desc')}`
    )
  }

  return (
    <div className="bg-ivory font-noto">
      <Header />

      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8 py-24">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <TabGroup className="flex flex-col-reverse">
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <TabList className="grid grid-cols-4 gap-6">
                  {product.images.map((image, idx) => (
                    <Tab
                      key={idx}
                      className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium text-deep-black uppercase hover:bg-gray-50 focus:ring-3 focus:ring-brass/50 focus:ring-offset-4 focus:outline-hidden"
                    >
                      <span className="sr-only">画像 {idx + 1}</span>
                      <span className="absolute inset-0 overflow-hidden rounded-md border border-brass/20">
                        <img alt="" src={image} className="size-full object-cover" />
                      </span>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-selected:ring-brass"
                      />
                    </Tab>
                  ))}
                </TabList>
              </div>

              <TabPanels className="aspect-square w-full">
                <TabPanel>
                   <img 
                      alt={product.name} 
                      src={currentImage} 
                      className="aspect-square w-full object-cover sm:rounded-lg shadow-lg border border-brass/10" 
                    />
                </TabPanel>
                {/* Optional: Add other images if needed */}
              </TabPanels>
            </TabGroup>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-4xl font-bold tracking-tight text-deep-black font-playfair">{product.name}</h1>

              <div className="mt-3">
                <h2 className="sr-only">{t('product_detail.product_info')}</h2>
                <p className="text-3xl tracking-tight text-brass font-jetbrains font-medium">¥{totalPrice.toLocaleString()}</p>
              </div>

              <div className="mt-3">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(4 > rating ? 'text-brass' : 'text-gray-300', 'size-5 shrink-0')}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div
                  dangerouslySetInnerHTML={{ __html: product.i18n?.[language]?.description || '' }}
                  className="space-y-6 text-base text-deep-black/80 font-cormorant text-lg italic leading-relaxed"
                />
              </div>

              <form className="mt-6 space-y-8">
                {product.colors.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-deep-black font-jetbrains">Color</h3>
                    <div className="mt-2 flex items-center gap-x-3">
                      {product.colors.map((color) => (
                        <div key={color} className="flex flex-col items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            className={classNames(
                              colorClassMap[color] || "bg-gray-200",
                              selectedColor === color ? 'ring-2 ring-brass ring-offset-2' : '',
                              'size-10 rounded-full border border-black/10 transition-all'
                            )}
                          />
                          <span className="text-[10px] font-jetbrains uppercase tracking-tighter opacity-60">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {product.materials.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-deep-black font-jetbrains">Material</h3>
                    <div className="mt-2 grid grid-cols-3 gap-3">
                      {product.materials.map((material) => (
                        <button
                          key={material}
                          type="button"
                          onClick={() => setSelectedMaterial(material)}
                          className={classNames(
                            selectedMaterial === material
                              ? 'bg-racing-green text-ivory'
                              : 'bg-ivory text-deep-black border-brass/30 hover:border-brass',
                            'border rounded-md py-2 px-3 text-xs font-jetbrains uppercase flex items-center justify-center transition-colors'
                          )}
                        >
                          {material}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-10 flex">
                  <button
                    type="submit"
                    onClick={handleAddToCart}
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-racing-green px-8 py-3 text-base font-bold text-ivory hover:bg-deep-black focus:ring-2 focus:ring-racing-green focus:ring-offset-2 focus:ring-offset-ivory focus:outline-hidden sm:w-full font-jetbrains uppercase tracking-widest transition-colors"
                  >
                    {t('product_detail.add_to_cart')}
                  </button>
                </div>
              </form>

              <section className="mt-12 divide-y divide-brass/20 border-t border-brass/20">
                <Disclosure as="div">
                  <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
                    <span className="text-sm font-medium text-deep-black group-data-open:text-racing-green font-playfair text-lg">{t('product_detail.specifications')}</span>
                    <span className="ml-6 flex items-center">
                      <PlusIcon className="block size-6 text-brass/60 group-data-open:hidden" />
                      <MinusIcon className="hidden size-6 text-racing-green group-data-open:block" />
                    </span>
                  </DisclosureButton>
                  <DisclosurePanel className="pb-6">
                    <dl className="grid grid-cols-1 gap-y-4 text-sm font-noto">
                      <div className="flex justify-between border-b border-brass/10 pb-2">
                        <dt className="text-deep-black/60">{t('product_detail.dimensions')}</dt>
                        <dd className="text-deep-black">{product.dimensions}</dd>
                      </div>
                      <div className="flex justify-between border-b border-brass/10 pb-2">
                        <dt className="text-deep-black/60">{t('product_detail.weight')}</dt>
                        <dd className="text-deep-black">{product.weight}</dd>
                      </div>
                      <div className="flex justify-between border-b border-brass/10 pb-2">
                        <dt className="text-deep-black/60">{t('product_detail.shipping_estimate')}</dt>
                        <dd className="text-deep-black">{product.i18n?.[language]?.shippingEstimate}</dd>
                      </div>
                    </dl>
                  </DisclosurePanel>
                </Disclosure>
              </section>
            </div>
          </div>

          <ProductDetails product={product} />

          <section className="mt-16 border-t border-brass/20 pt-16">
            <h2 className="text-2xl font-bold text-deep-black font-playfair">{t('product_detail.related_products')}</h2>
            <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((rel) => (
                <div key={rel.id} className="group relative">
                  <div className="aspect-square w-full overflow-hidden rounded-lg border border-brass/10">
                    <img src={rel.images[0]} alt={rel.name} className="h-full w-full object-cover group-hover:opacity-75 transition-opacity" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-deep-black font-playfair">
                      <a href={`/products/${rel.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {rel.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-deep-black/60 font-cormorant italic">{rel.i18n?.[language]?.subDescription}</p>
                    <p className="mt-1 text-sm font-medium text-brass font-jetbrains">¥{(rel.price || 0).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
