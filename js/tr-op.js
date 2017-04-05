// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
"use strict";(function(){let tr = drylib.tr; let val = drylib.val; let arr = drylib.arr;

// a b c->a b c;a c b;b a c;b c a;c a b;c b a
// a b,c->a b,c;b,c a
// a,b c->a,b c;c a,b
// a,b c,d->a,b c,d;c,d a,b
let perm = tr.perm = s =>{
    if (s==null || !(s instanceof Object))
        return;
    var sarr = tr.to.arr(s);
    var ret = {};
    //log(tr.to.arr(s))
    arr.perm(tr.to.arr(s), p=>{
        //log(p,ret)
        tr.mix(ret, tr.from.arr.and(p));
    });
    return ret;
}

// a b fits into a b c
let fit = tr.fit = (x,y)=>{
    if (x==null)
        return true; // reached leaf or passed null or undefined (undefined==null too), anyway empty leaf fits anything
    if (x instanceof Object && !(x instanceof Array))
        if (y instanceof Object && !(y instanceof Array))
            for (var e in x)
                if (y[e]!==undefined)
                    return tr.fit(x[e], y[e]);
    return false;
}

let leaf = tr.leaf = (s,fn)=>{
    let ret = [];
    tr.it(s, (src,i,e,path)=>{
        if (!path)
            path = [];
        else
            path = path.slice();
        path.push(i);
        if (e==null) //leaf
        { 
            ret.push(path);
            if (fn)
                fn(path);
            return;
        }
        else
            return path;
    });
    return ret;
}


{// unit tests
    let dbg = drylib.dbg; let assert = dbg.assert; let tl = drylib.tl; //dbg.assert.log = true;
    assert(()=> 1.1 && fit(tl('a b'),tl('a b c')));
    assert(()=> 1.2 && !fit(tl('a b c'),tl('a b')));
    assert(()=> 1.3 && fit(tl('a c,b'),tl('a b')));
    assert(()=> 1.4 && fit(tl('a c'),tl('a b,c')));
    assert(()=> 1.5 && fit(tl('a'),tl('a')));
    assert(()=> 1.6 && !fit(tl('a b'),tl('a')));

    if(false){ // arr.perm is missing
    assert(()=>{let x = perm(tl('a b')); return 2.1 && g(x,'a b')===null && g(x,'b a')===null});
    assert(()=>{let x = perm(tl('a b c')); return
        [2.2 && g(x,'a b c')===null && g(x,'a c b')===null && g(x,'b a c')===null && g(x,'b c')!==null && g(x,'c b')!==null,x]
    });
    assert(()=>{let x = perm(tl('a b c')); return
        [2.3 && g(x,'a b c')===null && g(x,'b a c')===null && g(x,'b c a')===null && g(x,'a c b')===null && g(x,'c a b')===null && g(x,'c b a')===null,x]
    });
    }
    assert(()=>{
        var x=leaf(tl('a b,d c,e'));
        return [3.1 && x.length==4 && x[0].length==3 && x[0][2]=='c' && x[3][2]=='e',x];
    });
}})();
