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
		

		if(hash.length === 1 && hash === "/") {
			console.log("home");
		}else{
			const pathDeconstructed = hash.split("/");

			let matches = [];

			pathDeconstructed.forEach((p) => {
				matches = this.routes.find((r) => {
					 return console.log(r.route.indexOf(p) > 0);
				});
			});

			console.log(matches);

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

	init() {
		window.location.hash = this.initialRoute;
	};
};

export default Router;