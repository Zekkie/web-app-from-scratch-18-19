'use strict';

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
				language: o.language,
			};
		}
	})
	.route({
		route: "articles",
		template: "articles.html",
		endpoint:"everything?sources=",
		filter: (o) => {
			return {
				url:o.url,
				image: o.urlToImage ? o.urlToImage : "./img/no-img.png",
				title: o.title,
				content: o.content ? o.content.replace(/ *\[[^)]*\] */g,"") : null,
			}
		}
	})
	.route({
		route:"*",
		template:"404.html"
	});
