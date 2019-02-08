'use-strict'

//Create subclass from the XHR constructor class
class ApiCall extends XMLHttpRequest {
	//manditory for a class to receive params
	constructor(method,url) {
	  super(method,url);
	
	  this.url = url
	  this.method = method;
	};
	//Promise function
	promise() {
		return new Promise((resolve, reject) => {
			this.executor(resolve, reject);
		});
	};
	//Handling xhr requests
	executor(resolve, reject) {
		this.open(this.method,this.url,true);
		this.onload = (request) => {
			if(request.currentTarget.status >= 200 && request.currentTarget.status <= 400) {
				resolve(request.currentTarget.response);
			}else {
				reject(request.currentTarget.status);
			}
		}
		this.send();
	};
	//returns the then/catch methods of the promise
	then(success, fail) {
		return this.promise().then(success, fail);
	};
	catch(fail) {
		return this.promise().catch(fail);
	};
};





let dribbble = new ApiCall("get","https://newsapi.org/v2/top-headlines?country=us&apiKey=0edf421b40a64d2fa263ad513a586ddc");


dribbble
.then((res) => {
	let data = JSON.parse(res);
	return data.articles;
})
.then((res) =>{
	injectPage(res);
})
.catch((err) => {
	throw new Error("Error: " + err);
});


// lets do something with data
function injectPage(data) {
	data.forEach((d) => {
		createArticle(d);
	});
};


//build single article
function createArticle(a) {
	let body = document.body;
	let img = new Image();
	img.src = a.urlToImage
	let articleBody = document.createElement("article");
	articleBody.data = a;
	let titleElement = document.createElement("h1");
	let titleTextNode = document.createTextNode(a.title);
	let rmBtn = document.createElement("a");
	rmBtn.href = "#/" + a.title;
	rmBtn.innerHTML = "Read more";

	titleElement.appendChild(titleTextNode);
	articleBody.appendChild(img);
	articleBody.appendChild(titleElement);
	articleBody.appendChild(rmBtn);
	body.appendChild(articleBody);
	
};

function apiCheck(){

	let date = new Date();
	if(localStorage.getItem("time")) {
		let newTime = new Date();
		let newMS = newTime.getTime();
		let oldTime = parseInt(localStorage.getItem("time"));
		console.log((newMS-oldTime)/1000/60);
	}else {
		localStorage.setItem("time", date.getTime());
	}
	
	//console.log(date.getTime());

}

apiCheck();