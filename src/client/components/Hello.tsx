import * as React from "react";
import {CustomForm} from "./Form";
import {HeaderBlock} from "../shared/header";
import {ProcessLog} from "./ProcessLog";

export interface IHelloProps {
    compiler: string;
    framework: string;
}

// 'IHelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class Hello extends React.Component<IHelloProps, undefined> {
    props:IHelloProps;

    render() {
        return (
                <div className="container">
                    <HeaderBlock/>
                    <div className="page-header">
                        <h1>Start</h1>
                    </div>
                    <CustomForm/>
                    <ProcessLog></ProcessLog>
                </div>);
    }
}