'use strict';

// import App from './modules/app.js';

// const newsApp = new App();

import Router from './modules/router.js';


const router = new Router("home");

router
	.route({
		route: "home",
		template:"home.html"
	})