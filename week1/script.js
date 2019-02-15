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
		this.open("GET", this.target, true);
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
		this.send();
	};

	then(succes,fail) {
		return this.promise().then(succes, fail);
	};

	catch(fail) {
		return this.promise().catch(fail);
	};

};




//Create subclass from the XHR constructor class
class ApiCall extends EasyRequest {
	//manditory for a class to receive params
	constructor(url) {
	  super(url);

	};
};



//let dribbble = new ApiCall("https://newsapi.org/v2/top-headlines?country=us&apiKey=0edf421b40a64d2fa263ad513a586ddc");


// dribbble
// 	.then((res) => {
// 		let data = JSON.parse(res);
// 		return data.articles;
// 	})
// 	.then((res) =>{
		
// 		return "bla";
// 	}).then((res) => {
// 		console.log(res);
// 	})
// 	.catch((err) => {
// 		throw new Error("Error: " + err);
// 	});


// // lets do something with data
// function injectPage(data) {
// 	data.forEach((d) => {
// 		createArticle(d);
// 	});
// };





class RenderEngine extends EasyRequest{

	constructor() {
		super('./templates/home.html');
	  this.template = '';
	  this.data = [{title:"Zekkie", content:"blaaa"}];
	  this.documentTarget = document.body;
	};

	magicReplacer(text, d) {
		const regex = new RegExp('\{(.*?)\}')
		let stripedTemplate = text;
		while(regex.test(stripedTemplate)) {
			let found = stripedTemplate.match(regex);
			stripedTemplate = stripedTemplate.replace(found[0], d[found[1]]);
		};
		return stripedTemplate;
	};


	buildDom(template) {
		let tempStr = '';

		this.data.forEach((d) => {
			tempStr += this.magicReplacer(template, d);
		});
		document.body.insertAdjacentHTML('afterbegin',tempStr);
	}

	render() {
		this.then((res) => {
			this.buildDom(res);
			//console.log(res)
		});
	};
};

const engine = new RenderEngine  ();

engine.render();



//build single article
// function createArticle(a) {
// 	let body = document.body;
// 	let img = new Image();
// 	img.src = a.urlToImage
// 	let articleBody = document.createElement("article");
// 	articleBody.data = a;
// 	let titleElement = document.createElement("h1");
// 	let titleTextNode = document.createTextNode(a.title);
// 	let rmBtn = document.createElement("a");
// 	rmBtn.href = "#/" + a.title;
// 	rmBtn.innerHTML = "Read more";
// 	titleElement.appendChild(titleTextNode);
// 	articleBody.appendChild(img).appendChild(titleElement).appendChild(rmBtn);
// 	body.appendChild(articleBody);
// };






//TODO

// class Cacher {
// 	constructor() {
// 	  this.date = new Date();
// 	  this.now = this.date.getTime();
// 	  this.cachedTime = 0;
// 	};

// 	checkTime() {
// 		this.cachedTime =+ parseInt(localStorage.getItem("time"));
// 		return (this.now - this.cachedTime) / 1000 / 60;
// 	};

// 	mutateTimeStamp() {
// 		if (this.checkTime() > 5) localStorage.setItem("time", this.now);  
// 	}
// };



// let testCacher = new Cacher();

// console.log(testCacher.checkTime());