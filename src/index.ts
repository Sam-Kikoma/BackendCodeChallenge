import { createBatches } from "./batch.js";
import ExternalService from "./externalService.js";
import { parseXML } from "./xmlParser.js";

export async function main() {
	const filePath = "./feed.xml";

	const products = await parseXML(filePath);
	console.log(`Total valid products: ${products.length}\n`);

	const batches = createBatches(products);
	console.log(`Created ${batches.length} batches\n`);

	const service = ExternalService();

	for (const batch of batches) {
		service.call(batch);
	}
}

main();
