import React, {Component} from 'react';
import './InputHighlighted.css';

class InputHighlighted extends Component{

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            type: this.props.type,
            label: this.props.label
        }
    }

    render() {
        return(
            <div>
                <label htmlFor={this.state.id} >{this.state.label}</label>
                <input
                    type={this.state.type}
                    id={this.state.id}
                    name={this.state.id}
                    className={'form-control'}
                />
            </div>
        )
    }
}

export default InputHighlighted;
