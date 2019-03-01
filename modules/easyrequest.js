'use-strict'

class EasyRequest extends XMLHttpRequest{
	constructor(target) {
	  super();
	  this.target = target;
	};

	promise() {
		return new Promise((resolve, reject) => {
			this.executor(resolve, reject);
		});
	};

	executor(resolve, reject) {
		this.onload = () => {
			if(this.status >= 200 && this.status < 400) {
				resolve(this.response);
			}else {
				reject(this.status);
			};
		};

		this.onerror = () => {
			reject(this.response);
		};	
	};

	then(succes,fail) {
		return this.promise().then(succes, fail);
	};

	catch(fail) {
		return this.promise().catch(fail);
	};

};

export default EasyRequest;