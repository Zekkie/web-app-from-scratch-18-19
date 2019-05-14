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
		console.log(hash)

		if(hash.length === 1 && hash === "/") {
			console.log("home");
		}else{
			const pathDeconstructed = hash.split("/");

			let matches = [];

			

			const o = this.routes.find((i) => {

				return i.route === pathDeconstructed[0];
			})

			console.log(o)

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