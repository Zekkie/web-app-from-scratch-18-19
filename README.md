# WAFS

## API
 I'm using the api of the newsapi. Funny enough that is the actual name of the api. 
 [Can be found here](https://newsapi.org)


## App discription

The is basicly a news reader where users can read newsarticles of different papers. The ratelimit for the DEV api is unfortunatly only 1000 requests per day.

## What have I been doing untill  now
I came across some problems with the API I initially wanted to use. Important part's are no longer usable without the aproval of the author first. And Oauth.. You don't want to come across this during this assignment.
I've been experimenting with classes and inheriting in JS. Came up with a solution that might be redundant, but I think it is a good exercise. 


## Actor Diagram

![Diagram](./assets/actor_diagram.jpg)

## Actor Diagram

![Diagram](./assets/interaction_diagram.jpg)
		

## Custom render engine 
```javascript

'use-strict'

import EasyRequest from './easyrequest.js';

class RenderEngine extends EasyRequest{

	constructor() {
		super('./templates/home.html');
	  this.template = '';
	  this.data = [];
	  this.documentTarget = document.body;
	};

	magicReplacer(text, d) {
		const regex = new RegExp('\{(.*?)\}')
		let stripedTemplate = text;
		while(regex.test(stripedTemplate)) {
			let found = stripedTemplate.match(regex);
			stripedTemplate = stripedTemplate.replace(found[0], d[found[1]]);
		};
		return stripedTemplate;
	};


	buildDom(template) {
		let tempStr = '';
		this.data.forEach((d) => {
			tempStr += this.magicReplacer(template, d);
		});
		document.body.insertAdjacentHTML('afterbegin',tempStr);
	}

	render() {
		this.then((res) => {
			this.buildDom(res);
			console.log(this)
		});
	};
};

export default RenderEngine;

```

## Why classes

My motivation for the use of classes is, I always try to build my code in a way so it is modular and serves multiple usecases. Using classes in my opinion helps with this.


## Class extensions

```javascript
class RenderEngine extends EasyRequest{

```


## Design patterns

At this moment I'm using the OOP design pattern. Later during the assignment I'm going to make use of the module pattern. Maybe even IIFE's. 



## Wishes for the app

I want to give the user the possibility not only to read the news that is on the homepage. But where they can browse to other news sources/papers. So the news is not just limited to one source.



### To be continued