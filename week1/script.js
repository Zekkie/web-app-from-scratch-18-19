'use-strict'



class ApiCall extends XMLHttpRequest {
	
	constructor(method,url) {
	  super(method,url);
	
	  this.url = url
	  this.method = method
	}

	promise() {
		return new Promise((resolve, reject) => {
			this.executor(resolve, reject)
		})
	}

	executor(resolve, reject) {
		this.open(this.method,this.url,true);
		this.onload = (request) => {
			if(request.currentTarget.status >= 200 && request.currentTarget.status <= 400) {
				resolve(request.currentTarget.response)
			}
		}
		this.send();
	}

	then(success, fail) {
		return this.promise().then(success, fail)
	}

	catch(fail) {
		return this.promise().catch(fail);
	}

}


let dribbble = new ApiCall("get","https://api.dribbble.com/v2/user?access_token=e351780d7717f3e272a8ee6c3c629217b8a26fd7debe1402cfce1b2f7e0ece23");

dribbble.then((res) => {
	console.log(res);
	return "yo"
}).then((res) => {
	console.log(res)
})