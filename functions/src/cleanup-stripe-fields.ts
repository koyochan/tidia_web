/**
 * Cleanup: Remove stripe_metadata_* fields and metadata map from products
 *
 * Usage (from functions/ directory):
 *   npm run build
 *   GCLOUD_PROJECT=tidia-b3a16 node lib/cleanup-stripe-fields.js
 */
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

initializeApp({ credential: applicationDefault() });
const db = getFirestore();

async function cleanup() {
  const snapshot = await db.collection("products").get();
  console.log(`Found ${snapshot.size} products`);

  for (const docSnap of snapshot.docs) {
    const raw = docSnap.data();
    const deletes: Record<string, FieldValue> = {};

    // Remove all stripe_metadata_* fields
    for (const key of Object.keys(raw)) {
      if (key.startsWith("stripe_metadata_")) {
        deletes[key] = FieldValue.delete();
      }
    }

    // Remove metadata map
    if (raw.metadata) {
      deletes["metadata"] = FieldValue.delete();
    }

    // Remove role (null field)
    if ("role" in raw) {
      deletes["role"] = FieldValue.delete();
    }

    // Remove tax_code (null field)
    if ("tax_code" in raw) {
      deletes["tax_code"] = FieldValue.delete();
    }

    const fieldCount = Object.keys(deletes).length;
    if (fieldCount === 0) {
      console.log(`${docSnap.id} (${raw.name}): nothing to remove`);
      continue;
    }

    console.log(`${docSnap.id} (${raw.name}): removing ${fieldCount} fields...`);
    await docSnap.ref.update(deletes);
    console.log("  done");
  }

  console.log("\nCleanup complete.");
}

cleanup().catch((err) => {
  console.error(err);
  process.exit(1);
});
