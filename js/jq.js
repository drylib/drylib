// Copyright (c) 2015 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
with(drylib)with(tr){
;(function(){
   for(var pos in tl(',prepend,before,after'))
   for(var tag in tl('ul,ol,li,div,span,tbl,tr,td,thead,tfoot,th,tf,a,img,iframe,sel,opt,btn,area,input'))
   for(var type in tag!='input'?{'':''}:tl('checkbox,radio,submit,reset,text,password,file,hidden')){
      jQuery.prototype[(type?'input'+type.toProperCase():tag)
         +pos.toProperCase()]=(function(tag,type,pos){return function(cls,txt){
            var fullTag=tr.replace(tag,tl('tbl table;sel select;opt option;btn button;area textarea'))
            var ret
            this.each(function(i){
               var c=$('<'+fullTag+'/>')
               if(cls)c.addClass(cls)
               if(txt){
                  if(tag=='input')
                     c.val(txt)
                  else
                     c.text(txt)
               }
               if(type)c.attr('type',type)
               $(this)[pos||'append'](c[0])
               if(!ret)ret=c
               else ret.add(c[0])
            })
            return ret
         }})(tag,type,pos)
   }
})()

}