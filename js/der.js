// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
"use strict";(function(){let der = drylib.der = {};

let get_leaf = (o, path) =>{
    if (!path)
        return o;
    for (let name of path)
        if (typeof o != 'object' || !o)
            return undefined;
        else
            o = o[name];
    return o;
}

let get_path = function*(o, path){
    if (!path)
        return;
    for (let name of path)
    {
        if (typeof o != 'object' || !o)
            return;
        else {
            o = o[name];
            yield {o: o, name: name};
        }
    }
}

let get = der.get = (root_path, name_path)=>{
    let ret_path = get_path(last.o, name_path);
    let known_path = [...root_path, ...ret_path];
    if(ret_path.length == name_path.length) // found all the way to the leaf
        return der.proxy(known_path);
    let known_name_path = known_path.map(x => x.name);
    let i = known_path.length-1;
    while(i >= 0)
    {
        let proto = known_path[i].o.prototype;
        while(proto) // giving priority to local derivation over global
        {
            let tail_name_path = [...known_name_path.slice(i), ...name_path];
            ret_path = get_path(proto, tail_name_path);
            if(ret_path.length == tail_name_path.length) // found all the way to the leaf
                return der.proxy([...known_path.slice(0,i), {o: proto, name: known_path[i].name}, ret_path]);
            proto = proto.prototype;
        }
        i--;
    }
}

let proxy = der.proxy = (path)=>{ // path consists of pairs of o, name, root does not have corresponding name
    return new Proxy(path[path.length-1].o, {
        get: (target, name)=>{
            return get(path, [name]);
        }
    });
}


{// use ===null instead of ==null because undefined==null
    let assert = drylib.dbg.assert;
}
})()
