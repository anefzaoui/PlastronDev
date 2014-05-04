'use strict';

/*

[
  {
    "value": "blob:xxxxxxxxxxxxxxx",
    "category": "default"
  },
  {
    "value": "blob:xxxxxxxxxxxxxxy",
    "category": "default"
  },
  {
    "value": "blob:xxxxxxxxxxxxxxz",
    "category": "default"
  },
  {
    "value": "blob:xxxxxxxxxxxxxxa",
    "category": "default"
  }
]

*/

var userData = {

  collection : [],
  
  
  
  addDefault: function(blob){
    asyncStorage.getItem('__CONFIG_COLLECTION__', function(value) {
      userData.collection = value;
      userData.collection.push({"value":blob,"category":"default"});
      asyncStorage.setItem('__CONFIG_COLLECTION__',userData.collection);
    });
  },

  add: function(blob,cat){
    asyncStorage.getItem('__CONFIG_COLLECTION__', function(value) {
      userData.collection = value;
      userData.collection.push({"value":blob,"category":cat});
      asyncStorage.setItem('__CONFIG_COLLECTION__',userData.collection);
    });
  },
  
  read: function(){
    asyncStorage.getItem('__CONFIG_COLLECTION__', function(value) {
      userData.collection = value;
      return userData.collection;
    });
  }


}
