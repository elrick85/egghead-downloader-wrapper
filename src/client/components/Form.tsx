import * as React from "react";
import {ITypeItem, OptionsDataProvider} from "../providers/OptionsDataProvider";
import {EventEmitter} from "fbemitter";

interface IFormState {
    typeSource: ITypeItem[],
    title?: string;
    link?: string,
    value?: number,
    error?: Error,
    type?: string,
    data?: string
}

export class CustomForm extends React.Component<any, IFormState> {

    state: IFormState = {
        typeSource: []
    };

    emitter: EventEmitter;

    private opt: OptionsDataProvider = new OptionsDataProvider();

    constructor(){
        super();
        this.emitter = global["appEmitter"];

        this.emitter.addListener("submit.error", (data:Error) => {
            this.setState({error: data});
        });

        this.emitter.addListener("submit.success", () => {
            this.setState({error: null});
        });

        this.emitter.addListener("download.error", (error) => {
            this.setState({error: error});
        });
    }

    getOptions(): Promise<ITypeItem[]> {
        return this.opt.getOptions();
    }

    componentDidMount() {
        this.getOptions()
            .then((source:ITypeItem[]) => {
                this.setState({typeSource: source});
            });
    }

    handleChange(e) {
        this.state[e.target.name] = e.target.value;
        //console.log("on change", e);
    }

    runDownloader(event){
        event.preventDefault();

        this.emitter.emit("log.clear");

        this.emitter.emit("runDownloader", {
            link: this.state.link,
            title: this.state.title
        })
    }

    render() {
        let _typeSource = this.state.typeSource;

        if(_typeSource.length) {
            let source = this.state.typeSource
                .map((data) => <option value={data.id} key={data.id}>{data.name}</option>);

            source.splice(0, 0, <option default value="0" key="0">All</option>);

            return <form>
                <div className="form-group">
                    {this.state.error ?
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="alert alert-danger" role="alert">
                                {this.state.error.message}
                            </div>
                        </div>
                    </div>
                    : null}
                    <div className="row">
                        <div className="col-lg-3">
                            <label className="control-label">Link to playlist</label>
                        </div>
                        <div className="col-lg-3">
                            <label className="control-label">Title</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3">
                            <input type="text"
                                   className="form-control"
                                   name="link"
                                   onChange={this.handleChange.bind(this)}
                                   value={this.state.link}/>
                        </div>
                        <div className="col-lg-3">
                            <input type="text"
                                   className="form-control"
                                   name="title"
                                   onChange={this.handleChange.bind(this)}
                                   value={this.state.title}/>
                        </div>
                        <div className="col-lg-1">
                            <button className="runDownloader btn btn-primary"
                                    onClick={this.runDownloader.bind(this)}>
                                <i className="glyphicon glyphicon-download"></i> RUN
                            </button>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label">Send to</label>
                    <div className="row">
                        <div className="col-lg-4">
                            <select className="form-control"
                                    name="type"
                                    value={this.state.value}
                                    onChange={this.handleChange.bind(this)}>
                                {source}
                            </select>
                        </div>
                        <div className="col-lg-5">
                            <button className="runDownloader btn btn-primary">
                                <i className="glyphicon glyphicon-send"></i> SEND
                            </button>
                        </div>
                    </div>
                </div>
            </form>;
        }

        return <div>Loading...</div>
    }
}