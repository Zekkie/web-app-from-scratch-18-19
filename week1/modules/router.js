class Router{
	constructor(props) {	
	  this.hashChange = window.addEventListener("hashchange",this.handleRoute.bind(this),true);
	  this.init();
	  this.routes = [];
	};

	hash() {
		return window.location.hash.substr(1);
	}

	handleRoute(e) {
		const param = this.hash();		
		this.findMatch(param);
	}

	findMatch(hash) {
		
		if(hash.length > 1) {
			let pattern = '\/(.*)|\/(.*?)\/';
			let match = hash.match(pattern);
			console.log(match);
		} else {
			console.log("short hash")
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
		window.location.hash = "/";
	};
};

export default Router;