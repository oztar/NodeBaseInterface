document.onkeypress = function(e){
    e = e || windows.event;
    if( e.keyCode == 186){//open console
	if ( idGetDisplay('terminal') == 'none'){
	    idBlock('terminal');
	}else{
	    idNone('terminal');
	}
    }else if(e.keyCode == 116){
	e.keyCode=114;
	return false;
    }
}
function getid(id){return document.getElementById(id).innerHTML;}
function pushid(dato,id){document.getElementById(id).innerHTML = dato;}
function pushclass(clase,id){document.getElementById(id).className = clase;}
function idBlock(id){document.getElementById(id).style.display = 'block';}
function idNone(id){document.getElementById(id).style.display = 'none';}
function idGetDisplay(id){return document.getElementById(id).style.display;}
function Cwait(){document.body.style.cursor = 'wait';}
function Cauto(){document.body.style.cursor = 'auto';}
