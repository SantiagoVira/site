//number of questions per quiz
let numQuezs=8
var score=0
let Qcounter=0


//function called one the start button is pressed
const quiz = async () => {
        //wait for the title, description, image, and start button to go away
        const result = await byebye()
        setTimeout(() => {

            //Turn the json string into an HTML div
            var questions=generate()
            ez=getRandom(questions[0], Math.ceil(numQuezs/2)); 
            med=questions[1]; 
            hard=getRandom(questions[2], Math.ceil(numQuezs/2));

            //Randomly choose questions from that list
            chosen = getRandom(med, Math.floor(numQuezs/2))
            //display the first question
            display()
        
        }, 2000);}

//function to display a question
function display(){
    console.log(score)
    Qcounter++
    if(chosen.length==0){

        if(Qcounter-1==numQuezs){
        EndScreen()
        }
        else{
            if(score<Math.ceil(numQuezs/2)) {chosen = ez}
            else {chosen = hard}

            let q=chosen[0]
            q.style.animationName=''
            document.body.appendChild(q)
            chosen.shift()

            let numlab=document.getElementById('PlaceholderToReplace')
            numlab.innerText=Qcounter
        }
    }else{
    let q=chosen[0]
    q.style.animationName=''
    document.body.appendChild(q)
    chosen.shift()

    let numlab=document.getElementById('PlaceholderToReplace')
    numlab.innerText=Qcounter
    }

}
//function to choose randomly from an array
function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}
//function to gather all the html divs
function generate(){
    let questions=[[],[],[]]
    for(var i in QA){
        let res=quez(QA[i])
        let div=res[0]
        questions[res[1]].push(div)
    }
    
    return questions
}
//function to randomly shuffle the answers for each question
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
  }

//turn a string into a DOM text node
function text(txt){
    var h = document.createElement("p")
    var t = document.createTextNode(txt);
    h.appendChild(t);   
    return h
}

//function to take a json object and all of its parts
//and turn those into a div using JS DOM
function quez(obj){
        //set classname variables for each of the layered divs
        let allname='qpage'
        let qname='quez'
        let ansnames='answez'
        let aname='answer'
    
        //create all of the containers and package them together
        let All=document.createElement('div')
        All.className=allname
        All.id=allname
        let question=document.createElement('div')
        question.className=qname
        let answers=document.createElement('div')
        answers.className=ansnames
        answers.id=ansnames
        All.appendChild(question)
        All.appendChild(answers)

        //turn a string into answer format
        function ans(a){
            let t=text(a)
            t.className=aname
            let d=document.createElement('div')
            d.appendChild(t)
            d.appendChild(document.createElement('br'))
            return d
        }
        //Function to make a 'next' button once the person answers
        function nextbtn(){
            document.getElementById(ansnames).className+=' closed'
            let d=document.getElementById(allname)
            let b=document.createElement('BUTTON')
            b.className='start'
            var t = document.createTextNode("Next");
            b.appendChild(t);
            function fadeout(){
                let d=document.getElementById('qpage')
                d.style.animationName='fadeaway'
            }
            b.onclick = async () => {
                await fadeout()
                setTimeout(() => {document.getElementById('qpage').remove();display()}, 1000);}

            d.appendChild(b)
        }
        //turn a string into an answer that lights up when correct
        function correct(answ){
            let a=ans(answ)
            a.onclick = function() {
                a.childNodes[0].style.backgroundColor='limegreen'
                score++
                nextbtn()
            };
            a.id='yup'
            return a
        }
        //turn a strign into an answer that shows the correct answer when picked
        function wrong(answ){
            let a = ans(answ)
            a.onclick = function() {
                a.childNodes[0].style.backgroundColor='red'
                document.getElementById('yup').childNodes[0].style.backgroundColor='limegreen'
                nextbtn()
            };
            return a
        }
        function spant(sp, txt){
            let h = document.createElement("p")
            let t = document.createTextNode(txt);
            let s= document.createElement("SPAN")
            let spt = document.createTextNode(sp);
            s.appendChild(spt);   
            s.id='PlaceholderToReplace'
            h.append(s)
            h.append(t)
            
            return h
        }

        //add the text to the question div
        question.appendChild(spant('', ' '+obj.q))
        //shuffle the answers and give them correct or incorrect status
        let as=shuffle([
            correct(obj.a),
            wrong(obj.a1),
            wrong(obj.a2),
            wrong(obj.a3),
        ])
        //add all the formatted answers to the answer div
        for(var i in as){answers.appendChild(as[i])}

        //return the overall container div
        return [All, obj.d-1]
    }

