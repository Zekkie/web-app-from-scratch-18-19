'use strict';

// import App from './modules/app.js';

// const newsApp = new App();

import Router from './modules/router.js';


const router = new Router("home");

router
	.route({
		route: "home",
		template:"home.html",
		endpoint:"sources",
		filter: (o) => {
			return {
				id: o.id,
				description: o.description,
				title: o.name,
				language: o.language
			}
		}
	})
	.route({
		route:"*",
		template:"404.html"
	})