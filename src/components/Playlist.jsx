import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Song from './Song';
import './Playlist.scss';

class Playlist extends Component {
    state = {
        nextFunction: null,
    };

    toggleFavorite (index) {
        let favorite = this.props.favorites.find(o => o.songId === index.id) || null;
        this.props.onSelectSong(index.id, favorite);
    };

    render() {
        return (
            <main className="c-playlist">
                <ul className="c-playlist__items">
                    <InfiniteScroll
                        dataLength={this.props.data.length}
                        next={this.props.nextFunction}
                        hasMore={this.props.hasMore}
                        loader={<h4>Loading...</h4>}
                    >
                        {this.props.data.map((song, id) => {
                            const favoriteSong = this.props.favorites.find( f => {
                                return f.songId === song.id;
                            });
                            return (
                            <Song id={id}
                                  favoriteId={favoriteSong ? favoriteSong.id : null}
                                  onClick={() => this.toggleFavorite(song)}
                                  key={song.id}
                                  data={song} />
                            );
                        })}
                    </InfiniteScroll>
                </ul>
            </main>
        )
    }
}


export default Playlist;
