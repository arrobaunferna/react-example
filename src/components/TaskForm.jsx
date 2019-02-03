import React, { Component } from 'react';

class TaskForm extends Component {
    constructor() {
        super();
        
        this.state = {
            index: null,
            title: '',
            responsible: '',
            description: '',
            priority: 'low'
        };
    }

    componentWillReceiveProps(nextProps) {
        for(var key in nextProps.task_edit) {
            this.setState({
                [key]: nextProps.task_edit[key]
            })
        }
    }

    handleInput = e => {        
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        if(this.state.index != null && this.state.index >= 0) {            

            let index = this.props.task_edit.index;
            this.setState({
                index
            });
        }

        this.props.onAddTask( this.state );

        this.cancelEdit();
    }

    cancelEdit = () => {         
        this.setState({
            index: null,
            title: '',
            responsible: '',
            description: '',
            priority: 'low'
        });
    }

    renderButtons() {
        let text_boton = 'Add';
        let btnCancel = '';

        if(this.state.index != null && this.state.index >= 0) {
            btnCancel = <button type="button" className="btn btn-secondary mr-1" onClick={ this.cancelEdit } key={0}>Cancel</button>;
            text_boton = 'Edit';
        }

        let btnSubmit = <button type="submit" className="btn btn-primary" key={1}>{ text_boton }</button>;

        return [btnCancel, btnSubmit];
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <form action="#" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="txtTitle">Title: </label>
                            <input type="text" id="txtTitle" name="title" className="form-control" value={ this.state.title } onChange={this.handleInput} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="txtResponsible">Responsible: </label>
                            <input type="text" id="txtResponsible" name="responsible" className="form-control" value={ this.state.responsible } onChange={this.handleInput} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="txaDescription">Description: </label>
                            <textarea id="txaDescription" name="description" className="form-control" value={ this.state.description } onChange={this.handleInput}></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="cboPrority">Priority: </label>
                            <select id="cboPrority" name="priority" className="form-control" value={ this.state.priority } onChange={this.handleInput}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div className="form-group text-center">
                            { this.renderButtons() }                            
                        </div>
                    </form>
                </div>
            </div>
        );
    };
}

export default TaskForm;