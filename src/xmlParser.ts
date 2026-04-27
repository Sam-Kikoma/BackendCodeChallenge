import { Product, XmlItem, XmlRoot } from "./types.js";
import fs from "fs";
import xml2js from "xml2js";

export const parseXML = async (filePath: string): Promise<Product[]> => {
	let xmlData: string;
	try {
		xmlData = await fs.promises.readFile(filePath, "utf8");
	} catch (error: unknown) {
		let errorMessage = "Error reading the file";
		if (error instanceof Error) {
			errorMessage += error.message;
		}
		throw new Error(errorMessage);
	}

	const parser = new xml2js.Parser();
	const result: XmlRoot = await parser.parseStringPromise(xmlData);

	const channel = result.rss?.channel?.[0];
	if (!channel?.item) {
		return [];
	}

	return channel.item
		.map((item: XmlItem) => ({
			id: item["g:id"]?.[0]?.trim() ?? "",
			title: item.title?.[0].trim() ?? "",
			description: item.description?.[0]?.trim() ?? "",
		}))
		.filter((product): product is Product => Boolean(product.id && product.title && product.description));
};
