import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../util/Spotify';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'Best Playlist',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.playTrack = this.playTrack.bind(this);
  };

  // Method to add a Track from the results to the playlist 
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(track => track.id === tracks.id)) {
      return;
    }
    tracks.push(track);

    this.setState({ playlistTracks: tracks })

  }

  // Method to remove a Track from the playlist 
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(trackToRemove => track.id !== trackToRemove.id);

    this.setState({ playlistTracks: tracks })
  }

  // Method to change the name of the Playlist ?? is the setState right 
  updatePlaylistName(name) {
    this.setState({ playlistName: name })
  }

  // add the playlist to Spotify
  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    });
  }

  // search using Spotify
  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults })
    })
  }

  // method to reproduce preview of track
  playTrack(track) {
    let preview = this.state.searchResults.filter(trackToPlay => trackToPlay.preview == track.preview)
    preview = preview[0]['preview'];
    if (preview === null) {
      return;
    }
    const newAudio = new Audio();
    newAudio.src = preview;
    newAudio.play();
  }

  

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
            onSearch={this.search}
          />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} onPlay={this.playTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    )
  }
}




export default App;
