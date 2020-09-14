import React, { Component } from 'react';
import './Filter.scss';
import Level from './Level';

const MAX_LEVEL = 15;

class Filter extends Component{
    state = {
        isOpen: false,
        coefficient: Math.floor(100 / MAX_LEVEL)
    };
    handleClick = (value) => {
        debugger;
        this.props.onClick(value);
    };

    toggleFilter = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };

    render() {
        return (
            <div className="c-filter">
                <div className="title" onClick={this.toggleFilter}>
                    {this.state.isOpen ? 'HIDE FILTER' : 'SHOW FILTER'}
                </div>
                {this.state.isOpen && (
                    <div className="filter">
                        {[...Array(MAX_LEVEL).keys()].map((value, index) => {
                            value++;
                            return (
                            <Level key={ index }
                                   coefficient={ this.state.coefficient }
                                   level={ value }
                                   onClick={ this.handleClick }/>
                            )
                        })}
                    </div>
                )}
            </div>
        )
    }
}

export default Filter;
