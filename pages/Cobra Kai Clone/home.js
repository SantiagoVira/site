let MainImgVal=false;
function changeImage(){
    MainImgVal= !MainImgVal;

    if(MainImgVal){
        document.getElementById('Main Picture').src = 'Main picture.jpg';
    }
    else{
        document.getElementById('Main Picture').src = 'Main picture off.jpg';
    }

    var audio = document.getElementById("audio");
    audio.play();
    Scroll()
}

function Scroll(){
    setTimeout(() => {document.getElementById("SignInTop").scrollIntoView({behavior: 'smooth'});}, 1000);
    
}

window.onbeforeunload = function () {
    window.scrollTo(0,0);
};