import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Navigation from './components/Navigation';
import TaskForm from './components/TaskForm';
import Task from './components/Task';

import { tasks } from './tasks.json';

class App extends Component {
    constructor() {
        super();

        this.state = {
            tasks,
            task_edit: {
                id: null,
                title: '',
                responsible: '',
                description: '',
                priority: 'low'
            },
            search: {
                key: 'title',
                value: ''
            }
        };
    }

    resetTaskEdit() {
        this.setState({
            task_edit: {
                id: null,
                title: '',
                responsible: '',
                description: '',
                priority: 'low'
            }
        });
    }

    handleSaveTask = task => {        
        if(task.id != null && task.id >= 0) {
            const copy = this.state.tasks;

            this.state.tasks.filter((t, i) => { 
                let ret = false;
                if( t.id === task.id ) {
                    copy[i] = task;
                    ret = true;
                }

                return ret
            });
            

            this.setState({
                tasks: copy
            });

            this.resetTaskEdit();

        } else {
            let lastInsertId = this.state.tasks.pop().id;
            task.id = lastInsertId + 1;

            this.setState({
                tasks: [...this.state.tasks, task]
            });
        }
    }

    handleFindTask = (e) => {
        let cboSearch = document.querySelector("#cboSearch");
        let txtSearch = document.querySelector("#txtSearch");

        this.setState({
            search: {
                key: cboSearch.value,
                value: txtSearch.value
            }
        });        
    }

    removeTask = id => {
        // Delete task
        this.setState({
            tasks: this.state.tasks.filter(task => task.id !== id)
        });
    }

    showTaskEdit = id => {
        let edit = this.state.tasks.filter(task => task.id === id);

        this.setState({
            task_edit: edit[0]
        });
    };

    taskFind = () => {
        let tasks = this.state.tasks.filter((task) => {
            // ignore case sensitive
            let original = task[ this.state.search.key ].toLowerCase();
            let searching = this.state.search.value.toLowerCase();
            
            return original.includes( searching );
        });

        return tasks;
    }

    render() {
        const tasks = this.taskFind().map((task) => {    
            return (
                <Task 
                    key={task.id} 
                    title={task.title} 
                    responsible={task.responsible} 
                    description={task.description} 
                    priority={task.priority}

                    onEditTask={ this.showTaskEdit.bind(this, task.id) }
                    onRemoveTask={ this.removeTask.bind(this, task.id) }
                />
            );
        });
        
        return (
            <div className="App">
                <Navigation title="My App" num_tasks={ this.state.tasks.length } />

                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-3 col-lg-3 text-center">
                            <img src={logo} className="App-logo img-responsive" alt="logo" />
                        </div>

                        <div className="col-sm-12 col-md-7 col-lg-7">
                            <div className="input-group mt-5">
                                <select id="cboSearch" className="form-control" onChange={ this.handleFindTask } >
                                    <optgroup label="Search by">
                                        <option value="title">Title</option>
                                        <option value="responsible">Responsible</option>
                                        <option value="description">Description</option>
                                    </optgroup>
                                </select>

                                <input type="text" id="txtSearch" className="form-control" onChange={ this.handleFindTask } />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12 col-md-3 col-lg-3">
                            <TaskForm onAddTask={ this.handleSaveTask } task_edit={ this.state.task_edit } />
                        </div>

                        <div className="col-sm-12 col-md-9 col-lg-9">
                            <div className="row">
                                { tasks }                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;