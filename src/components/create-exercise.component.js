import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';


export default class CreateExercises extends Component {
    state = {
        username: "",
        description: "",
        duration: 0,
        date: new Date(),
        user: []
    }
    componentDidMount() {
        axios.get('https://localhost:5000/users/ ')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    });
                }
            })
    }
    onChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        });
    }
    onChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        });
    }
    onChangeDuration = (event) => {
        this.setState({
            duration: event.target.value
        });
    }
    onChangeDate = (date) => {
        this.setState({
            date: date
        });
    }
    onSubmit = (event) => {
        event.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(exercise);
        axios.post('http://localhost:5000/exercises/add', this.exercise)
            .then(res => console.log(res.data));

        window.location = '/';
    }
    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <select
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                        {
                            this.state.user.map(function (user) {
                                return <option key={user} value={user}>
                                    {user}
                                </option>
                            })
                        }
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes):</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date:</label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>

        )
    }
}