// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
"use strict";(function(){let tr = drylib.tr = {};
    for (let tag in tl('ul,ol,li,div,span,tbl,tr,td,thead,tfoot,th,tf,a,img,iframe,sel,opt,btn,area,input'))
    for (let type in tag!='input'?{'':''}:tl('checkbox,radio,submit,reset,text,password,file,hidden'))
    for (let pos in tl(',prepend,before,after'))
    {
        jQuery.prototype[(type?'input'+type.toProperCase():tag) + pos.toProperCase()] = (cls,txt)=>{
            let full_tag = tr.replace(tag, tl('tbl table;sel select;opt option;btn button;area textarea'));
            let ret;
            this.each(()=>{
                let c = $('<'+full_tag+'/>');
                if(cls)
                    c.addClass(cls);
                if(txt)
                   if(tag=='input')
                      c.val(txt);
                  else
                      c.text(txt);
                if(type)
                    c.attr('type',type);
                $(this)[pos||'append'](c[0]);
                if(!ret)
                    ret = c;
                else
                    ret.add(c[0])
            });
            return ret
        };
    }

{// unit tests
    let dbg = drylib.dbg; let assert = dbg.assert; //dbg.assert.log = true;

}})();
