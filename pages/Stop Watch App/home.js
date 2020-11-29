let zero='00:00:00:00'

function Clear(){
    let txt=document.getElementById('timetext')
    txt.innerHTML=zero
}

function ChangeBtn(){
    let start=ChangeText()
    Timer(start)
}

function ChangeText(){
    let btn=document.getElementById('changebtn')
    let btntxt=btn.innerHTML
    if(btntxt=='Play'){btn.innerHTML='Pause'; return true}
    else{btn.innerHTML='Play'; return false}
}

function Timer(go){
    //if go is True, start adding to timer
    //if it's false, make the timer stop counting
}