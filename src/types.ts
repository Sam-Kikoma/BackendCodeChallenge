export interface XmlItem {
	"g:id": string[];
	title: string[];
	description: string[];
}

export interface XmlChannel {
	item: XmlItem[];
}

export interface XmlRoot {
	rss: {
		channel: XmlChannel[];
	};
}

export interface Product {
	id: string;
	title: string;
	description: string;
}
