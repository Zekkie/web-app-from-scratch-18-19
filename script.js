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




	const hashChane = () => {
		const input = document.querySelector("[type=text]");
		const container = document.querySelector("#view");
		const elements = document.querySelectorAll(".source");


		const removeChildren = function(cb) {
		  for(let i = 0; i < container.children.length; i++) {
		    container.removeChild(container.children[i]);
		  }
		}


		const kbHandler = function(){
		  const newElements = [];
		  for(let i = 0; i < elements.length; i++) {

		    if(elements[i].innerHTML.toLowerCase().indexOf(this.value) >= 0) {
		      newElements.push(elements[i])
		    }
		  }
		  
		  
		  container.innerHTML = "";
		  
		    for(let i = 0; i < newElements.length;i++) {
		      container.appendChild(newElements[i])
		    }
		  
		 
		  console.log(newElements)
		}

		input.addEventListener("keyup",kbHandler.bind(input),true);
		console.log(elements)
	}
	

window.addEventListener("hashchange",hashChane,true)