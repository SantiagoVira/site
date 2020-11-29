let newuser=false
let SignedIn=false

function Sign(mode){
    let inn=document.getElementById('inbtn')
    let up=document.getElementById('upbtn')
    let div=document.getElementById('content')
    
    if(mode=="up"){
        newuser=true
        up.className='btn activated'

        inn.className='btn'

        div.innerHTML=UpContent
    }else{
        newuser=false
        inn.className='btn activated'

        up.className='btn'

        div.innerHTML=InContent
    }
}

InContent=
    `
    <p class='tag'>Username:</p><input type='text' id='userField'>
    <br id='usernotfound'>

    <p class='tag'>Password:</p><input type='password' id='passField'>
    <img onclick='vis("passV", "passField")' id= 'passV' src='closed.png' class='eye'><br>

    

    <br style='padding-bottom:5%' id='incorrectpassword'>
    <button onclick='Verify()' class='verify'>Sign In</button>
    `


UpContent=
    `
    <p class='tag'>Name:</p><input type='text' id='nameField'>
    <br>
    <p class='tag'>Username:</p><input type='text' id='userField'>
    <br id='alreadyexists'>
    <p class='tag'>Password:</p><input type='password' id='passField'> 
    <img onclick='vis("passV", "passField")' id='passV' src='closed.png' class='eye'>
    <br id='Nomatch'>
    <p class='tag'>Confirm Password:</p><input type='password' id='confField'> 
    <img onclick='vis("confirmV", "confField")' id= 'confirmV' src='closed.png' class='eye'>
    <br style='padding-bottom:5%' id='nomatch'>
    <button onclick='Join()' class='verify'>Sign Up</button>
    `


function Auto(){
    let div=document.getElementById('content')
    div.innerHTML=InContent
}

let auth={
    santi:'1234'
}


function Verify(){
    let user = l(document.getElementById('userField').value)
    let passw = l(document.getElementById('passField').value)


    if(user in auth){
        NoErr(0)
        if (auth[user]==passw){
        SignedIn=true
        open("Message.html","_self")
        NoErr(1)
        }
        else{Err(1)}
    }
    else{Err(0)}
}

function l(str){
    return str.toLowerCase()
}

function vis(Iid, id){
    let img=document.getElementById(Iid)
    let src=img.src.toString()
    let inn=document.getElementById(id)

    if(src.search('open')>0){
        img.src='closed.png'
        inn.type='password'
    }
    else if(src.search('closed')){
        img.src='open.png'
        inn.type='text'
    }
}

function Join(){
    let user = document.getElementById('userField').value
    let passw = l(document.getElementById('passField').value)
    let conf = l(document.getElementById('confField').value)
    let name = document.getElementById('nameField').value

    if( !(l(user) in auth )){
        NoErr(2)
        if (passw==conf ){
            alert('Yes')
            NoErr(3)
            NoErr(4)
        }
        else{
            Err(3)
            Err(4)
        }
    }
    else{Err(2)}

    let message= name+' would like to join under the username '+user+'. Would you like to let them join?'
}

let errors=[
    ['usernotfound', 'User Not Found', 'userField', 'UNF'],
    ['incorrectpassword', 'Incorrect Password', 'passField', 'IP'],
    ['alreadyexists', 'Username Already Exists', 'userField', 'AE'],
    ['Nomatch', 'The Password and Confirmation do not match', 'passField', 'NM'],
    ['nomatch', 'The Password and Confirmation do not match', 'confField', 'NoM'],
]

function Err(i){
    let id=errors[i][0]
    let text=errors[i][1]
    let inp=errors[i][2]
    let did=errors[i][3]

    let p = document.createElement("P"); 
    p.innerHTML = text 
    p.className='errortxt'

    let d = document.createElement("P"); 
    d.appendChild(p)
    d.className='errorcont'
    d.id=did

    let div=document.getElementById(id)
    document.getElementById('content').insertBefore(d, div)

    let inn=document.getElementById(inp)
    inn.className+=' error'
}
function NoErr(i){
    let inp=errors[i][2]
    let did=errors[i][3]
    //delete div here, make the id in the other function
    let errdiv=document.getElementById(did)
    if(errdiv){
        errdiv.remove()
    }

    let inn=document.getElementById(inp)
    inn.className=''
}

//Messaging
function CheckSigned(){
    if (!(SignedIn==true)){
        alert('You need to sign in to be here')
        open('home.html',"_self")
    }
}

