// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
"use strict";(function(){let nav = drylib.nav = {};

let proxy = nav.proxy = (root, fake, path)=>{
    // allows to build virtual path using dot and then create it with assignment to leaf
    if (fake === undefined)
        fake = {};  // whole path is fake, allowing to override values with objects
    return new Proxy(fake, {
        get: (target, name)=>{
            let c = fake[name];
            if (c === undefined)
                c = fake[name] = {};
            return proxy(root, c, [...path, name]);
        },
        val: ()=>{
            let real = root;
            for (let name in path)
            {
                if (typeof real[name] != 'object')
                    return undefined;
                else
                    real = real[name];
            }
            return real;
        },
        set: function(target, property, value, receiver) {
            let real = root;
            for (let name in path)
            {
                if (!real.hasOwnProperty(name) || typeof real[name] != 'object') // create direct (not through prototypes) path
                    real = real[name] = {};
                else
                    real = real[name];
            }
            real[property] = value;
            return true;
        },
    });
}

{// use ===null instead of ==null because undefined==null
    let assert = drylib.dbg.assert;
    
    let t = {
        a:{},
    };
    let p = nav.proxy(t);
    p.a.b.c = 1;
    assert(()=>1 && t.a.b.c == 1)
    assert(()=>2 && p.a.b.c == 1)
    t.d = {e:null};
    assert(()=>3 && p.d.e === null)
    t.a.f = 2;
    assert(()=>4 && p.a.f.val() === 2)
}
})()
