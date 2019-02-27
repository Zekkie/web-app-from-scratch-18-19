'use-strict'

import EasyRequest from './easyrequest.js';

class RenderEngine extends EasyRequest{

	constructor() {
		super('./templates/home.html');
	  this.template = '';
	  this.data = [{title:"Zekkie", content:"blaaa", caption: "Lorem tripsum"}];
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
			console.log(this)
		});
	};
};

export default RenderEngine;