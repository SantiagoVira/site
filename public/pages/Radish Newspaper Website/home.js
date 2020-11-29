function print(txt){
    console.log(txt);
}


//Be sure to add to the top of ISSUES!!!
let issues={
    'Quarantine Cover.jpg':'5.20.pdf',
    'Bernie Cover.jpg':'3.20.pdf',
    'Feb Cover.jpg':'2.20.pdf',
}

function load3(){
    var count=0
    for(var key in issues){
        let cov=key
        let pdf=issues[cov]

        let a=document.createElement('a');
        a.href=pdf;
        a.target="_blank"
        let i=document.createElement('img')
        i.src=cov
        i.className='column'
        a.appendChild(i);

        let div=document.getElementById('frame')

        div.appendChild(a);
        count+=1
        if(count>=2){break}
    }

    let a=document.createElement('a');
    a.href='issues.html';
    let i=document.createElement('img')
    i.src='ViewAll.png'
    i.style='max-width:25%;margin-left:4%;margin-top:5%'
    i.className='column'
    a.appendChild(i);

    document.getElementById('frame').appendChild(a);
}

function loadup(){
    for(var key in issues){
        let cov=key
        let pdf=issues[cov]

        let a=document.createElement('a');
        a.href=pdf;
        a.target="_blank"
        let i=document.createElement('img')
        i.src=cov
        i.className='column'
        a.appendChild(i);

        let div=document.getElementById('frame')

        div.appendChild(a);
    }
}


function Scroll(){
    document.getElementById("frame").scrollIntoView({behavior: 'smooth'});
    
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};
