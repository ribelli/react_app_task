import { Component } from 'react';
import './CircleProgressProvider.scss';


class CircleProgressProvider extends Component {
    static defaultProps = {
        timeout: 1000
    };

    state = {
        valuesIndex: 0
    };

    componentDidMount() {
        this.timerID = setTimeout(() => {
            this.setState({
                valuesIndex: (this.state.valuesIndex + 1) % this.props.values.length
            });
        }, this.props.timeout);
    }

    componentWillUnmount() {
        clearTimeout(this.timerID);
    }

    render() {
        return this.props.children(this.props.values[this.state.valuesIndex]);
    }
}

export default CircleProgressProvider;
