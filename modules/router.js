import RenderEngine from "./renderengine.js";
import ApiCaller from "./apicaller.js";

const renderer = new RenderEngine();
const api = new ApiCaller();


class Router{
	constructor(initial) {	
	  this.hashChange = window.addEventListener("hashchange",this.handleRoute.bind(this),true);
	  
	  this.routes = [];
	  this.initialRoute = initial;
	  this.init();
	};

	hash() {
		return window.location.hash.substr(1);
	}

	handleRoute(e) {
		const param = this.hash();	


		this.findMatch(param);
	}

	findMatch(hash) {
		const keys = hash.split("/")
		const dir = keys[0];


		let route = this.routes.find((i) => {
			return i.route === dir;
		})

		if(!route) {
			route = this.routes.find((i) => {
				return i.route === "*";
			});

			console.log(renderer)
			renderer
				.setTemplate(route.template)
				.render();
		}else {
			api.search(route.endpoint,route.filter);
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
	init() {
		window.location.hash = this.initialRoute;
	};
};

export default Router;