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
		return data.map(this.filter);
	};


	buildUrl(endpoint,id) {
		if(id) {
			return this.base+endpoint+id+"&"+this.key
		}
		return this.base+endpoint+"?"+this.key;
	}

	findDataArray(object) {
		const keys = Object.keys(object);
		for(let i = 0; i < keys.length;i++) {
			if(object[keys[i]].push) {
				return object[keys[i]];
				break;
			}
		}
	}

	search(endpoint,filter,id) {
		this.filter = filter;
		super.open("GET",this.buildUrl(endpoint,id),true);
		super.send();
		return this.then(r=>{
			const object = JSON.parse(r);
			return this.sanitize(this.findDataArray(object));
		});
		
	};

};

export default ApiCall;