import { MAX_BATCH_SIZE } from "./constants.js";
import type { Product } from "./types.js";

export function createBatches(products: Product[]): string[] {
	const batches: string[] = [];
	let currentBatch: Product[] = [];
	let currentSize = 2;

	for (const product of products) {
		const entry = JSON.stringify(product);
		const entrySize = Buffer.byteLength(entry, "utf8");

		if (entrySize > MAX_BATCH_SIZE) {
			console.warn(
				`Warning: product "${product.id}" is ${entrySize} bytes, exceeds max batch size of ${MAX_BATCH_SIZE} — skipping.`,
			);
			continue;
		}

		const addedSize = currentBatch.length === 0 ? entrySize : entrySize + 1;

		if (currentSize + addedSize > MAX_BATCH_SIZE && currentBatch.length > 0) {
			batches.push(JSON.stringify(currentBatch));
			currentBatch = [product];
			currentSize = 2 + entrySize;
		} else {
			currentBatch.push(product);
			currentSize += addedSize;
		}
	}

	if (currentBatch.length > 0) {
		batches.push(JSON.stringify(currentBatch));
	}

	return batches;
}
