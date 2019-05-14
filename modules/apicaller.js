'use-strict'
import EasyRequest from './easyrequest.js';

class ApiCall extends EasyRequest {
	//manditory for a class to receive params
	constructor() {
	  super();
	  this.data = [];
	};

	init() {
		return this.then(res => {
			
			return JSON.parse(res);
		}).then(res => {
			return res.articles;
		}).then(res => {
			return this.sanitize(res)
		})
	};

	sanitize(data) {
		let node = {};
		let cleanList = []

		data.map(d => {
			cleanList.push({
				title: d.title,
				caption: d.description,
				content: d.content,
				author: d.author,
				published: d.publishedAt,
				image: d.urlToImage
			});
		});
		this.data = cleanList;
		return this.data;
	};

	search(query) {
		super.open("GET",`https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=0edf421b40a64d2fa263ad513a586ddc`,true);
		super.send();
		return this.init()
	};

};

export default ApiCall;