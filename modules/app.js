
import ApiRequest from "./apicaller.js";
import RenderEngine from "./renderengine.js"

class App {
	constructor(props) {
	  this.state = {
	  	data: []
	  };
	  this.renderer = new RenderEngine();
	  this.apicaller = new ApiRequest();
	  this.uiBtn = document.getElementById("search-btn");
	  this.uiField = document.getElementById("search-field");
	  

	  this.uiBtn.addEventListener("click", this.find.bind(this),true)

	}

	find() {
		let val = this.uiField.value;
		this.apicaller.search(val).then(res=> {
	  	this.renderer.render(res)
	  })
	}

	setState(obj) {
		if(typeof obj != "object") {
			console.error("Expected object, received: " +typeof obj)
		}else {
			Object.assign(this.state, obj);
		};
	};

};


export default App;