'use strict';

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

    $("NextToUse").addEventListener('click', function(evt) {
      Animation.nextLayer('config_done','browse_elements');
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
    
    
    $("add_element_to_browser").addEventListener('click', function(evt) {
      var activity = new MozActivity({
        // Ask for the "pick" activity
        name: "pick",

        // Provide the data required by the filters of the activity
        data: {
          type: "image/*",
        }
      });

      activity.onsuccess = function() {
        var picture = this.result;
        var url = URL.createObjectURL(picture.blob);
        //$("images").innerHTML+="<img id='image' src='"+url+"'/>";
        var img = document.createElement("img");
        img.id = "image";
        img.src = url;
        $("images").appendChild(img);
        userData.addDefault(url);
      };

      activity.onerror = function() {
        console.log(this.error);
      };
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
