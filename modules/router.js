import RenderEngine from "./renderengine.js";
import ApiCaller from "./apicaller.js";
import Filter from "./SearchFilter.js";
const renderer = new RenderEngine();
const api = new ApiCaller();
const filter = new Filter();




class Router{
	constructor(initial) {	
	  this.routes = [];
	  this.initialRoute = initial;
	  this.loadInterval = null;
	  if(!window.location.hash){
	  	console.log(window.location.hash);
	  	window.location.hash = this.initialRoute;
	  };
	  window.onload = () => {
	  	this.handleRoute();
	  	this.hashChange = window.addEventListener("hashchange",this.handleRoute.bind(this),true);
	  };
	};
	hash() {
		return window.location.hash.substr(1);
	};
	handleRoute(e) {
		this.showLoader();
		if(e) {
			this.eventFired = true;
		}

		if(window.location.hash !== "#home") {
			filter.destroy();
		}
		const param = this.hash();	
		this.findMatch(param);
	};

	showLoader() {
		console.log("check")
		if(!document.querySelector("#loader")) {
			document.querySelector("#view").innerHTML = `
				<div id="loader">
					<h1>
						Loading.
					</h1>
					<p id="loading-message"></p>
				</div>
			`;
		}
		this.loadInterval = setTimeout( function(){
				const loadingBox = document.querySelector("#loading-message");
				if(loadingBox) {
					loadingBox.innerText = "Loading takes too long, might want to come back later <3.."
				};
			},3000);
	}

	findMatch(hash) {
		const keys = hash.split("/")
		const dir = keys[0];
		const id = keys[1];
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
				clearTimeout(this.loadInterval);
				renderer
					.setTemplate(route.template)
					.render(i,function() {
						filter.init();
					});
					
			});
		};
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