'use strict';

var Animation = {
  
  RTL : false,
  
  /*
   * Give it current as the current
   * layer's ID and next as the next
   * layer's ID
   * */
	nextLayer : function(current,next){
    document.getElementById(current).classList.remove("current");
    document.getElementById(current).classList.add("previous");
    
    //document.getElementById(next).classList.remove("previous");
    document.getElementById(next).classList.add("current");
    
  },
  
  previousLayer : function(current,previous){
    document.getElementById(current).classList.add("goForwardOneStep");
    document.getElementById(previous).classList.add("BecomeCurrentFromBackward");
  }
	
	
	
};
