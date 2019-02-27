'use strict';

import Router from './modules/router.js';


const router = new Router();

router
	.route({template:'./templates/home.html', route:'/'})
	.route({template:'./templates/article.html', route:'/article/:id'})
	.route({template: './templates/fourohfour.html', route: '*'});





















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