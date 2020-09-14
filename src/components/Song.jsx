import React, { Component } from 'react';
import Favorite from './Favorite';
import 'react-circular-progressbar/dist/styles.css';
import image from '../assets/image-not-available.png';
import './Song.scss';
import Level from './Level';


const MAX_LEVEL = 15;

class Song extends Component {
    state = {
        coefficient: Math.floor(100 / MAX_LEVEL),
    };
    static addDefaultSrc(ev) {
        ev.target.src = image;
    }

    render() {
        const { id, artist, images, level, title } = this.props.data;
        const favoriteId = this.props.favoriteId;
        return (
            <li className="c-song" onClick={this.props.onClick}>
                <img className="album"
                     src={ images }
                     onError={ Song.addDefaultSrc }
                     alt="album" />
                <div className="info">
                    <h4 className="info__title">{ title }</h4>
                    <p className="info__artist">{ artist }</p>
                </div>
                <div className="info _icon">
                    <Level coefficient={ this.state.coefficient } level={ level }/>
                    <Favorite className={ favoriteId ? 'red' : 'grey' }
                              onClick={() => this.props.getCurrentId(id)}/>
                </div>
            </li>
        )
    }
}

export default Song;
