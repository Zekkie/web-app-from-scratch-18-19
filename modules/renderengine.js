import EasyRequest from './easyrequest.js';

class RenderEngine extends EasyRequest{

	constructor() {
		super();
	  this.template = '';
	  this.data = [];
	  this.documentTarget = document.getElementById("view");

	};

	magicReplacer(text, d) {
		const regex = new RegExp('\{(.*?)\}')
		let stripedTemplate = text;
		while(regex.test(stripedTemplate)) {
			let found = stripedTemplate.match(regex);
			stripedTemplate = stripedTemplate.replace(found[0], d[found[1]]? d[found[1]] : "" );
		};
		return stripedTemplate;
	};


	buildDom(template) {
		let tempStr = '';
		this.data.forEach((d) => {
			console.log(d);
			tempStr += this.magicReplacer(template, d);
		});
		this.documentTarget.insertAdjacentHTML('afterbegin',tempStr);
	}

	render(data) {
		super.open("GET","./templates/home.html",true);
		super.send()
		this.data = data;
		console.log(data);
		this.then((res) => {
			this.buildDom(res);
		});
	};
};

export default RenderEngine;