//function to make the final screen
function EndScreen(){
    let path='./L/Certificates/'
    if(score<(numQuezs/4)){var message='Better Luck Next Time!'; path+='PPEP.jpg' }
    else if(score<2*(numQuezs/4)){var message='You can do better than that!'; path+='SS.jpg' }
    else if(score<3*(numQuezs/4)){var message='Nice Work'; path+='PP.jpg' }
    else{var message='Awesome Job!'; path+='EA.jpg' }

    let str=`<p class='mess'>${message}</p>
    <p class='scoring'>You got a ${score}/${numQuezs}<p>
    <img class='cert' alt='certificate' src=${path}>
    <button class='start goback' onclick='GoBack()'>Back Home</button>`
    
    document.body.appendChild(GenNode(str))
}

function GenNode(str){
    let All=document.createElement('div')
    All.insertAdjacentHTML( 'beforeend', str );
    return All
}

//function to move the home screen out of the way
function byebye(){
    function func(){
        let t=document.getElementById('go away')
        t.style.animationName ='quiztime'
        t.style.top = '-50%'

        let b=document.getElementById('start')
        b.remove()
    }

    const doit = async () => {
        const result = await func()
        setTimeout(() => {document.getElementById('go away').remove()}, 2000);
      }    
    doit()
    setTimeout(() => {null}, 2000);
}

//code to recreate the home screen
var homescreen=`
<div id='go away' class='goaway'>
    <p id='title' class='title'>Covid Quiz</p>
    <img alt='Pandemic Pupil' src='./L/Logo.png' class='graphic' id='graphic' align='left'>
    <div class='blurb' id='blurb'><p style='margin-right:5%;'>
        This quiz will test your knowledge on the pandemic and see how much you really know. The goal is to keep everbody safe 
        and informed, and hopefully prevent the spread of misinformation. Enjoy the quiz!
    </p></div></div>
<br>
    <button onclick='quiz()' id='start' class='start'>Start</button>
    <div class=redir>
        <a href='../index.html'>
            <img class='emoji' alt='Virus' src='L/emoji.png'>
        </a>
        <p class='redirtxt'>Back Home</p>
    </div>
    `
function GoBack(){
    score=0
    Qcounter=0
    let d=document.body
    while (d.firstChild) {
        d.removeChild(d.firstChild);
    }
    let newun=GenNode(homescreen)
    d.appendChild(newun)
    newun.id='go away'
    newun.className='goaway'

    let t=document.getElementById('go away')
    t.style.animationName =''
    t.style.top = '0%'
    t.style.animationDuration= '2s'
    t.style.position= 'relative'
}

