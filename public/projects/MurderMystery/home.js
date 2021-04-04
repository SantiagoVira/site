let All=[]
let Am={'M':0, 'S':0, 'I':0}

function Remove(arr, item){
    let index = arr.indexOf(item);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

class Player{
    constructor(name, r, d) {
        this.div=d
        
        Am[r.toUpperCase()]+=1
        let l=All.length

        this.name = name
        this.m=100/(l+1)
        this.s=100/(l+1)

        this.role=r

        if (l>0){
            let m2=this.m/l 
            let s2=this.s/l

            for(var i=0; i<l; i++){
                let p=All[i]
                p.m=Math.abs((p.m-m2).toFixed(1))
                p.s=Math.abs((p.s-s2).toFixed(1))
                
            }

        }
        All.push(this)
    }


    Role(r) {
        this.role=r;
        let inocs=Am['I']*2+2
        let l=All.length

        if(r=='M'){
            l-=Am['M']
            this.m-=1
            let m2=(this.m-inocs)/l
            for(var i=0; i<All.length; i++){
                let p=All[i]
                p.m=Math.abs((p.m+m2).toFixed(1))
            }
            this.m=1

        }else if(r=='S'){
            l-=Am['S']
            this.s-=1
            let s2=(this.s-inocs)/l
            for(var i=0; i<All.length; i++){
                let p=All[i]
                p.s=Math.abs((p.s+s2).toFixed(1))
            }
            this.s=1

        }else{
            this.m=Math.abs((this.m+2).toFixed(1))
            this.s=Math.abs((this.s+2).toFixed(1))
        }
    }


    Leave(r){
        Am[r.toUpperCase()]-=1
        Remove(All, this)
        let l=All.length
        let m=this.m/l
        let s=this.s/l

        for(var i=0; i<l; i++){
            let p=All[i]

            p.m=Math.abs((p.m+m).toFixed(1))
            p.s=Math.abs((p.s+s).toFixed(1))
            
        }

        this.div.remove()

        if (All.length<3){
            if(document.getElementById('ModeButton')){
                document.getElementById('ModeButton').remove()
            }
        }

        Amounts()
        DisableOnNone()
    }

}

function SSS(){
    let s=0
    for(var i=0; i<All.length; i++){
        let p=All[i]
        s+=p.s
    }
    return s
}
function MMM(){
    let s=0
    for(var i=0; i<All.length; i++){
        let p=All[i]
        s+=p.m
    }
    return s
}

function print(txt){ console.log(txt) }

function choose(l, b){
    let Al=[]
    for(var i=0; i<l.length; i++){
        let l2=l[i]
        let t=l2[0]
        let p=l2[1]
        for(var qac=0; qac<t*10; qac++){
            Al.push(p)
        }
    }
    let f=[]
    for(var ql=0; ql<b; ql++){
        f.push(Al[Math.floor(Math.random()*Al.length)])
    }
    return f
}

function play(){
    StopButton()

    let M=Am['M']
    let S=Am['S']

    let mc=[]
    for(var i=0; i<All.length; i++){
        let p=All[i]
        mc.push([p.m, p])
    }
    let m=choose(mc, M)

    let sc=[]
    for(var i=0; i<All.length; i++){
        let p=All[i]

        if(!m.includes(p)){
            sc.push([p.s, p])
        }
    }
    let s=choose(sc, S)

    let II=[]
    for(var i=0; i<sc.length; i++){
        let p=sc[i]
        if (!(s.includes(p))){
            II.push(p[1])
        }
    }


    for(var i=0; i<m.length; i++){
        let p=m[i]
        p.Role('M')
    }
    for(var i=0; i<II.length; i++){
        let p=II[i]
        p.Role('I')
    }
    for(var i=0; i<s.length; i++){
        let p=s[i]
        p.Role('S')
    }
    reveal(m, s, II)
}

function create(role){

    let newDiv = document.createElement("div");
    newDiv.className = "r";

    let input = document.createElement("INPUT");
    input.setAttribute("type", "text");
    input.className='in'

    let ppp = new Player(' ', role, newDiv)

    input.onblur=function() {
        let i=input
        i.style.background="#e4e3e3cc"

        ppp.name=i.value
    };

    input.onclick = function (){
        let i=input
        i.style.background="#cfcdcdcc"
    }


    let minusbuttonI = document.createElement("button");
    minusbuttonI.innerHTML = "-";
    minusbuttonI.className = 'leave leaveI'
    minusbuttonI.name = 'leaveI'
    minusbuttonI.onclick=function (){
        ppp.Leave('I')
    }
    newDiv.appendChild(minusbuttonI);

    let minusbuttonS = document.createElement("button");
    minusbuttonS.innerHTML = "-";
    minusbuttonS.className = 'leave leaveS'
    minusbuttonS.name = 'leaveS'
    minusbuttonS.onclick=function (){
        ppp.Leave('S')
    }
    newDiv.appendChild(minusbuttonS);

    let minusbuttonM = document.createElement("button");
    minusbuttonM.innerHTML = "-";
    minusbuttonM.className = 'leave leaveM'
    minusbuttonM.name = 'leaveM'
    minusbuttonM.onclick=function (){
        ppp.Leave('M')
    }
    newDiv.appendChild(minusbuttonM);

    
    newDiv.appendChild(input);
    document.body.appendChild(newDiv);

    if (All.length==3){
        let b = document.createElement('img')
        b.onclick = play
        b.src = 'PlayBtn.jpg'
        b.className='pb'
        b.id='ModeButton'
        document.body.appendChild(b)
    }


    Amounts()
    DisableOnNone()
}

function reveal(m,s,III){

    for(var i=0; i<All.length; i++){
    let CurrentPlayer=All[i]

    let divA= document.createElement("div");
    divA.className = "flip-card"
    divA.id='FlipCardDiv'
    let currentdiv=CurrentPlayer.div  // Get the <ul> element to insert a new node
    currentdiv.insertBefore(divA, currentdiv.childNodes[-1]); 

    
    let divB= document.createElement("div");
    divB.className = "flip-card-inner"
    divA.appendChild(divB);
    

    let divCa= document.createElement("div");
    divCa.className = "flip-card-front"
    divB.appendChild(divCa);

    let ImA = document.createElement('img')
    ImA.alt="Avatar"
    ImA.style="width:100%;height:100%;border-radius: 50px;"
    ImA.src = "gold.jpg"
    divCa.appendChild(ImA)


    let divCb= document.createElement("div");
    divCb.className = "flip-card-back"
    divB.appendChild(divCb);

    let ImB = document.createElement('img')
    ImB.alt="Avatar"
    ImB.style="width:100%;height:100%;border-radius: 50px;"
    if(CurrentPlayer.role=='M'){
        ImB.src="Murderer.jpg"
    }else if(CurrentPlayer.role=='S'){
        ImB.src="Sheriff.jpg"
    }else{
        ImB.src="Innocent.jpg"
    }
    divCb.appendChild(ImB)

    }
}

function StopButton(){
    let b = document.getElementById('ModeButton')
    b.onclick = StopGame
    b.src = 'StopBtn.jpg'
}
function StopGame(){
    let b = document.getElementById('ModeButton')
    b.onclick = play
    b.src = 'PlayBtn.jpg'

    for(var i=0; i<All.length; i++){
        let CurrentPlayer=All[i]
        let di = CurrentPlayer.div
        let fc = document.getElementById('FlipCardDiv')
        di.removeChild(fc);
        fc.remove()
    
        }
}
function Amounts(){
    let ib=document.getElementById('Ibutton')
let sb=document.getElementById('Sbutton')
let mb=document.getElementById('Mbutton')

ib.innerHTML=Am['I']+'+'
sb.innerHTML=Am['S']+'+'
mb.innerHTML=Am['M']+'+'
}

function DisableOnNone(){
    function func(id, r){
        let b=document.getElementsByName(id)
        if(b){

            for(var i=0; i<b.length; i++){
                let bttn=b[i]
                if(Am[r]<=0){
                    bttn.disabled=true
                }else{
                    bttn.disabled=false
                }
            
                }
    }
    }
    func('leaveI', 'I')
    func('leaveS', 'S')
    func('leaveM', 'M')
}

function ResetOdds(){
    for(var i=0; i<All.length; i++){
        let p=All[i]
        let l=All.length
        p.m=100/l
        p.s=100/l
    
        }
}

function ClearAllPlayers(){
    let NewAll=[]
    for(var i=0; i<All.length; i++){
        let p=All[i]
        NewAll.push(p)
    
        }
    for(var i=0; i<NewAll.length; i++){
            let p=NewAll[i]
            p.Leave(p.role)
        
            }
}
