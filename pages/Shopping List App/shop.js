var vals={}
var ItemRed='#E0607E'
var ItemGreen='#86df0b'

function reset(){
    //gets rid of the lists
    localStorage.setItem('storedItem', JSON.stringify([]));
    localStorage.setItem('Values', JSON.stringify([]));

    //gets rid of the stuff on the screen
    ClearLabels()
}

function Color(name, label){
    if (vals[name] == true){
        label.style.backgroundColor=ItemGreen
      } else {
        label.style.backgroundColor=ItemRed
      }
}

function ClearLabels(){
    document.getElementById('buttons').innerHTML=''
}

function change(name, label){
    vals[name]= !vals[name]
    
    localStorage.setItem('Values', JSON.stringify(vals));
    Color(name, label)


    
}

function AddItem(item){
    let Label=document.createElement('p');
    Label.appendChild(document.createTextNode(item))
    Label.className='buttons'
    Label.id=item
    Label.onclick=function() {change(item, Label)}

    let final=document.getElementById('buttons')
    final.appendChild(Label)        

}

function AddAll(){
    let Item=JSON.parse(localStorage.getItem('storedItem'));
    for (index = 0; index < Item.length; index++) { 
        AddItem(Item[index]); 
    } 
    var vals=JSON.parse(localStorage.getItem('Values'))
    let names=Object.keys(vals)

    for (ind = 0; ind < names.length; ind++) {
        Color(names[ind], document.getElementById(names[ind]));
    }
}

function Add(){
    
    let storedItem=JSON.parse(localStorage.getItem('storedItem'));
    let NewItem=document.getElementById('item').value;

    
    let all =storedItem
    all.push(NewItem)

    vals[NewItem]=false;

    localStorage.setItem('storedItem', JSON.stringify(all));
    localStorage.setItem('Values', JSON.stringify(vals));

    ClearLabels()
    AddAll()

    document.getElementById('item').value = ''
    document.getElementById('addbutton').disabled = true;
    }

    function empty() {
        if(document.getElementById("item").value==="") { 
               document.getElementById('addbutton').disabled = true; 
           } else { 
               document.getElementById('addbutton').disabled = false;
           }
       }
