// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
"use strict";(function(){let dbg = drylib.dbg; let tr = drylib.tr; let val = drylib.val;

let tl = drylib.tl = (x)=>{
    if (x === undefined || x === null || x instanceof Function)
        return x;

    if (!val.is.primitive(x) && !(x instanceof Array))
    {
        var xdup = tr.dup.shallow(x);
        for (var i in xdup)
        {
            var tail = tl(xdup[i]);
            delete x[i];     // because we are expanding expression into the same object
            tr.mix(x, tl(i));    // different expressions within same object may overlap each other, for example tl({'a,b':'d,e','b,c':'f,g'}).b=={d,e,f}
            tr.compose(x, tail); // 'exp1':'exp2' == '(exp1) (exp2)'
        }
        return x;
    }

    let and = (op,x)=>{
        let op_ = x.split(op);
        if (op_.length > 1)
        {
            let ret = {};
            for (let op=0; op<op_.length; op++)
                if (op==0)
                    tr.mix(ret, tl(op_[op]));
                else
                    tr.compose(ret, tl(op_[op]));
            return ret;
        }
    }

    let or = (op,x)=>{
        let op_ = x.split(op);
        if (op_.length>1)
        {
            let ret = {};
            for (let op=0; op<op_.length; op++)
            {
                let optl = op_[op]=='' ? {'':null} : tl(op_[op]);
                for(let i in optl)
                    ret[i] = tr.dup(optl[i]);
            }
            return ret;
        }
    }
    
    if (val.is.str(x))
    {
        let ret;
        if(x.length==0)
            return null; // tl('')===null
        var c = x.substring(0,1);
        if(c=='`')
            return x.substring(1);

        if(c=='$' || c=='@' || c=='.')
            return x;


        ret = or(';',x);
        if (ret!=undefined)
            return ret;

        ret = and(' ',x);
        if (ret!=undefined)
            return ret;

        ret = or(',',x);
        if (ret!=undefined)
            return ret;

        ret = and('.',x);
        if (ret!=undefined)
            return ret;

        ret = {};
        ret[x] = null;
        return ret;
    }
    else
        return x; // primitive non-string (number,bool, ...
}

{// unit tests
    let dbg = drylib.dbg; let assert = dbg.assert; //dbg.assert.log = true;
    assert(()=> 1 && tl('')===null);
    assert(()=> 2 && tl('a').a===null);

    var t=tl({
        a:{
            b:{
                c:'t1'
            }
        }
    });
    
    assert(()=> 3 && t.a.b.c.t1===null);

    t=tl({'a b':null});
    assert(()=> 4 && t.a.b===null);
    t=tl({'a,b':'c,d'});
    assert(()=> 5 && t.a.c===null && t.b.d===null && t.a.d===null && t.b.c===null);
    t=tl({'a,b c,d':null});
    assert(()=> 6 && t.a.c===null && t.b.d===null);
    t=tl({'a,b c,d':'e,f g,h'});
    assert(()=> 7 && t.a.c.e.g===null && t.b.d.f.h===null);
    t=tl({',a':null}); // {'',a}
    assert(()=> 8 && t['']===null && t.a===null);
    t=tl({'a.b':null});
    assert(()=> 9 && t.a.b===null);
    t=tl({'a.b,c.d':null});
    assert(()=> 10 && t.a.b===null && t.c.d===null);
    t=tl({'a.b c.d':null});
    assert(()=> 11 && t.a.b.c.d===null);
    t=tl({'a b;c d':null});
    assert(()=> 12 && t.a.b===null && t.c.d===null);
    t=tl({'a b;c d,e':null});
    assert(()=> 13 && t.c.e===null);
}})();
