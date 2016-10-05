// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
"use strict";(function(){let dbg = drylib.dbg; let tl = drylib.tl;

drylib.g = (x,path)=>{ // get node by path
    let g0 = (x,path)=>{
        if (!path)
            return x;
        let ret;
        for (let i in path)
        {
            if (x == i)
                return true; // return true for leaf only if leaf value matched
            if (x[i] || x[i]===null) // return null instead of true
                ret = g0(x[i], path[i]);
            if(typeof ret != 'undefined')
                return ret;
        }
    };

    return g0(x, tl(path));
}

{// unit tests
    let dbg = drylib.dbg; let assert = dbg.assert; //dbg.assert.log = true;
    let g = drylib.g;
    assert(()=>  1 && g(null,'')==null)
    assert(()=>  2 && g({x:1},'x')==1)

    let t={
        a:{
            b:{
                c:'t1',
                d:null,
            },
        },
    };
    assert(()=> 3 && g(t,'a b c')=='t1');
    assert(()=> 4 && g(t,'a b c t1'));
    assert(()=> 5 && g(t,'a b d')===null);
    assert(()=> 6 && g(t,'a b zz')!==null);
    assert(()=> 7 && g(t,'z,a b c')=='t1');
}})();
