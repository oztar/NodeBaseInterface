const socket = io('http://localhost:'+portio);
const container = document.getElementById('container');
let enable = false;
let form = [];
let json_table = {};
let wait_process = {};
let end_process = {};
let variableHTML = '';
let user = {};
function getid(id){
    return document.getElementById(id);
}
socket.on('memory',(dats)=>{
    user = dats.user;
    if( dats.load){
	game_load_memory();
    }
});
socket.on('error',()=>{
    enable = false;
});
socket.on('disconnect',()=>{
    enable = false;
});
socket.on('enable',()=>{
    enable = true;
});
socket.on('divclose',(res)=>{
    $(res.div).hide(res.time);
});
socket.on('divshow',(res)=>{
    $(res.div).show(res.time);
});
socket.on('respuesta', (res)=>{  
    console.log(res);
});
socket.on('counters', (res)=>{
    counters(res);
});
socket.on('url',(res)=>{
    window.location.replace("http://localhost:8080/"+res);		
});
socket.on('process',(res)=>{ 
    modal(res.dats);
});
socket.on('process_wait_end', (res)=>{ 
    //console.log('process_wait_end',res);
    end_process = res;
});
socket.on('process_add_start', (res)=>{ 
    //console.log('process_add_start',res);
    let x = document.getElementById('modal_text');
    let div = document.createElement("div");
    wait_process[res.id] = 'start';
    div.setAttribute("id", res.id);
    div.setAttribute("class","modal_txt_class");
    x.appendChild(div);
    document.getElementById(res.id).innerHTML = res.text;
});
socket.on('process_add_end', async (res)=>{ 
    //console.log('process_add_end',res);
    await bloq();
    wait_process[res.id] = 'end';
    let x = await  document.getElementById(res.id);
    x.innerHTML = await x.innerHTML+res.html;
    process_wait_end();
});
socket.on('process_add', (res)=>{ 
    //console.log(res);
    let x = document.getElementById('modal_text');
    let div = document.createElement("div");
    div.setAttribute("id", res.id);
    div.setAttribute("class","modal_txt_class");
    x.appendChild(div);
    document.getElementById(res.id).innerHTML = res.text;
});
socket.on('process_add_id', async (res)=>{ 
    //console.log(res);
    await bloq();
    let x = await  document.getElementById(res.id);
    x.innerHTML = await x.innerHTML+res.html; 
});
socket.on('process_end', (res)=>{
    process_end(res);
});
socket.on('alerta', (res)=>{
    alerta(res);
});
socket.on('des', (res)=>{
    des(res);
});
socket.on('ubloq', (res)=>{
    ubloq();
});
socket.on('javascript', (res)=>{
    for( let a in res.script){
	java_scripts(res.script[a],res);
    }
});
socket.on('javascriptV2', (res)=>{
    window[res.script](res);
});
socket.on('html', (res)=>{
    bloq();
    container.innerHTML = res.html; 
    ubloq();
});
socket.on('htmlv2', (res)=>{
    bloq();
    $(res.htmlid).html(res.html);
    if( res.script !== undefined){
	for( let a in res.script){
	    java_scripts(res.script[a],res);
	}
    }
    ubloq();
});
socket.on('append', (res)=>{
    bloq();
    $(res.htmlid).append(res.html);
    if( res.script !== undefined){
	for( let a in res.script){
	    java_scripts(res.script[a]);
	}
    }
    ubloq();
});


socket.on('formv2', (res)=>{
    getid(res.htmlid).innerHTML = res.form;
    form[res.idform] = res.items;
    if( res.script !== undefined){
	for( let a in res.script){
	    java_scripts(res.script[a]);
	}
    }
    ubloq();
});

socket.on('html_head', (res)=>{        
    document.getElementById('head').innerHTML = res.html; 
});
socket.on('html_game', (res)=>{    
    bloq();
    let game= document.getElementById('game');
    game.innerHTML = res.html; 
    for( let a in res.script){
	java_scripts(res.script[a]);
    }
    if( res.idform !== undefined){	
	form[res.idform] = res.items;
    }
    if( res.idFormArr !== undefined){	
	for( let i in res.idFormArr){
	    let idf = res.idFormArr[i];
	    form[idf] = res.iArrs[idf];
	}
    }
    if( res.tables !== undefined){
	for( let i in res.tables){
	    let table = res.tables[i];
	    $('#'+table.name).DataTable( table.params);
	}
    }
    ubloq();
});

socket.on('form', (res)=>{
    container.innerHTML = res.form;
    form[res.idform] = res.items;
    ubloq();
});

