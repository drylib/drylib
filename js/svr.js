// Copyright (c) 2016 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
"use strict";(function(){ let svr = drylib.svr = {};
let dbg = drylib.dbg; let log = drylib.log; let err = drylib.err; // including diagnostics

svr.act = {login:'login'};
svr.stat = {
    rq: 0,
};

svr.login = (usr,pwd,url,ok)=>{
    if (url)
        svr.url = url;
    svr.usr = usr;
    post({act:act.login, data:pwd}, res=>{
        svr.sess = res.data;
        ok();
    });
};

svr.post = (rq,ok,url,err)=>{
    svr.stat.rq++;

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: (svr.url||url) + '/' + rq.act,
        data: JSON.stringify({
            rq: mix({
                usr: svr.usr,
                sess: svr.sess,
                rq: svr.stat.rq
            }, rq),
        }),
        dataType: "json",
        success: res=>{
            log(res);
            if (!res.ok)
                show(res);
            else
                ok(res);
        },
        error: (xhr, ajaxOptions, thrownError)=>{
            if (err)
                err(thrownError,xhr);
            else
            {
                //log(err)
                log(thrownError);
                if (xhr.responseText)
                {
                    //we can see it in Network response log(xhr.responseText) // server exception
                    if (!dbg.off)
                    {
                        let w = window.open('', 'err', 'position=absolute,left=0,top=100,width=1600,height=800');
                        w.document.write(xhr.responseText);
                    }
                }
                else
                    alert(thrownError);
            }
        },
    });
};

svr.show = res=>{
    if (dbg.off || !res.stack)
        dbg.show(res.msg);
    else
    {
        let w = window.open('', 'err', 'position=absolute,left=0,top=100,width=1600,height=800');
        w.document.write(res.msg);
        w.document.write('<br>');
        w.document.write(res.stack.replace('\r\n','<br>'));
    }
};

{// unit tests
    let dbg = drylib.dbg; let assert = dbg.assert; //dbg.assert.log = true;

}})();
