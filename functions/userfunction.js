UserFunction = function() {

    this.users = function() {
      console.log("Global Functions")
    };
    
  };
  
  exports.userfunction = UserFunction;