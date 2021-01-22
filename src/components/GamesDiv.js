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

let ranks = ["Clash", "Space Blast", "Snake"];

let descs = {
    Clash: `This is a game I made called Clash, no tutorial or anything just me. I did the pixel art and all that stuff by myself, and I like the way it turned out`,
    "Space Blast": `This is my first ever game in JavaScript. I was following a turtorial when making it, but it helped me learn a lot about creating games.
    After that, I was excited to keep making more of them`,
    Snake: `This is simply a snake game I made for fun.`,
};

function auto(name) {
    let id = name.replace(/ /g, "");
    let desc = descs[name];
    let blank = "../games/";
    let img = blank + "I/" + name + ".png";
    let file = blank + name + "/index.html";
    return <Project id={id} desc={desc} img={img} file={file} name={name} />;
}
