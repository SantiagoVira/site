import React from "react";
import "./Footer.css";

import {
    Instagram,
    MailOutline,
    GitHub,
    Brightness4,
} from "@material-ui/icons";
import Row from "../Utils/Row";
import Col from "../Utils/Col";
import { IconButton } from "@material-ui/core";

//import Logo from "../../images/Logo Circular.png";
import Logo from "./Logo";
import { useEffect } from "react";

function changeLightMode() {
    const pairs = [
        ["text", "bg"],
        ["blue1", "blue2"],
    ];
    pairs.forEach((pair) => {
        const first = getComputedStyle(
            document.documentElement
        ).getPropertyValue(`--${pair[0]}`);
        const second = getComputedStyle(
            document.documentElement
        ).getPropertyValue(`--${pair[1]}`);
        document.documentElement.style.setProperty(`--${pair[0]}`, second);
        document.documentElement.style.setProperty(`--${pair[1]}`, first);
    });

    const darkMode = getComputedStyle(document.documentElement)
        .getPropertyValue(`--bg`)
        .includes("303131");
    localStorage.setItem("colorMode", darkMode);
}

function SocialsLink(props) {
    return (
        <IconButton
            onClick={() => {
                window.open(props.to, "_blank");
            }}
            className="SocialsLink"
        >
            {props.children}
        </IconButton>
    );
}

function Footer() {
    useEffect(() => {
        if (localStorage.getItem("colorMode") === "false") {
            changeLightMode();
        }
    }, []);
    return (
        <footer>
            <Row className="FooterMain">
                <Col className="FooterContact">
                    <p>Contact Me</p>
                    <Row>
                        <SocialsLink to="https://www.instagram.com/8bitharrypotter/">
                            <Instagram className="SocialsIcon" />
                        </SocialsLink>
                        <SocialsLink to="https://mail.google.com/mail/u/0/?fs=1&to=8bitharrypotter@gmail.com&tf=cm">
                            <MailOutline className="SocialsIcon" />
                        </SocialsLink>
                        <SocialsLink to="https://github.com/SantiagoVira">
                            <GitHub className="SocialsIcon" />
                        </SocialsLink>
                    </Row>
                </Col>
                <Row className="footerRight">
                    <IconButton
                        onClick={changeLightMode}
                        className="ChangeLightMode"
                    >
                        <Brightness4 className="ChangeLightModeIcon" />
                    </IconButton>
                    <Logo width="2.75rem" />
                </Row>
            </Row>
        </footer>
    );
}

export default Footer;
