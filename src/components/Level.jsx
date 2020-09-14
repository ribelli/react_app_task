import React, { Component } from 'react';
import CircleProgressProvider from './CircleProgressProvider';
import './Level.scss';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

const COLOR_PALETTE = {
    green :'#6fc13e',
    orange: '#ff8e00',
    red: '#dc001c'
};

class Level extends Component{
    handleClick = () => {
        return this.props.onClick ? this.props.onClick(this.props.level): false;
    };

    render() {
        const { level, coefficient } = this.props;
        const color =
            level <= 5 ? COLOR_PALETTE.green: ((5 < level && level <= 10) ? COLOR_PALETTE.orange: COLOR_PALETTE.red);
        return(
            <div className="c-level" onClick={this.handleClick}>
                <CircleProgressProvider values={[0, (coefficient * level)]}>
                    { val => (
                        <CircularProgressbar value={ val }
                                             strokeWidth={ 6 }
                                             styles={buildStyles({
                                                 pathTransitionDuration: 1,
                                                 trailColor: '#373534',
                                                 pathColor: color,
                                             })}/>
                    )}
                </CircleProgressProvider>
                <div className='layer'>
                    <div className='layer__separator'>
                        <div/>
                        <div className="rot120deg"/>
                        <div className="rot240deg"/>
                    </div>
                    <div className='layer__level'>
                        <div className='text'>{ level }</div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Level;
