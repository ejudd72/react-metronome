import React, { Component } from 'react';
import click1 from './click1.wav';
import click2 from './click2.wav';
import './Metronome.css';

class Metronome extends Component {

    constructor(props){
        super(props);

        this.state = { 
            playing: false, 
            count: 0,
            bpm: 60,
            beatsPerBar: 4
        }

        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);

        this.handleBpmChange = this.handleBpmChange.bind(this);
    }

    startStop = () => {
        if (this.state.playing) {
            clearInterval(this.timer);
            this.setState({
                playing: false
            });
        } else {
            this.timer = setInterval(
                this.playClick,
                (60 / this.state.bpm) * 1000
            );
            this.setState(
                {
                    count: 0,
                    playing: true
                },
                this.playClick
            );
        }
    }

    playClick = () => {
        const { count, beatsPerBar } = this.state;

        if (count % beatsPerBar === 0) {
            this.click2.play();
        } else {
            this.click1.play();
        }

        this.setState(state => ({
            count: (state.count + 1) % state.beatsPerBar
        }));
    };

    handleBeatsPerBarChange = e => { 
        const {bpm} = this.state;

        const beatsPerBar = e.currentTarget.value;

        if (this.state.playing) {
            //stop old timer and start a new one 
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

            // set the new BPM and reset the beat counter
            this.setState({
                count: 0,
                beatsPerBar
            })

        } else {
            // otherwise just update the bpm
            this.setState({ bpm });
        }
        this.setState({ bpm });
    }

    handleBpmChange = e => { 
        const bpm = e.currentTarget.value;

        if (this.state.playing) {
            //stop old timer and start a new one 
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

            // set the new BPM and reset the beat counter
            this.setState({
                count: 0,
                bpm
            })
        } else {
            // otherwise just update the bpm
            this.setState({ bpm });
        }
        this.setState({ bpm });
    }

    render() {
        const { playing, bpm, beatsPerBar } = this.state;
    
        return (
          <div className="metronome">
              <div className="beats-input">
              <label>Beats per bar</label>
               <input
                type="number"
                value={beatsPerBar}
                onChange={this.handleBeatsPerBarChange} />
            </div>
            <div className="bpm-slider">
              <label>{bpm} BPM</label>
              <input
                type="range"
                min="60"
                max="240"
                value={bpm}
                onChange={this.handleBpmChange} />
            </div>
            <button onClick={this.startStop}>
              {playing ? 'Stop' : 'Start'}
            </button>
          </div>
        );
      }
}

export default Metronome;
