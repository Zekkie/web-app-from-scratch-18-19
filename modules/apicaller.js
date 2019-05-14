'use-strict'
import EasyRequest from './easyrequest.js';

class ApiCall extends EasyRequest {
	//manditory for a class to receive params
	constructor() {
	  super();
	  this.data = [];
	  this.key = "apiKey=0edf421b40a64d2fa263ad513a586ddc";
	  this.base = "https://newsapi.org/v2/";
	  this.filter = null;
	};



	sanitize(data) {

		const saneData = data.map(this.filter);
		console.log(saneData);
	};


	buildUrl(endpoint) {
		return this.base+endpoint+"?"+this.key;
	}

	search(endpoint,filter) {
		this.filter = filter;
		super.open("GET",this.buildUrl(endpoint),true);
		super.send();

		this.then(r=>{
			this.sanitize(JSON.parse(r)[endpoint]);
		});
		
	};

};

export default ApiCall;