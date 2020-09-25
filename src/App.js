import React, { Component } from 'react';
import './App.scss';
import Playlist from './components/Playlist';
import Filter from './components/Filter';
import {
    addToFavoritesAction,
    fetchFavoritesAction,
    fetchSongsAction,
    deleteFavoriteAction, getSearchResultsAction
} from './store/actions';
import { connect } from 'react-redux';
import Search from './components/Search';


const HEADER_TITLE = {
    main: 'New songs delivered every week',
    describe: 'Here are the most recent additions'
};
const LIMIT = 20;

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            songs: [],
            songId: '',
            favorites: [],
            level: '',
            limit: LIMIT,
            hasMore: true,
            start: 0,
            searchQuery: '',
            isFiltered: false,
        };
        this.getSongsList = this.getSongsList.bind(this);
        this.toggleFavorite = this.toggleFavorite.bind(this);
    }

    componentDidMount() {
        this.getSongsList();
        this.getFavorites();
    }

    getSongsList = () => {
        this.props.dispatch(
            fetchSongsAction(this.state.start,
                this.state.limit, this.state.searchQuery, this.state.level))
        .then( data => {
            let newSongs = data.map( result => {
                return {
                    id: result.id,
                    artist: result.artist,
                    images: result.images,
                    level: result.level,
                    search: result.search,
                    title: result.title,
                };
            });
            let stateSongs = (this.state.level && !this.state.isFiltered) ? [...newSongs] : [...this.state.songs, ...newSongs];
            this.setState({
                songs: stateSongs,
                start: this.state.start + this.state.limit,
                isFiltered: Boolean(this.state.level),
            });
        })
        .catch( error =>
            console.log(error)
        );
    };

    getFavorites (newFavorites) {
        if (typeof newFavorites !== 'undefined') {
            this.setState({
                favorites: newFavorites
            })
        }
        this.props.dispatch(fetchFavoritesAction())
        .then (response => {
            if (typeof newFavorites === 'undefined') {
                this.setState({
                    favorites: response
                })
            }
        }
        ).catch( error =>
            console.log(error)
        )
    };

    toggleFavorite = (songId, favorite) => {
        if (!favorite) {
            this.props.dispatch(addToFavoritesAction({songId}))
            .then( response => {
                    let id = response.id;
                    const newFavorites = this.state.favorites.concat({id, songId});
                    this.getFavorites(newFavorites);
                }
            ).catch( error =>
                console.log(error)
            )
        } else {
            this.props.dispatch(deleteFavoriteAction(favorite.id))
            .then( response =>
                this.getFavorites(response)
            ).catch( error =>
                console.log(error)
            )
        }
    };

    getInfo = (query) => {
        this.props.dispatch(getSearchResultsAction(query))
        .then( data =>
            this.setState({
                songs: data,
                searchQuery: query,
            })
        ).catch(
            error => console.log(error)
        );
    };

    handleSearch(query) {
        this.getInfo(query);
    };

    async handleFilterChange(level) {
        let localState = {
            level: level
        };

        if (this.state.level !== level || !this.state.isFiltered) {
            localState['start'] = 0;
            localState['isFiltered'] = false;
        }

        await this.setState({
            ...localState
        });
        this.getSongsList();
    }

    render() {
        return (
            <div className="app">
                <div className="app-header">
                    <header className="header _fixed _colored">
                        <h1 className='header__text'>{HEADER_TITLE.main}</h1>
                        <p>{HEADER_TITLE.describe}</p>
                        <Search onSearch={this.handleSearch.bind(this)}/>
                    </header>
                </div>
                <main className="main-layer">
                    <Filter onClick={this.handleFilterChange.bind(this)}/>
                    <Playlist data={this.state.songs}
                              favorites={this.state.favorites}
                              hasMore={this.state.hasMore}
                              nextFunction={this.getSongsList}
                              onSelectSong={this.toggleFavorite}/>
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        favorites: state.favoritesListReducer.favorites,
    };
};

export default connect(mapStateToProps)(App);
