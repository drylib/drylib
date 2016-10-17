// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
"use strict";(function(){let dbg = drylib.dbg; let assert = dbg.assert; dbg.assert.log = true;

{
    let defer = ()=>{
        let arr = [];
        let then = x=>{
            arr.push(x);
            return {
                then: then,
                resolve: res=>{
                    for (let e of arr)
                        res = e(res);
                  return res;
                },
            };
        };
        return then(x=>x);
    };

    var d = defer()
        .then(function(res){ console.log('then-1', res); return 'ret-1'; })
        .then(function(res){ console.log('then-2', res); return 'ret-2'; })
    ;
    d.resolve('init');
      
    assert(()=>1 && d.resolve('init') == 'ret-2');
}

})();
