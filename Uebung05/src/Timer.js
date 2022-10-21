import React, {Component} from "react";
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/Textfield";


class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {count: this.props.countdown, text: "", render: true};
        this.interval = null;
    
        this.tempo = this.tempo.bind(this);
        this.inizio = this.inizio.bind(this);
        this.imposta = this.imposta.bind(this);
    }

    imposta(event) {
        const sek = event.target.value;
        this.setState({count: sek});
    }

    tempo() {
        this.setState({count: this.state.count -1});
        if (this.state.count <= 1) {
            this.setState({count: "", text: "FERTIG", render: true});
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    inizio() {
        this.setState({text: "", render: false});

        if (this.interval != null) {
            clearInterval(this.interval);
        }

        this.interval = setInterval(this.tempo, 1000);
    }


    render() {
        return (<>
            {this.state.render &&
            <Grid>
                <Grid>
                    <Typography variant="body">Timer einstellen:</Typography>
                    <br/>
                    <br/>
                    <TextField label="Sekunden" value={this.state.countdown} onChange={this.imposta}></TextField>
                </Grid>
            </Grid>
            }
            <p>Timer</p>
            <p>{this.state.count}</p>
            <p>{this.state.text}</p>
            <Button onClick={this.inizio}>Start</Button>
        </>)
    }
}

export default Timer;
