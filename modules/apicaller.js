'use-strict'
import EasyRequest from './easyrequest.js';

class ApiCall extends EasyRequest {
	//manditory for a class to receive params
	constructor(url) {
	  super(url);

	};
};

export default ApiCall;