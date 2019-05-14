import RenderEngine from "./renderengine.js";
import ApiCaller from "./apicaller.js";

const renderer = new RenderEngine();
const api = new ApiCaller();


class Router{
	constructor(initial) {	
	  this.routes = [];
	  this.initialRoute = initial;
	  if(!window.location.hash){
	  	console.log(window.location.hash)
	  	window.location.hash = this.initialRoute;
	  }
	  

	  window.onload = () => {
	  	this.handleRoute()
	  	this.hashChange = window.addEventListener("hashchange",this.handleRoute.bind(this),true);
	  }
	};

	hash() {
		return window.location.hash.substr(1);
	}

	handleRoute(e) {
		if(e) {
			this.eventFired = true;
		}
		const param = this.hash();	
		this.findMatch(param);
	}

	findMatch(hash) {
		const keys = hash.split("/")
		const dir = keys[0];
		const id = keys[1]
		let route = this.routes.find((i) => {
			return i.route === dir;
		})
		if(!route) {
			route = this.routes.find((i) => {
				return i.route === "*";
			});
			renderer
				.setTemplate(route.template)
				.render();
		}else {
			api.search(route.endpoint,route.filter,id)
				.then(i => {
				renderer
					.setTemplate(route.template)
					.render(i)
			})
		}
	};
	

	route(route) {
		if(typeof route != "object") {
			console.error("Type of input is "+typeof route+". Expected an object");
		}else {
			this.routes.push(route);
		}
		return this;
	}
};

export default Router;