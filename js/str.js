// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
"use strict";(function(){let str = drylib.str = {}; let char = drylib.char = {};
let dbg = drylib.dbg;
let val = drylib.val;

String.prototype.toProperCase=function(){
    return this.substring(0,1).toUpperCase()+this.substring(1).toLowerCase();
}

char.code_ = {
};
                         
for(let c of 'azAZ'.split(''))
    char.code_[c] = c.charCodeAt(0);
char.code_.capDiff = char.code_.a - char.code_.A;
                         
char.toUpperCase = c =>
    c >= 'a' && c <= 'z'
        ? String.fromCharCode(c.charCodeAt(0) - char.code_.capDiff)
        : c
;

str.toUpperCase = s => {
    let ret = s.split('');
    for(let [i,c] of ret.entries())
        ret[i] = char.toUpperCase(c);
    return ret.join('');
}

char.it = {};
char.it.toUpperCase = function*(it){
    for(let c of it){
        yield char.toUpperCase(c);
    }
}

str.it = {};
str.it.toUpperCase = function*(it){
    for(let s of it){
        yield str.toUpperCase(s);
    }
}

str.it.join = function(it,sep){
    let ret = ''
    if(!sep) sep = ''
    let first = true
    if(val.is.it(it))
        for(let s of it){
            if(first)
                first = false
            else
                ret += sep
            ret += s
        }
    else if(val.is.obj(it))
        for(let s in it){
            if(first)
                first = false
            else
                ret += sep
            ret += s
        }
    else
        ret = it
    return ret
}

str.json = function(o){
    let ret = JSON.stringify(o)
    //ret = ret.replace(/"([a-zA-Z0-9_])":/g,'$1:')
    return ret
}
str.jsonView = function(o){
    let ret = JSON.stringify(o)
    ret = ret.replace(/"([a-zA-Z0-9_])":/g,'$1:')
    return ret
}



{// unit tests
    let dbg = drylib.dbg; let assert = dbg.assert; //dbg.assert.log = true;
    assert(()=>1 && Array.from(char.it.toUpperCase('abc'.split(''))).join('') == 'ABC');
    assert(()=>2 && Array.from(str.it.toUpperCase('abc def'.split(' '))).join(' ') == 'ABC DEF');
    
    {// diff between RegExp.exec and String.match: RegExp.exec is more flexible for high performance apps
     // because it allows to stop search after first occurrence and discard the rest if logically needed
        let s = 'aa aa bb';
        let rx = /aa/g;
        let res = s.match(rx);
        assert(()=>1 && res.length == 2 && res[0] == 'aa' && res[1] == 'aa');
        let res1 = rx.exec(s);
        assert(()=>2.1 && res1.index == 0);
        let res2 = rx.exec(s);
        assert(()=>2.2 && res2.index == 3);
        let res3 = rx.exec(s);
        assert(()=>2.3 && res3 === null);
    }
    assert(()=>3.1 && str.jsonView({a:1,b:"2"}) == '{a:1,b:"2"}');
    assert(()=>4.1 && str.it.join([1,2,3],'-') == '1-2-3');
    assert(()=>4.2 && str.it.join({a:1,b:2,c:3},'-') == 'a-b-c');
}
})()
