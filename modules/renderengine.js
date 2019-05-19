import EasyRequest from './easyrequest.js';

class RenderEngine extends EasyRequest{

	constructor() {
		super();
	  this.template = '';
	  this.data = [];
	  this.documentTarget = document.getElementById("view");
	  this.dir = "./templates/"
	  this.templateRoute = "";
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


	buildDataRoute(data,template) {
		let tempStr = '';
		data.forEach((d) => {
			tempStr += this.magicReplacer(template, d);
		});
		this.documentTarget.innerHTML = tempStr;
	}

	buildRoute(template) {
		this.documentTarget.innerHTML = template;
	};

	buildDom(template) {
		if(this.data) {
			this.buildDataRoute(this.data,template);
		}else {
			this.buildRoute(template);
		}
	}

	setTemplate(temp) {
		this.templateRoute = this.dir + temp;
		return this;
	} 

	render(data,cb) {
		super.open("GET",this.templateRoute,true);
		super.send();
		this.data = data;
		this.then((res) => {
			this.buildDom(res);
			cb();
		});
	};
};

export default RenderEngine;