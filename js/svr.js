// Copyright (c) 2015 drylib.com - All rights reserved. Terms are in drylib.js
// You are NOT ALLOWED to modify and/or use this code without author permission
with(drylib)with(dbg)with(tr){

dl.svr={};with(svr){

svr.act={login:'login'}
svr.stat={
	rq:0
}
	
svr.login=function(usr,pwd,url,ok){
	if(url)svr.url=url
	svr.usr=usr
	post({act:act.login,data:pwd},function(res){
		svr.sess=res.data
		ok()
	});
}

svr.post=function(rq,ok,url,err){
	svr.stat.rq++

	$.ajax({
		type: "POST"
		,contentType: "application/json; charset=utf-8"
		,url: (svr.url||url)+'/'+rq.act
		,data: JSON.stringify({rq:mix({usr:svr.usr,sess:svr.sess,rq:svr.stat.rq},rq)})
		,dataType:"json"
		,success:function(res){
			log(res)
			if(!res.ok){
				show(res)
			}else{
				ok(res)
			}
		}
		,error:function(xhr, ajaxOptions, thrownError){
			if(err)err(thrownError,xhr)
			else{
				//log(err)
				log(thrownError)
				if(xhr.responseText){
					//we can see it in Network response log(xhr.responseText) // server exception
					if(!dbg.off){
						var w=window.open('','err','position=absolute,left=0,top=100,width=1600,height=800');
						w.document.write(xhr.responseText)
					}
				}else
					alert(thrownError)
			}
		}
	});
}

svr.show=function(res){
	if(dbg.off || !res.stack)
		dbg.show(res.msg);
	else{
		var w=window.open('','err','position=absolute,left=0,top=100,width=1600,height=800');
		w.document.write(res.msg)
		w.document.write('<br>')
		w.document.write(res.stack.replace('\r\n','<br>'))
	}
}


}}
