"use strict";(function(){let bot = {};
let dbg = drylib.dbg; let assert = dbg.assert; let log = dbg.log; dbg.assert.log = true; dbg.off = false;
let it = drylib.it, arr = drylib.arr, str = drylib.str, tr = drylib.tr, tl = drylib.tl, g = drylib.g, is = drylib.val.is;

bot.run = ()=>{
    let test=false
    let limit = {msg: 500}
    let cfg = {dbg:false,reconn:true,}
    let cfgld = drylib.ld('cfg')
    cfgld.dbg = false

    let url="testnet"
    if(!test) url = "www"

    let u_ = {
      map: drylib.ld('user_', v=>v.d, v=>{return {d:v}})
    };
    u_.map.dbg = false

    let mex
    let stop = false;

    let body = $('body')

    if(false)body.btn('refresh','Refresh').click(function(){
      mex.close()
      u_.map.clear()
      location.reload()
    })

    body.btn('reconn','Reconnect').syncClick(function(){this.clsOnoff(cfg.reconn);}, function(){cfg.reconn = !cfg.reconn;})

    let subscribe = {ui:body.btn(), on: cfgld.get('subscribe')||false }
    subscribe.ui.prop('disabled', true)
    subscribe.ui.syncClick(
      function(){
        if(subscribe.on) this.text('Unsubscribe')
        else this.text('Subscribe')
        if(mex) mex.send(str.json({op: subscribe.ui.text().toLowerCase(),args: ["chat"]}));
      },
      function(){
        mex.send(str.json({op: subscribe.ui.text().toLowerCase(),args: ["chat"]}));
        subscribe.on = !subscribe.on
        cfgld.set('subscribe',subscribe.on)
    })

    let total;{
      let ui = body.span('total','Total')
      total = ui.span('val','0')
    }

    {
      cfg.convert = cfgld.get('convert')
      cfg.convertfn = (v)=>v
      let upd = ()=>{try{cfg.convertfn = eval(cfg.convert)}catch(e){
        console.log(e,cfg.convert)
      }}
      body.span('convert','Convert').inputText('val',cfg.convert).change(function(){
        cfgld.set('convert', cfg.convert = $(this).val())
        upd()
      })
    }

    body.btn('export','Export').click(function(){body.inputText('export',u_.map.export())})
    body.btn('dbg','Debug').syncClick(function(){this.clsOnoff(cfg.dbg);}, function(){cfg.dbg = !cfg.dbg;})

    let col_ = tl.lp('btn Buttons;role Role;time Time;name Name;count #;size Size;text Text')
    let tbl_ = tl.lp('WhalePos whale,pos;High high;Pos pos;Ord ord;Low low')
    for(let tblName in tbl_){
      let cls = tbl_[tblName]
      if(!is.str(cls)) cls = cls.join(' ')
      let tbl = body.tbl('chat ' + cls)
      let head = tbl.thead().tr();
      for(let col in col_) head.th(col).text(col_[col]);
      u_['ui'+tblName] = tbl.tbody('user_');
    }

    bot.init = ()=>{
        let connect = ()=>{
          mex = new WebSocket("wss://" + url + ".bitmex.com/realtime");
          mex.onopen = function (ev) {
            console.log(dbg.logDate(),'Socket connected');
            subscribe.ui.prop('disabled', false);
            subscribe.ui.click();
          }
          mex.onclose = function(ev) {
            console.log(dbg.logDate(), 'Socket disconnected');
            if(cfg.reconn) setTimeout(function(){
              console.log(dbg.logDate(),'Socket reconnecting');
              connect()
            }, 3000);
          };
  
          mex.onmessage = function(ev){
            //console.log(ev.data);
            var msg = JSON.parse(ev.data)
            //console.log(msg);
            if(msg.table == 'chat'){
                if(msg.action == 'insert'){
                  chat(msg)
                }
            }
          }
        }
        if(!test)
          connect()


        function chat(chunk){
            for(let msg of chunk.data){
              if(msg.channelID == 1){
                  newItem(msg)
              }
            }
        }

        function newItem(msg){
          if(false && !stop){
            stop = true;
            mex.send(str.json({op: "unsubscribe",args: ["chat"]}));
          }
          if(cfg.dbg) console.log(msg)
          let u = u_.map.get(msg.user) || {d:{k:msg.user, count:0}}
          let d = u.d
          d.date = new Date(msg.date)
          d.bot = msg.fromBot
          d.admin = d.k.startsWith('BitMEX')
          d.count++
          let dmsg
          if(msg.message.startsWith('/position')){
            d.pos = {
              msg:dmsg=msg.message.slice(17),
              date:d.date
            }
          }
          else if(msg.message.startsWith('/orders')) d.ord = {
            msg:dmsg=msg.message.slice(14),
            date:d.date
          }
          else d.msg = dmsg = msg.html

          //let size = 

          d.tv = dmsg.match(/www.tradingview.com/gi)
          d.yt = dmsg.match(/youtube.com/gi)

          total.text(Number(total.text())+1)
          save(u)
          upd(u)
        }
        
        function save(u){
          u_.map.set(u.d.k, u)
        }

        function upd(u){
          let d = u.d
          let ui = u.ui
          //console.log(d)

          let msg = d.msg
          let date = new Date(d.date)
          if(d.pos) {
            let pos = d.pos
            msg = pos.msg
            pos.msg = msg = msg.replace('\r','').replace('\n','')
            date = new Date(pos.date)
            let size = pos.msg.match(/([0-9,.]+)/gi)
            if(size){
              pos.size = size = size[size.length-2]
              if(size){
                size = Number(size.replace(',',''))
                if(size > 30000)
                  d.whale = true
                if((pos.maxSize||0) < size) pos.maxSize = size
              }
            }
          }
          else if(d.ord) {msg = d.ord.msg; date = new Date(d.ord.date)}
          

          msg = cfg.convertfn(msg)
          //msg = msg.substring(0,limit.msg)
          //if(ui){ui.row.detach();ui=null}

          if(d.pos && msg.match(/<img/ig)) {if(ui)ui.row.detach();ui=null;return;}

          if(!ui){
            ui = u.ui = {}
            ui.row = u_.uiPos.tr()

            let place = function(on){
              ui.row.detach()
              if(d.whale && d.pos){
                if(d.small) u_.uiWhalePos.append(ui.row)
                else u_.uiWhalePos.prepend(ui.row)
              }else{
                if(d.fav||d.whale)
                  if(d.small) u_.uiHigh.append(ui.row)
                  else u_.uiHigh.prepend(ui.row)
                else if(d.pos)
                  if(d.small) u_.uiPos.append(ui.row)
                  else u_.uiPos.prepend(ui.row)
                else if((d.bot || d.admin || d.ord) && !d.small) u_.uiLow.prepend(ui.row)
                else if(d.ord) u_.uiOrd.append(ui.row)
                else u_.uiLow.append(ui.row)
              }
              return on
            }

            place()

            {
              let td = ui.row.td('btn')
              let btn_ = tl.lp('fav ^;whale W;small _;ban \\')
              for(let btn in btn_){
                td.btn(btn).text(btn_[btn]).syncClick(function(){this.clsOnoff(d[btn])},function(){
                  d[btn] = !d[btn]
                  save(u)
                  place()
                })
              }
              td.btn('del').text('X').syncClick(function(){},function(){
                u.ui.row.detach()
                u_.map.del(u.d.k)
              })
            }
            {
              let td = ui.row.td('role')
              if(d.admin)td.span('admin','A')
              if(d.bot)td.span('bot','B')
              if(d.tv)td.span('tv','T')
              if(d.yt)td.span('yt','Y')
              if(d.pos)td.span('pos','P')
            }

            ui.time = ui.row.td('time')
            ui.row.td('name').text(d.k)
            ui.count = ui.row.td('count')
            ui.size = ui.row.td('size')
            ui.text = ui.row.td('text')
          }
          ui.time.text(dbg.logDate(date))
          if(d.pos)ui.text.text(msg.replace(/:bitmex:/gi,''))
          else if(d.ord) ui.text.html(msg)
          else ui.text.html(msg)
          ui.count.text(d.count)
          if(d.pos && d.pos.maxSize) ui.size.text(Number(d.pos.maxSize).toLocaleString())
        } //upd

        for(let u of u_.map){
          upd(u.v)
        }
    
    }


    bot.init();
};


;$(()=>{
    bot.run();
});

{// unit tests
  
}})();
