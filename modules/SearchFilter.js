class Filter{
	constructor() {
		this.elements = [];
		
		this.input = document.querySelector("[type=text]");
		this.kb = null;
		this.container = null;
	}
	
	init() {
		if(window.location.hash === "#home") {
			this.elements = document.querySelectorAll(".source");
			this.container = document.querySelector("#view");
			this.kb = this.input.addEventListener("keyup",this.handleFilter.bind(this),true);
			console.log(this.container);
		}
	}

	destroy() {
		if(this.kb !== null) {
			this.input.removeEventListener("keyup", this.handleFilter());
		}
	}

	handleFilter() {
		console.log(this.container)
		this.container.innerHTML = "";
		const newElements = [];
		console.log(this.input.value);
		for(let i = 0; i < this.elements.length; i++) {
		    if(this.elements[i].querySelector("h1").innerHTML.toLowerCase().indexOf(this.input.value) >= 0) {
		      newElements.push(this.elements[i])
		    }
  		}


  		 for(let i = 0; i < newElements.length;i++) {
      		this.container.appendChild(newElements[i])
   		}
	}



}

export default Filter;