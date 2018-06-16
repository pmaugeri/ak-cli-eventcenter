'use strict';

class akEventCenter {

    setup(options) {
	console.log("Setup command called")
    }

    hello(options) {
      console.log("Hello world!")
    }

    makeRequest(request) {
      return new Promise ((resolve, reject) => {
        this._nsClient.auth(request)
        this._nsClient.send((data, response) => {
          if (response.statusCode != 200) {
            reject("Unable to complete action.  Status code " + response.statusCode)
          } else {
            resolve(response)
          }
        })
      })
   }

}

module.exports = akEventCenter;
