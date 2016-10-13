// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
"use strict";(function(){let parse = drylib.parse = {};
let dbg = drylib.dbg;

{ // check if parentheses are balanced
    let lefts = {
        '(': ')',
        '{': '}',
        '[': ']',
    };
    let rights = {};
    for (let left in lefts)
        rights[lefts[left]] = left;
        
    parse.bal = s => {
        let need = [];
        let i = 0,c;
        while (i < s.length)
        {
            c = s[i];
            if (lefts[c])
                need.push(lefts[c]);
            else if (rights[c] && need.pop() != c)
                return false;
            i++;
        }
        if (need.length > 0)
            return false;
        return true;
    }
}


{// unit tests
    let dbg = drylib.dbg; let assert = dbg.assert; //dbg.assert.log = true;

    {
        let bal = parse.bal;
        assert(()=>1.1 && !bal('a(bc'));
        assert(()=>1.2 && bal('a(b)c'));
        assert(()=>1.3 && !bal('ab)c'));
        assert(()=>1.4 && !bal('[ab)c]'));
        assert(()=>1.5 && bal('[(ab)c]'));
        assert(()=>1.6 && bal('{}'));
        assert(()=>1.7 && !bal('{[}]'));
        assert(()=>1.8 && bal(''));
    }
}
})();
