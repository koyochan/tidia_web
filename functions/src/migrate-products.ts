/**
 * Migration: Stripe metadata → top-level fields
 *
 * Usage (from functions/ directory):
 *   npm run build
 *   node lib/migrate-products.js
 */
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp({ credential: applicationDefault() });
const db = getFirestore();

async function migrate() {
  const snapshot = await db.collection("products").get();
  console.log(`Found ${snapshot.size} products`);

  for (const docSnap of snapshot.docs) {
    const raw = docSnap.data();
    const m: Record<string, string> = raw.metadata ?? {};

    const colors = m.color
      ? m.color.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const materials = m.material
      ? m.material.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const priceModifiers: Record<string, number> = {};
    if (m.price_modifiers) {
      for (const entry of m.price_modifiers.split(",")) {
        const [key, val] = entry.split(":").map((s) => s.trim());
        if (key && val) priceModifiers[key] = parseInt(val, 10);
      }
    }

    const variantImages: Record<string, string> = {};
    if (m.variant_images) {
      for (const pair of m.variant_images.split("|")) {
        const [key, ...urlParts] = pair.split("::").map((s) => s.trim());
        const url = urlParts.join("::");
        if (key && url) variantImages[key] = url;
      }
    }

    const update: Record<string, unknown> = {
      index: m.index ? parseInt(m.index, 10) : 0,
      colors,
      materials,
      priceModifiers,
      variantImages,
      dimensions: m.dimensions ?? "",
      weight: m.weight ?? "",
      stock: m.stock_limit ? parseInt(m.stock_limit, 10) : 0,
      i18n: {
        ja: {
          description: raw.description ?? "",
          subDescription: m.sub_description ?? "",
          shippingEstimate: m.shipping_estimate ?? "",
        },
      },
    };

    console.log(`Migrating ${docSnap.id} (${raw.name})...`);
    await docSnap.ref.update(update);
    console.log("  done");
  }

  console.log("\nMigration complete.");
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
