let stdin = 0; // change to 1 for submission env
let in_file = "\\in.txt";
let prec = 0.0001;

let rep = function*(a,b){
    if(b === undefined)
        yield* rep(0,a-1);
    else
        for(let ret = a; ret <= b; ret++)
            yield  ret;
}

let val = {
    max: (a,b)=>a<b ? b : a,
    min: (a,b)=>a<b ? a : b,
    diff: (a,b)=>a < b ? -1 : a > b ? 1 : 0,
    neg_diff: (a,b)=>-val.diff(a,b),
    sum: (a,b)=>a + b,
    can_div: (x,div)=>x % div == 0,
    pow2: x=>x*x,
}

let arr = {
    max: x=>x.reduce(val.max),
    min: x=>x.reduce(val.min),
    push: (x,list)=>Array.prototype.push.apply(x,list),
    last: x => x.slice(-1)[0],
}
Array.prototype.add = function(x){this.push(x); return x;};


let obj = {
    dup: x => {
        let ret = {};
        for(var e in x)
            ret[e] = x[e];
        return ret;
    },
    view: x => JSON.stringify(x).replace(/"([a-z]+)":/g,'$1:'),
}

let text = '',lines,line,words,word;
let ix = {line: -1, word: 0};
let num = ()=>parseInt(word);

let next = {
    line: ()=>{
        ix.line++;
        ix.word = 0;
        line = lines[ix.line];
        words = line.split(' ');
        word = words[0];
        return line;
    },
    words: ()=>{next.line();return words;},
    nums: ()=>next.words().map(Number),

    word: ()=>{
        if(!words || ix.word == words.length)
            next.line();
        word = words[ix.word++];
        return word;
    },   
    num: ()=>{
        next.word();
        return num();
    },   
}

let w = x=>{
    if(x !== undefined)
        process.stdout.write(x);
    else
        process.stdout.write(``);
};
let wl = x=>{
    if(x !== undefined)
        process.stdout.write(`${x}\n`);
    else
        process.stdout.write(`\n`);
};

if(stdin){
    process.stdin.resume();
    process.stdin.setEncoding('ascii');
    process.stdin.on('data', data=>{
        text += data;
    });

    process.stdin.on('end', ()=>{
        main();
    });
}else{
    let fs = require('fs');
    text = fs.readFileSync(process.cwd() + in_file).toString();
    main();
}

function main() {
    text = text.replace(/[^a-zA-Z0-9 \-\n]/g,'');
    lines = text.split('\n');
    solve();
}


/////////////// boilerplate and libs above this line ////////////////////


function solve(){
    let started = new Date().getTime(); //process.hrtime();
    let n = next.num();
    let m = next.num();
    let q = next.num();

    function Edge(from,to){ this.from = from; this.to = to;};
    Edge.prototype.view = function(){return `[${this.from},${this.to}]`;};
    function Vert(id){ this.id = id; this.to = new Map(); this.from = new Map(); this.trans=new Map(); this.val = 0;};
    Vert.prototype.view = function(){return `${this.id}=${this.val}`;};

    let vert_ = new Map();
    let edge_ = [];
    for(let edge_it of rep(m)){
        let edge = edge_.add(new Edge(next.num(), next.num()));
        let from = vert_.get(edge.from);
        if(!from)
            vert_.set(edge.from, from = new Vert(edge.from));
        let to = vert_.get(edge.to);
        if(!to)
            vert_.set(edge.to, to = new Vert(edge.to));
        from.to.set(edge.to, to);
        to.from.set(edge.from, from);
    }

    //for(let edge of edge_)wl('edge:' + edge.view());
    //for(let vert of vert_.values())wl('vert:' + vert.view());

    let q_ = [];
    for(let q_it of rep(q)){
        let q = q_.add({type: next.num(), vert: next.num()});
        if(q.type != 3)
            q.x = next.num();
    }

    let union = function*(it1,it2){
        yield* it1;
        yield* it2;
    };

    let dep = function*(vert){
        if(!vert.done){
            for(let to of vert.to.values()){
                yield to;
                vert.trans.set(to.id,to);
                for(let to2 of dep(to)){
                    yield to2;
                    vert.trans.set(to2.id,to2);
                }
            }
            vert.done = true;
        }else
            yield* vert.trans.values();
    };

    let qid = 0;
    for(let q of q_){
        //wl('q:' + obj.view(q));
        if(q.type == 3)
            wl(vert_.get(q.vert).val);
        else
            (()=>{
                //if(new Date().getTime() - started > 10000)return;
                for(let vert of union([vert_.get(q.vert)], dep(vert_.get(q.vert)))){
                    if(!vert)
                        continue;
                    if(q.type == 2 && vert.val <= q.x)
                        continue;
                    vert.val = q.x;
                }
                qid++;
            })();
    }
}
