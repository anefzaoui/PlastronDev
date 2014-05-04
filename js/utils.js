function $(id){
  return document.getElementById(id);
}

var utils = {

  // Add all event listeners for all buttons in App.
  btnListeners : function(){
    $("NextToPass").addEventListener('click', function(evt) {
      Animation.nextLayer('setup','password');
    });
    $("NextToConfigDone").addEventListener('click', function(evt) {
      var inputPass = $("enterPasswordToSave").value, inputPassConfirm = $("enterPasswordToSaveAndConfirm").value;
      if ((inputPass != "") && (inputPass == inputPassConfirm)){
      utils.setPassword(inputPass);
      Animation.nextLayer('password','config_done');
      }
    });
    
    // Check if password is true
    $("CheckPassForContent").addEventListener('click', function(evt) {
      asyncStorage.getItem('__CONFIG_PASSWORD__', function(value) {
        var inputValue = $("valueCheckPassForContent").value;
        if(value == inputValue){
          $("errorWrongPasscode").classList.add("hidden");
          console.log("Passed");
          Animation.nextLayer('password_enter','browse_elements');
        }
        else{
          $("errorWrongPasscode").classList.remove("hidden");
        }
      });
    });
    
    
  },

  // Checks if there are previous configurations to decide whether start First Run Dialog or not.
  configured: function(){
    asyncStorage.getItem('__CONFIG_', function(value) {
        if(value == "true")
          $("password_enter").classList.add("root");
        else
          $("setup").classList.add("root");
    });
  },

  addRootPanel: function(){
  },

  setPassword: function(password){
	  asyncStorage.setItem('__CONFIG_PASSWORD__', password);
	  asyncStorage.setItem('__CONFIG_', 'true');
  },

  getPassword: function(){
	asyncStorage.getItem('__CONFIG_PASSWORD__', function(value) {
		
    });
  }


};


window.addEventListener('load', function readerOnLoad(evt) {
  window.removeEventListener('load', readerOnLoad);
  utils.configured();
  utils.btnListeners();
  
});
