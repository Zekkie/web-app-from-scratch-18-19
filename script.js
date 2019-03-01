'use strict';

import App from './modules/app.js';

const newsApp = new App();







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