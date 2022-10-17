import React, {Component} from "react";

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {count: this.props.countdown, text: ""};
        this.interval = null;
    
        this.tempo = this.tempo.bind(this);
        this.inizio = this.inizio.bind(this);
    }

    tempo() {
        this.setState({count: this.state.count -1});
        if (this.state.count <= 1) {
            this.setState({count: "", text: "FERTIG"});
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    inizio() {
        this.setState({count: this.props.countdown, text: ""});

        if (this.interval != null) {
            clearInterval(this.interval);
        }

        this.interval = setInterval(this.tempo, 1000);
    }


    render() {
        return (<>
            <h3>Uebung 04</h3>
            <p>Timer</p>
            <p>{this.state.count}</p>
            <p>{this.state.text}</p>
            <button onClick={this.inizio}>Start</button> 
        </>)
    }
}

export default Timer;
