import React from "react";
import './Playlist.css';
import TrackList from "../TrackList/TrackList";
import Track from "../Track/Track";

class Playlist extends React.Component {
    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    //handler funtion for changing the name of the playlist
    handleNameChange(){
        this.props.onNameChange(this.props.track);
    }

    render() {
        return (
            <div className="Playlist" >
                <input defaultValue={'New Playlist'} onChange={this.handleNameChange} />
                <TrackList tracks={this.props.playlistTracks}
                    onRemove={this.props.onRemove}
                    isRemoval={true}
                    />
                <button 
                className="Playlist-save"
                onClick = {this.props.onSave}
                >SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default Playlist;