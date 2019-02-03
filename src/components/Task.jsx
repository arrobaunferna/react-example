import React, { Component } from 'react';

class Task extends Component {
    removeTask = () => {
        this.props.onRemoveTask();
    }

    editTask = () => {
        this.props.onEditTask();
    }

    render() {
        const badges = {
            low: "success",
            medium: "warning",
            high: "danger"
        };

        return(
            <div className="col-md-4 mb-3">
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title">{ this.props.title }</h5>
                        <span className={`badge badge-${ badges[this.props.priority] }`}>{ this.props.priority }</span>
                    </div>

                    <div className="card-body">                            
                        <div className="card-text">
                            <p>{ this.props.description }</p>
                            <p><strong>{ this.props.responsible }</strong></p>
                        </div>
                    </div>

                    <div className="card-footer">
                        <button type="button" className="btn btn-primary mr-1" onClick={ this.editTask }>Edit</button>
                        <button type="button" className="btn btn-danger" onClick={ this.removeTask }>Delete</button>
                    </div>
                </div>
            </div>
        );
    };
}

export default Task;