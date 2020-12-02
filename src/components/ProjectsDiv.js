import "../App.css";
import React from "react";
import Project from "./Project";

class ProjectsDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: this.props.amount,
    };
    if (this.props.all === true) {
      this.setState({ amount: descs.length });
    }
    this.create = this.create.bind(this);
  }

  create() {
    let projs = [];
    let counter = 0;
    for (var j in ranks) {
      let i = ranks[j];
      if (counter === this.state.amount) {
        break;
      }
      projs.push(auto(i));
      counter++;
    }
    console.log(projs);
    return projs;
  }

  render() {
    return <div className="Projects">{this.create()}</div>;
  }
}

export default ProjectsDiv;

let ranks = [
  "Covid-19 Quiz",
  "Radish Newspaper Website",
  "Murder Mystery Role Picker",
  "Shopping List App",
  "Cobra Kai Clone",
];

let descs = {
  "Radish Newspaper Website": `In my freshman year at highschool, I joined a satirical school newspaper called The Radish. I thought it might be cool
    to make a website for it. So I did. The website includes contacts, quotes from members, and every digitized issue of the magazine I could find.
    It looks pretty cool, check it out.`,

  "Murder Mystery Role Picker": `I play Murder Mystery with one of my friends and I saw that we needed a better system for picking roles. It started
    as picking post-its, which had a lot of problems. Then in Python I made a random word picker to choose, which was better, but not perfect.
    This system, although it has a few confusing bugs, takes in players names and based on weights chooses who gets what role (meaning if you
    were one role it is less likely you will be that role next round)`,

  "Shopping List App": `This was a fun beginner project I did when I was learning to build websites with code. It's a little rough
    around the edges but I think it's pretty cool. Plus, I made it so that it stays in your browser until you press the clear button, 
    even after you close the tab!`,

  "Cobra Kai Clone": `When I was watching the Cobra Kai series on Netflix, I wanted to recreate the website they made on the show. 
    They showed very little of the website for not a lot of time, but I think I did a pretty good job at recreating it. 
    Sidenote: watch Cobra Kai, it's good.`,

  "Covid-19 Quiz": `This was my teams entry to my first ever hackathon. It is a website that quizes you on your knowledge of Covid-19
    and hopefully helps you learn a little bit.`,
};

function auto(name) {
  let id = name.replace(/ /g, "");
  let desc = descs[name];
  let blank = "./pages/";
  let img = blank + "I/" + name + ".png";
  let file = blank + name + "/index.html";
  return <Project id={id} desc={desc} img={img} file={file} name={name} />;
}
