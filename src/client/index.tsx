import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
import { FooterBlock } from "./shared/footer";

ReactDOM.render(
    <div><Hello compiler="TypeScript" framework="React" /><FooterBlock/></div>,
    document.getElementById("example")
);