const ch_manager = (img)=>{
    $('#managerimg').css('background-image','url("/img/manager/'+img+'.png")');
//    document.getElementById('manager_img').innerHTML
}
let process_end = (res)=>{
    let x = document.getElementById('modal_text').innerHTML;
    let t = document.getElementById('modalheader').innerHTML;
    let b = document.getElementById('modal_btext').innerHTML;
    if( res.acept == true){
	modal({title: t, text:x, bclose: res.bclose, action: res.action, action_dats: res.action_dats, acept_title: res.acept_title});	
    }else{
	modal({title: t, text:x, bclose: res.bclose, acept_title: ''});
    }
    $("body").css("cursor", "default");
}
let process_wait_end = ()=>{
    let pasa = 0;
    for( let i in wait_process){
	//console.log(i,wait_process[i]);	
	if(wait_process[i] == 'start'){
	    pasa = 1;
	}
    }
    if( pasa == 0){
	//console.log('pasa == 0',end_process);
	wait_process = {};
	process_end(end_process);
    }
}
let  send_form = (idform)=>{
    bloq();
    dats = {'name': idform};
    //console.log(form[idform]);
    for ( let a in form[idform]){
	//console.log(a);
	dats[a] = document.getElementById('form_'+idform+'_'+a).value;
    }
    //console.log(dats);
    socket.emit('form', dats);
}
let send_button_and_close = (dat)=>{
    let a = dat.dats.replace(/__/g, '"');
    dat.dats = JSON.parse(a);
    console.log(dat);
    ioclosed(dat.div,dat.time);
    $(dat.div+'_text').html('');
    $(dat.div+'_btext').html('');
    send_button(dat);
}
let  send_button = (dat)=>{
    bloq();
    socket.emit('button',dat);
}
let java_scripts = (name_script,res)=>{
    window[name_script](res);
}
let bloq = async ()=>{
    await $("#bloquear").show();
    await $("body").css("cursor", "progress");
}

let ubloq = ()=>{
    $("#bloquear").hide();
    $("body").css("cursor", "default");
}

const acept = (name,json)=>{ 
    let time = 0;
    bloq();
    if( json.time !== undefined){
	time = json.time;
    }
    $('#'+name).show(time);
    $('#'+name+'header').html(json.title);  
    $('#'+name+'_txt').html(json.text);
    if( json.bclose ){
	$('#'+name+'close').show();
    }else{
    	$('#'+name+'close').hide();
    }
    let a = JSON.stringify(json.action_dats).replace(/\"/g, '__');
    $('#'+name+'_btxt').html('<div onclick="send_button_and_close({div:\'#'+name+'\', time: '+time+', name:\''+json.action+'\', dats: \''+a+'\' })">'+json.acept_title+'</div>');
}


const info = (txt)=>{
    dat = {
	name : "info",
	dats : txt
    };
    socket.emit('button',dat);
}
let des = async(json)=>{
    await bloq();

    $('#desbox').css('left',mouseCoords.clientX+'px');
    $('#desbox').css('top',mouseCoords.clientY+'px');
    await $('#deshtml').html(json.html);
    await $('#des').show();
    document.getElementById("des").addEventListener("click",desclose);
}
let desclose = function(){
    document.getElementById("des").removeEventListener("click",desclose);
    ubloq();
    closed('#des');
}

const alerta = async (json)=>{
    await bloq();
    await $('#alerta').show();

    $('#alertaheader').html(json.title);  
    $('#alerta_txt').html(json.text);
    if( json.bclose || json.bclose === undefined ){
    	$('#alertaclose').show();//default TRUE
    }else{
	$('#alertaclose').hide();
    }
    if( json.btxt ){
	$('#alerta_btxt').html(json.btext);
    }else{
	$('#alerta_btxt').html('');
    }
}

const modal = async (json)=>{ 
    await bloq();
    await $('#modal').show();
    $('#modalheader').html(json.title);  
    $('#modal_text').html(json.text);
    //console.log('json.bclose=',json.bclose);
    if( json.bclose ){
	$('#modalclose').show();
    }else{
    	$('#modalclose').hide();
    }
    if( json.action_dats !== undefined ){
	let a = JSON.stringify(json.action_dats).replace(/\"/g, '__');
	if ( json.acept_title != ''){
	    $('#modal_btext').html('<div onclick="send_button_and_close({div: \'#modal\',name:\''+json.action+'\', dats: \''+a+'\' })">'+json.acept_title+'</div>');
	}
    }
}


const ioclosed = (id,time)=>{ 
    ubloq();
    $(id).hide(time);
}
const filecard = (id)=>{ 
    let dat = '{'+document.getElementById(id).innerHTML+'}';
    let json = JSON.parse(dat);
    for( let i in json){
        let txt = json[i];
	let x = i.split(' ');
	if( x[0] == 'div'){
            document.getElementById(x[1]).innerHTML = txt;
	}
	if( x[0] == 'input'){
	    document.getElementById(x[1]).value = txt;
	}
    }
}
function change_x(id){
    document.getElementById(id).className = 'class_x';
}
function getCombo(selectObject){
    variableHTML = selectObject.value;

}
function testIO(){
    if(!enable){
	container.innerHTML = '<center><div class="border_line font_title"> Error socket:<br> not conected. Sorry.<br> Restart Program.<div class="diva"><a class="Button font_normal" href="JavaScript:window.close()">Close</a></div></div></center>';
    }
}
setInterval(testIO,2000);
