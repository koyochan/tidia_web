import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="relative isolate min-h-screen">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75"
        className="absolute inset-0 -z-10 size-full object-cover object-top"
      />
      <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8 bg-deep-black/30 min-h-screen flex flex-col justify-center">
        <p className="text-base/8 font-semibold text-ivory font-jetbrains">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-ivory sm:text-7xl font-playfair">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-ivory/70 sm:text-xl/8 font-cormorant italic">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex justify-center">
          <Link href="/" className="text-sm/7 font-semibold text-ivory hover:text-white transition-colors font-jetbrains uppercase tracking-widest border border-ivory/30 px-6 py-2 rounded-md hover:bg-ivory hover:text-deep-black">
            <span aria-hidden="true">&larr;</span> Back to home
          </Link>
        </div>
      </div>
    </main>
  )
}
