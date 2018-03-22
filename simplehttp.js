class SimpleHttp {

  constructor() {
    // empty for now
    this.xhr = undefined
    this.success = function() { console.log("Success") }
    this.timeout = function() { console.log("Timeout") }
    this.error = function() { console.log("Error") }
    this.serverError = this.error
    this.clientError = this.error
    this.redirect = function() { /* empty  by default */ }
    this.default = function() { console.log("Response") }

    // initialize specific status code events
    this.statusEvents = new Array(600)
  }


  // reset xhr object to make new request
  resetXhr() {
    this.xhr = new XMLHttpRequest()
    var _this = this
    // define callbacks
    this.xhr.onload = function() {
      // custom function for http code
      if(typeof _this.statusEvents[this.status] === 'function') {
        _this.statusEvents[this.status]()
        return
      }

      if(this.status === 200) {
        _this.success()
        return
      }

      if(this.status >= 500) {
        _this.serverError()
      } else if(this.status >= 400) {
        _this.clientError()
      } else if(this.status >= 300) {
        _this.redirect()
      } else {
        _this.default()
      }

    }

    // timeout callback
    this.xhr.ontimeout = _this.timeout

    // progress simplification
    this.xhr.onprogress = function(e) {
      var percent
      if (e.lengthComputable) {
        percent = Math.floor((e.loaded / e.total) * 100)
      }
      _this.progress(percent, e)
    }
  }

  /*
  * REQUESTS
  */
  // default reques method
  request(method = "GET", action, params) {
    this.resetXhr()
    this.xhr.open(method, action)
    if(params != undefined)
      this.xhr.send(params)
    else {
      this.xhr.send()
    }

    // chaining
    return this
  }

  // shortcuts to http methods
  get(action, params) {
    return this.request("GET", action, params)
  }

  post(action, params) {
    return this.request("POST", action, params)
  }
  //TODO add all HTTP methods

  //TODO advanced requests (ex:postJSON, getJSON, postFormData, getImage...)

  /*
   * EVENTS
   */
  // event settings
  onSuccess(successFunction) {
    this.success = successFunction
    // chaining
    return this
  }
  onError(errorFunction) {
    this.error = errorFunction
    // chaining
    return this
  }
  onClientError(errorFunction) {
    this.error = errorFunction
    // chaining
    return this
  }
  onServerError(errorFunction) {
    this.error = errorFunction
    // chaining
    return this
  }
  onTimeout(timeoutFunction) {
    this.timeout = timeoutFunction
    // chaining
    return this
  }
  // custom event for specific status
  onStatus(statusCode, statusFunction) {
    this.statusEvents[statusCode] = statusFunction
    // chaining
    return this
  }
  onProgress(progressFunction) {
    this.progress = progressFunction
    // chaining
    return this
  }


}
