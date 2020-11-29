//  ID : [file, img, name]
let descs = {
  Radish: `In my freshman year at highschool, I joined a satirical school newspaper called The Radish. I thought it might be cool
    to make a website for it. So I did. The website includes contacts, quotes from members, and every digitized issue of the magazine I could find.
    It looks pretty cool, check it out.`,

  MurderMystery: `I play Murder Mystery with one of my friends and I saw that we needed a better system for picking roles. It started
    as picking post-its, which had a lot of problems. Then in Python I made a random word picker to choose, which was better, but not perfect.
    This system, although it has a few confusing bugs, takes in players names and based on weights chooses who gets what role (meaning if you
    were one role it is less likely you will be that role next round)`,

  ShoppingList: `This was a fun beginner project I did when I was learning to build websites with code. It's a little rough
    around the edges but I think it's pretty cool. Plus, I made it so that it stays in your browser until you press the clear button, 
    even after you close the tab!`,

  CobraKai: `When I was watching the Cobra Kai series on Netflix, I wanted to recreate the website they made on the show. 
    They showed very little of the website for not a lot of time, but I think I did a pretty good job at recreating it. 
    Sidenote: watch Cobra Kai, it's good.`,

  StopWatch: `This is another beginner app I made to learn JavaScript and advance my coding skills. Its just the basic online
    stopwatch format that almost everyone knows. There is noting super special about this, but I just thought I would put it here.`,

  Quiz: `This was my teams entry to my first ever hackathon. It is a website that quizes you on your knowledge of Covid-19
    and hopefully helps you learn a little bit.`,
};
let P = {
  Quiz: ["Covid-19 Quiz/index.html", "I/Covid-19 Quiz.png", "Covid-19 Quiz"],
  Radish: [
    "Radish Newspaper Website/index.html",
    "I/Radish Newspaper Website.png",
    "Radish Newspaper Website",
  ],
  MurderMystery: [
    "Murder Mystery Role Picker/index.html",
    "I/Murder Mystery Role Picker.png",
    "Murder Mystery Role Picker",
  ],
  ShoppingList: [
    "Shopping List App/index.html",
    "I/Shopping List App.png",
    "Shopping List App",
  ],
  StopWatch: [
    "Stop Watch App/index.html",
    "I/Stop Watch App.png",
    "Stop Watch App",
  ],
  CobraKai: [
    "Cobra Kai Clone/index.html",
    "I/Cobra Kai Clone.png",
    "Cobra Kai Clone",
  ],
};

function loadup() {
  let left = true;
  for (var key in P) {
    let ID = key;
    let data = P[ID];
    let doc = data[0];
    let img = data[1];
    let name = data[2];
    let desc = descs[ID];

    let a = document.createElement("a");
    a.href = doc;
    a.className = "pTitle";
    a.id = ID;

    ///////////////
    a.target = "_blank";
    ///////////////

    //img
    let image = document.createElement("img");
    image.src = img;
    image.className = "link";

    //Title
    let title = document.createElement("P");
    title.appendChild(document.createTextNode(name));

    //Description
    let description = document.createElement("P");
    description.appendChild(document.createTextNode(desc));
    description.className = "desc";

    //Spacer below project
    let spacer = document.createElement("P");
    spacer.className = "spacer";

    //Put everything on the website
    a.appendChild(title);
    a.appendChild(image);
    a.appendChild(description);
    a.appendChild(spacer);

    if (left) {
      left = false;

      a.className += " l";
    } else {
      left = true;
      a.className += " r";
    }

    let div = document.getElementById("projects");
    div.appendChild(a);
  }
}
