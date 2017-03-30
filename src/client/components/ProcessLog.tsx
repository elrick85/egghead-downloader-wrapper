/**
 * Created by zauri_000 on 20.03.2017.
 */

import * as React from "react";
import {IStep, ProcessLogDataProvider, StepStatus} from "../providers/ProcessLogDataProvider";
import {EventEmitter} from "fbemitter";

interface IProcessLogState {
    steps: IStep[],
}

export class ProcessLog extends React.Component<any, IProcessLogState> {
    state: IProcessLogState = {
        steps: []
    };

    emitter: EventEmitter;

    private pl: ProcessLogDataProvider = new ProcessLogDataProvider();

    private getLog(){
        return this.pl.getLog();
    }

    constructor(){
        super();

        this.emitter = global["appEmitter"];

        this.emitter.addListener("download.data.chunk", (chunk) => {
            let steps = this.state.steps.slice();

            chunk && steps.push(this.pl.createStepFromMessage(chunk));
            this.setState({steps: steps});
        });

        this.emitter.addListener("log.clear", () => {
            this.setState({steps: []});
        })
    }

    componentDidMount() {
        /*this.getLog()
            .then((steps: IStep[]) => {
                this.setState({steps: steps});
            });*/
    }

    getLabel(data: IStep){
        if(data.status === StepStatus.ERROR){
            return <span className="label label-danger">ERR</span>
        } else {
            return <span className="label label-success">OK</span>
        }
    }

    render() {
        let _steps = this.state.steps;

        if(_steps.length){
            //let steps = _steps.map((data, i) => <div className="list-item" key={i} >{this.getLabel(data)} <samp>{data.message}</samp></div>);
            let steps = _steps.map((data, i) => `${data.message}\n`);

            return <div className="container"><pre className="row">{steps}</pre></div>;
        }

        return <div className="container loading">No data</div>
    }
}