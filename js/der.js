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
    let ret_path = [...get_path(root_path.slice(-1)[0].o, name_path)];
    let last = ret_path.slice(-1)[0]
    let known_path = [...root_path, ...ret_path];
    if(last && last.o && last.o.constructor && last.o.constructor === Object && ret_path.length == name_path.length) // found all the way to the leaf
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
    if(!(path instanceof Array))
        return proxy([{o: path}]);
    return new Proxy(path[path.length-1].o, {
        get: (target, name)=>{
            return get(path, [name]);
        },
        set: function(target, property, value, receiver) {
            let ret;
            for(let e in path){
                ret = e.o;
                if(e.name === undefined)
                    continue;
                if(!ret.hasOwnProperty(e.name)) // create direct (not through prototypes) path
                    ret = ret[e.name] = {};
                else
                    ret = ret[e.name];
            }
            ret[property] = value;
            return true;
        }            
    });
}


{// unit tests
    let dbg = drylib.dbg; let assert = dbg.assert; //dbg.assert.log = true;

    { // demo of regular JavaScript inheritance:
        // objects have properties constructor and __proto__
        // functions have property prototype
        
        // always: object.__proto__ == Object.getPrototypeOf(object)
        // Object.getPrototypeOf(object) is preferred over object.__proto__
        // x instanceof X (where x is object, X is function) checks for equality of x.__proto__...__proto__ to X.prototype

        // initialization works through chain of constructors invokations
        // property access works through chain of prototypes
        // usually: object.constructor.prototype == object.__proto__
        // it's up to developer to keep these chains equal (consistent), but they are ont enforced to be
        // when a function is created it automatically has prototype pointing to a new object
        // which has constructor pointing back at the function and __proto__ pointing at Object.prototype
        // developer must manually link __proto__ to desired prototype
        // Object.create(proto) does this linking, but it kills link to function constructor, which is to be manually restored
        // class ChildClass extends ParentClass { ... } does both links
        
        assert(()=>0.1 && ({}).constructor == Object);
        assert(()=>0.2 && Object.prototype.isPrototypeOf(Object));
        assert(()=>0.3 && Object instanceof Object);
        assert(()=>0.4 && Function instanceof Function);
        assert(()=>0.5 && Function instanceof Object);
        assert(()=>0.6 && Object instanceof Function);
        assert(()=>0.7 && !Function.isPrototypeOf(Object));
        assert(()=>0.8 && !Object.isPrototypeOf(Function));
        
        let id = 1;
        function Ctl(){
            this.id = id++;
        }
        assert(()=>1.1 && Ctl.prototype != Object.prototype);
        assert(()=>1.2 && Ctl.prototype.constructor == Ctl);
        assert(()=>1.3 && Ctl instanceof Function);
        assert(()=>1.4 && Ctl.prototype.__proto__ == Object.getPrototypeOf(Ctl.prototype));
        assert(()=>1.5 && Object.getPrototypeOf(Ctl.prototype) == Object.prototype);
        

        let ctl = new Ctl();
        assert(()=>2.1 && ctl.constructor == Ctl);
        assert(()=>2.2 && ctl.__proto__ == Ctl.prototype);
        assert(()=>2.4 && Object.getPrototypeOf(ctl) == Ctl.prototype);
        
        function Cb(){
            Ctl.call(this);
        }
        let cb = new Cb();
        assert(()=>3.1 && cb.constructor == Cb);
        assert(()=>3.2 && cb.__proto__ == Cb.prototype);
        assert(()=>3.3 && cb.__proto__ != ctl.__proto__); // no prototypal chain link
        assert(()=>3.4 && !(cb instanceof Ctl)); // instanceof does not work without prototypal chain link
        try{
            assert(()=>3.5 && cb instanceof ctl);
        }catch(e){assert(()=>3.6 && 'right side of instanceof must be a function');}
        assert(()=>3.6 && Cb.prototype.constructor == Cb); // loops to itself - good
        assert(()=>3.7 && Object.getPrototypeOf(Cb.prototype) == Object.prototype); // no Ctl yet
        assert(()=>3.8 && cb instanceof Cb);
        
        Cb.prototype = Object.create(Ctl.prototype); // links prototype, but breaks constructor
        assert(()=>4.1 && Cb.prototype.__proto__ == Ctl.prototype); // now it's good - achievement of prev stmt
        assert(()=>4.2 && Cb.prototype.constructor == Ctl); // constructor link is now broken
        assert(()=>4.3 && !(cb instanceof Ctl)); // prototypal inheritance is still broken 
        assert(()=>4.4 && cb.__proto__ != Ctl.prototype && cb.__proto__ != Cb.prototype); // cb is left with own hanging proto
        assert(()=>4.5 && cb.constructor == Cb); // object constructor is still good because it was created earlier
        
        cb = new Cb(); // creating again, fixes prototype chain, constructor link is still broken
        assert(()=>5.1 && cb instanceof Cb);
        assert(()=>5.2 && cb instanceof Ctl); // prototypal inheritance works
        assert(()=>5.3 && cb.constructor != Cb && cb.constructor == Ctl); // constructor link broken because we assigned prototype
        assert(()=>5.4 && cb.__proto__ == Cb.prototype); // now it's good
        assert(()=>5.5 && cb.constructor != Cb); // now object constructor is not good
        
        Cb.prototype.constructor = Cb; // restoring broken constructor link
        assert(()=>6.1 && cb.constructor == Cb); // object constructor is auto updated too and now it's good

        function Chk() {
          Ctl.call(this);
        }
        Chk.prototype = Object.create(Ctl.prototype);
        Chk.prototype.constructor = Chk;
        let chk = new Chk();
        assert(()=>7.1 && chk instanceof Ctl);
        assert(()=>7.2 && !(chk instanceof Cb));
        assert(()=>7.3 && chk.constructor == Chk);
        assert(()=>7.4 && chk.__proto__ == Chk.prototype);
        assert(()=>7.5 && Object.getPrototypeOf(chk) != Object.getPrototypeOf(Chk)); // Object.getPrototypeOf always looks at __proto__, never at prototype
        assert(()=>7.6 && chk.id); // init works
        
        class Txt extends Ctl {} // replaces need for prototype, constructor and initialization linking
        let txt = new Txt();
        assert(()=>8.1 && txt.constructor == Txt);
        assert(()=>8.2 && txt.__proto__ == Txt.prototype);
        assert(()=>8.3 && txt instanceof Ctl);
        assert(()=>8.4 && txt instanceof Txt);
        assert(()=>8.5 && txt.id); // Ctl constructor was automatically invoked
        
        class Pwd extends Txt {}
        let pwd = new Pwd();
        assert(()=>9.1 && pwd instanceof Ctl);
        assert(()=>9.2 && pwd instanceof Txt);
        assert(()=>9.3 && pwd instanceof Pwd);
        assert(()=>9.4 && pwd.constructor == Pwd);
        assert(()=>9.5 && pwd.constructor.prototype == pwd.__proto__);
        assert(()=>9.6 && pwd.__proto__.__proto__.constructor == Txt);
        assert(()=>9.7 && pwd.__proto__.__proto__.__proto__.constructor == Ctl);
        assert(()=>9.8 && pwd.__proto__.__proto__.__proto__.__proto__ != null);
        
        for(let o in [cb,txt,pwd])
        {
            assert(()=>10.1 && o.__proto__ == o.constructor.prototype);
            assert(()=>10.2 && o.__proto__ == Object.getPrototypeOf(o));
            assert(()=>10.3 && !o.__proto__.isPrototypeOf(o));
            //if(o.__proto__.__proto__)
                //assert(()=>10.4 && o.constructor.prototype.isPrototypeOf(o));
        }
    }
    
    { // test&demo of deep inheritance:
        let base = {
            a: { a1:{}},
            b: {
                c: 2,
                f: function(){
                    return der.proxy(this).c;
                },
            },
            f: function(){
                return der.proxy(this).b.c;
            },
        };
        let d = Object.assign(Object.create(base),{
            b: {
                c: 3,
            },
        });
        //assert(()=>1 && d.f() == 3)
        //assert(()=>2 && d.b.f() == 3)
        //assert(()=>{d.a.a1.a2 = 'a2val'; return 3 && d.a.a1.a2 == 'a2val' && base.a.a1.a2 != 'a2val';} )
    }
}})();
