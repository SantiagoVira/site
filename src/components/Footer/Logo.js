import React from "react";
import "./Footer.css";

function Logo(props) {
    return (
        <div className="footerLogo">
            <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width={props.width}
                height={props.width}
                viewBox="0 0 300.000000 300.000000"
                preserveAspectRatio="xMidYMid meet"
            >
                <g
                    transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)"
                    fill="#000000"
                    stroke="none"
                >
                    <path
                        className="FooterMyLogoPath"
                        d="M1237 2979 c-476 -83 -894 -405 -1097 -844 -143 -309 -177 -665 -95
-996 70 -280 205 -511 421 -719 313 -302 738 -451 1165 -411 372 34 686 186
946 455 236 244 372 530 414 870 14 120 7 326 -16 446 -120 618 -605 1095
-1220 1200 -154 26 -367 26 -518 -1z m814 -804 c-139 -324 -711 -1587 -723
-1600 -6 -6 -7 -1 -4 15 4 14 26 119 50 235 25 116 55 256 67 313 12 56 20
104 17 107 -2 2 -166 84 -365 182 l-361 178 281 387 c155 213 287 388 292 388
6 0 73 -138 150 -308 76 -169 153 -338 171 -376 l31 -68 103 168 c187 306 393
635 396 631 2 -1 -45 -115 -105 -252z"
                    />
                    <path
                        className="FooterMyLogoPath"
                        d="M1185 1959 c-71 -99 -149 -206 -173 -239 l-42 -58 247 -150 c137 -83
253 -151 258 -150 6 0 18 21 28 46 l18 46 -97 343 c-53 189 -99 343 -103 342
-3 0 -64 -81 -136 -180z"
                    />
                </g>
            </svg>
        </div>
    );
}

export default Logo;
