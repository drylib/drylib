// Copyright (c) 2015 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
String.prototype.toProperCase=function(){
   return this.substring(0,1).toUpperCase()+this.substring(1).toLowerCase()
}