//json containing all of the questions
let QA=[
    {
        "q": "What part of body does the COVID-19 Affect?",
        "a": "The Lungs/Airways",
        "a1": "The Heart/Blood Vessels",
        "a2": "The Lower Body",
        "a3": "The Brain and Nervous System",
        "d": 1
    },
    {
        "q": "Which is NOT a symptom of the Coronavirus?",
        "a": "Loss of appetite",
        "a1": "Fever",
        "a2": "Loss of taste/smell",
        "a3": "Tiredness",
        "d": 2
    },
    {
        "q": "Where was the Coronavirus first discovered?",
        "a": "Wuhan, China",
        "a1": "New York, USA",
        "a2": "Volgograd, Russia",
        "a3": "Wales, Britain",
        "d": 1
    },
    {
        "q": "People with pre-existing illnesses are more vulnerable to Coronavirus",
        "a": "True, pre-existing conditions weaken your immune system and leave you compromised",
        "a1": "True, pre-existing conditions can cause coronavirus",
        "a2": "False, your immune system can fight both pre-existing conditions and covid",
        "a3": "False, pre-existing conditions prevent you from getting coronavirus",
        "d": 1
    },
    {
        "q": "How far do you have to be, at minimum, from other people to be safe from Coronavirus?",
        "a": "6 Feet",
        "a1": "2 Feet",
        "a2": "15 Feet",
        "a3": "11 Feet",
        "d": 1
    },
    {
        "q": "Where does Coronavirus spread the fastest?",
        "a": "In an urban setting",
        "a1": "In a rural setting",
        "a2": "In a suburban setting",
        "a3": "In water",
        "d": 2
    },
    {
        "q": "Wearing a mask helps stop the spread of Coronavirus",
        "a": "True, our nose and mouth remains covered when moving and talking",
        "a1": "True, wearing the mask automatically gets rid of all coronavirus germs",
        "a2": "False, covering our mouth and nose does not prevent the spread of coronavirus",
        "a3": "False, masks are just bothersome and do not really help",
        "d": 1
    },
    {
        "q": "Getting a flu vaccine helps you just in case you get both the flu and Coronavirus at the same time",
        "a": "True, the flu vaccine helps you fight the flu, which lets your body focus more on the coronavirus",
        "a1": "False, the flu vaccine is completely ineffective",
        "a2": "True, the flu vaccine helps fight both the flu and Coronavirus",
        "a3": "False, the flu vaccine worsens your symptoms if you have both the coronavirus and the flu",
        "d": 2
    },
    {
        "q": "What does the 19 in COVID-19 stand for?",
        "a": "2019, the year it was discovered",
        "a1": "the 19th strain of Coronavirus",
        "a2": "the 19 countries its affected so far",
        "a3": "the 19 proteins it has in its shell",
        "d": 2
    },
    {
        "q": "A vaccine helps your immune system produce antibodies against a virus",
        "a": "True, the vaccine gives a dead piece of the virus to help train you immune system",
        "a1": "True, the vaccine automatically destroys any virus particls you come into contact with",
        "a2": "False, vaccines don't help your immune system at all",
        "a3": "False, the vaccine is the virus and it makes you sick to give you immunity",
        "d": 2
    },
    {
        "q": "Why is the Coronavirus is spreading so rapidly?",
        "a": "Because of a lack of safety precautions and the fact that it is airborne",
        "a1": "It is going the set speed viruses can spread",
        "a2": "It's not because everyone is wearing a mask and staying safe",
        "a3": "Because it travelled all the way from China",
        "d": 1
    },
    {
        "q": "What happens in a phase 3 test of a vaccine?",
        "a": "The Coronavirus vaccine is tested on thousands of people",
        "a1": "There are three people testing Coronavirus",
        "a2": "The process of making the vaccine is changed to phase three, making it more effective",
        "a3": "The vaccine is simulated in a supercomputer",
        "d": 3
    },
    {
        "q": "Where was the first known death due to COVID-19 in the US?",
        "a": "California",
        "a1": "New York",
        "a2": "Texas",
        "a3": "Florida",
        "d": 3
    },
    {
        "q": "Who was the first governor to close schools in response to the pandemic?",
        "a": "Mike DeWine (Ohio\u2019s governor)",
        "a1": "Andrew Cuomo (New York's governor)",
        "a2": "Phil Murphy (New Jersey's Governor)",
        "a3": "Jared Polis (Colorado's Governor)",
        "d": 3
    },
    {
        "q": "About what percentage of infected people recover without needing hospital treatment according to the World Health Organization website?",
        "a": "80%",
        "a1": "70%",
        "a2": "50%",
        "a3": "60%",
        "d": 3
    },
    {
        "q": "How big is the coronavirus?",
        "a": "80 billionths of a meter in diameter",
        "a1": "8 billionths of a meter in diameter",
        "a2": "800 billionths of a meter in diameter",
        "a3": "800 millionths of a meter in diameter",
        "d": 3
    },
    {
        "q": "What does the virus attach itself to when it enters the human body?",
        "a": "Ace-2 receptors in the lining of the airways",
        "a1": "Red blood cells",
        "a2": "Antigens",
        "a3": "White blood cells",
        "d": 2
    },
    {
        "q": "How long can the virus survive on plastic and stainless steel surfaces according to studies?\n",
        "a": "72+ hours",
        "a1": "10-20 hours",
        "a2": "30-50 hours",
        "a3": "60-70 hours",
        "d": 3
    },
    {
        "q": "Once infected with the coronavirus, how many days can it take to show symptoms?",
        "a": "2-14 days",
        "a1": "7-14 days",
        "a2": "2-12 days",
        "a3": "7-18 days",
        "d": 2
    },
    {
        "q": "A high temperature and a continuous cough have been official coronavirus symptoms in the UK since the start of the pandemic. But which of these did the government add to the list of early symptoms that people should look for?",
        "a": "Losing your sense of smell or taste",
        "a1": "Diarrhea",
        "a2": "Stomach Ache",
        "a3": "Runny Nose",
        "d": 1
    },
    {
        "q": "The coronavirus is more contagious than the flu.",
        "a": "True, the coronavirus is airborne mmaking it more dangerous",
        "a1": "True, the coronavirus can't be killed with loud music unlike the flu",
        "a2": "False, both equally contagius since they are the same thing",
        "a3": "False, the flu is deadlier and more contagius",
        "d": 1
    },
    {
        "q": "When was the first case of COVID-19?",
        "a": "November 17, 2019",
        "a1": "November 16, 2019",
        "a2": "November 15, 2019",
        "a3": "November 20, 2019",
        "d": 3
    },
    {
        "q": "Antiobiotics can treat coronavirus.",
        "a": "False, antibiotics cannot treat viruses",
        "a1": "False, scientists haven't developed the right Antibiotics yet",
        "a2": "True, antibiotics help lessen symptoms ",
        "a3": "True, antibiotics have always been able to treat any type of virus",
        "d": 2
    },
    {
        "q": "Which of the following groups is COVID-19 the most dangerous for?",
        "a": "Elders and people with underlying health conditions",
        "a1": "Average Adults",
        "a2": "Babies",
        "a3": "Teenagers",
        "d": 1
    },
    {
        "q": "How long does the novel coronavirus survive outside the body?",
        "a": "Several hours to days",
        "a1": "Several minutes",
        "a2": "Several seconds",
        "a3": "Several months",
        "d": 2
    },
    {
        "q": "Covid-19 infects people by injecting its genome into their cells. What type of genetic material is the Covid-19 genome made up of?\n",
        "a": "RNA",
        "a1": "DNA",
        "a2": "Mitchondria",
        "a3": "Ribosome",
        "d": 3
    },
    {
        "q": "How should a mask be properly worn?",
        "a": "Put it over your nose and mouth and secure it under your chin",
        "a1": "Put it under your nose and mouth and secure it under your chin",
        "a2": "Put it over your eyes",
        "a3": "Just cover the mouth and not the nose",
        "d": 2
    },
    {
        "q": "What is a fomite?",
        "a": "A contaminated object or surface",
        "a1": "A contaminated person",
        "a2": "Another name for coronavirus",
        "a3": "An uncontaminated object or surface",
        "d": 3
    },
    {
        "q": "Can letters, products and packages be contaminated by the coronavirus (COVID-19) virus?",
        "a": "Yes because it can carry germs",
        "a1": "No because it does not carry any outside germs",
        "a2": "Yes because they do not have masks on them",
        "a3": "No because they are always clean with no germs",
        "d": 1
    },
    {
        "q": "On March 1st, there were fewer than a dozen known COVID-19 related deaths in the US. Two months later, how many COVID-19 deaths were reported in the US?",
        "a": "As of May 1, there were about 60,000 deaths in the US.",
        "a1": "As of May 1, there were about 600,000 deaths in the US.",
        "a2": "As of May 1, there were about 6,000 deaths in the US.",
        "a3": "As of May 1, there were about 600 deaths in the US.",
        "d": 3
    }
]