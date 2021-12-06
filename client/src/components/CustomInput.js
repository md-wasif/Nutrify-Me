import React, { Component } from 'react';


export default class CustomComponent extends Component {
    render() {
        const { input: { value, onChange } } = this.props;
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.lable}</label>
                <input
                    name={this.props.name}
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    className="form-control"
                    type={this.props.value}
                    value={value}
                    onChange={onChange}
                />
            </div>
        );
    }
}