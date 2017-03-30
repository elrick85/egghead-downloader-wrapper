import * as React from "react";

export class HeaderBlock extends React.Component<any, undefined> {
    render() {
        return <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">
                        Egghead Downloader
                    </a>
                </div>
            </div>
        </nav>
    }
}