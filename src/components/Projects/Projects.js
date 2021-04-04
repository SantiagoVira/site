import React from "react";
import "./Projects.css";
import { Route, Switch, Link } from "react-router-dom";

import ProjectData from "./projectData.json";
import Col from "../Utils/Col";

import Error404 from "../Error404/Error404";
import Button from "@material-ui/core/Button";
//Projects I have when building this
/*
Vanilla:
- mm roles
- covid quiz

React:
- alldaydonkey
- sqrrlz
*/

function ProjectPage({ project }) {
    return (
        <Col className="ProjectBlogPageWrapper">
            <h1 className="ProjectBlogPageTitle">{project.title}</h1>
            <a href={project.link} target="_blank" rel="noreferrer">
                <img
                    alt={project.title}
                    src={`/projects/images/${project.src}`}
                    className="ProjectBlogPageImage"
                />
            </a>
            <p className="ProjectBlogPageDesc">{project.description}</p>
            <Button
                href={project.link}
                target="_blank"
                rel="noreferrer"
                variant="contained"
                className="ProjectBlogPageButton"
            >
                Project
            </Button>
        </Col>
    );
}

function ProjectBreakdown({ project }) {
    return (
        <Col className="ProjectBreakdownWrapper">
            <h1 className="ProjectBreakdownTitle">{project.title}</h1>
            <Link to={`/projects/${project.linkName}`}>
                <img
                    alt={project.title}
                    src={`/projects/images/${project.src}`}
                    className="ProjectBreakdownImage shadowed"
                />
            </Link>
        </Col>
    );
}

function Projects() {
    return (
        <Switch>
            <Route exact path="/projects" component={ProjectsHome} />
            {ProjectData.map((project, index) => (
                <Route
                    path={`/projects/${project.linkName}`}
                    render={() => <ProjectPage project={project} />}
                    key={index}
                />
            ))}
            <Route component={Error404} />
        </Switch>
    );
}

export default Projects;

function ProjectsHome() {
    return (
        <div className="ProjectsPageMain">
            {ProjectData.map((project, index) => (
                <ProjectBreakdown project={project} key={index} />
            ))}
        </div>
    );
}
