import React from "react";
import './Track.css'

class Track extends React.Component {
    constructor(props){
        super(props);

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.playTrack = this.playTrack.bind(this);
    }

    renderAction() {
        if(this.props.isRemoval){
            return <button className="Track-action" onClick={this.removeTrack}>-</button>
        } else {
           return <button className="Track-action" onClick={this.addTrack}>+</button>
        }
    }

    addTrack(){
        this.props.onAdd(this.props.track)
    }

    removeTrack(){
        this.props.onRemove(this.props.track)
    }

    renderPlay(){
        if(this.props.isPlaying){
            return <button className="Track-play" onClick={this.playTrack}> Play </button>
        } else {
            return <button className="Track-play" onClick={this.pauseTrack}> Pause </button>
        }
    }

    playTrack(){
        this.props.onPlay(this.props.track);
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album} </p>
                </div>
                {this.renderPlay()}
                {this.renderAction()}
            </div>
        )
    }
}

export default Track;