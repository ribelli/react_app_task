import React, { Component } from 'react';
import './Search.scss';


const SEARCH = {
    placeholderText: 'Search for songs by artist or title'
};

class Search extends Component {
    constructor (props) {
        super(props);
        this.state = {
            query: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = event => {
        event.preventDefault();
        this.setState({
            query: this.search.value
        })
    };

    handleClick = () => {
        this.props.onSearch(this.state.query);
    };

    handleKeydown = (event) => {
        if (event.keyCode === 13) {
            this.props.onSearch(this.state.query);
        }
    };

    render(){
        return(
            <div className='c-search'>
                <label>
                    <input className='search' type='text'
                           spellCheck={false}
                           ref={input => this.search = input}
                           onChange={this.handleInputChange}
                           onKeyDown={this.handleKeydown}
                           placeholder={SEARCH.placeholderText}
                           autoComplete='off'/>
                    <div className='icon-search'
                         onClick={this.handleClick}>
                    </div>
                </label>
            </div>
        )
    }
}


export default Search;
