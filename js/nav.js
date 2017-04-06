// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
"use strict";(function(){let nav = drylib.nav = {};

let get_path = (obj,path)=>{
    if(!path || !path.length)
        return obj;
    for (let i=0; i<path.length-1; i++)
    {
        let name = path[i];
        if (typeof obj[name] != 'object')
            return undefined;
        else
            obj = obj[name];
    }
    let name = path[path.length-1];
    return obj[name];
}

let get_leaf = (obj,path)=>{
    if(!path || !path.length)
        return obj;
    for (let i=0; i<path.length-1; i++)
    {
        let name = path[i];
        if (typeof obj[name] != 'object')
            return obj[name];
        else
            obj = obj[name];
    }
    let name = path[path.length-1];
    return obj[name];
}

let proxy = nav.proxy = (root, fake_root, fake, path)=>{
    // allows to build virtual path using dot and then create it with assignment to leaf
    // root cannot be removed from object tree after proxy is created, but any node in fake path can
    if (!path) path = [];
    if (!fake_root) fake_root = {};
    if (fake === undefined)
        if (path.length == 0)
            fake = fake_root;
        else
            fake = {};  // fake node in virtual path
    return new Proxy(fake, {
        get: (target, name)=>{
            if(drylib.val.is.primitive(fake))
                return undefined;
            let c = fake[name];
            if (c === null)
                return c;
            if (c === undefined)
                c = fake[name] = {}; // fake node in virtual path
            if (typeof c != 'object')
                return c;
            return proxy(root, fake_root, c, [...path, name]);
        },
        val: ()=>{
            return get_path(root,path);
        },
        set: function(target, property, value, receiver) {
            let real = root;
            let fake_node = fake_root;
            for (let name of path)
            {
                if (!real.hasOwnProperty(name) || typeof real[name] != 'object') // create direct (not through prototypes) path
                    real = real[name] = {};
                else
                    real = real[name];
                if (!fake_node.hasOwnProperty(name) || typeof fake_node[name] != 'object') // re-creating fake path too
                    fake_node = fake_node[name] = {};
                else
                    fake_node = fake_node[name];
            }
            real[property] = value;
            fake_node[property] = value;
            return true;
        },
    });
}

{// unit tests
    let dbg = drylib.dbg; let assert = dbg.assert; //dbg.assert.log = true;
    
    let t = {
        a:{},
    };
    let p = nav.proxy(t);
    p.a.b.c = 1;
    assert(()=>1 && t.a.b.c == 1)
    assert(()=>2 && p.a.b.c == 1)
    p.d = {e:null};
    assert(()=>3 && p.d.e === null)
    p.a.f = 2;
    assert(()=>4 && p.a.f === 2)
}
})()
