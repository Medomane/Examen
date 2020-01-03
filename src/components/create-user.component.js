import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeDob = this.onChangeDob.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhoto = this.onChangePhoto.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username :'',
      gender :  '',
      dob :  new Date(),
      news :  false,
      email :  '',
      photo :  'avatar.png'
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    })
  }
  
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  onChangePhoto(e) {
    this.setState({
      photo: e.target.value
    })
  }

  onChangeDob(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      gender :  this.state.gender,
      dob :  this.state.dob,
      news :  this.state.news,
      email :  this.state.email,
      photo : this.state.photo
    }


    axios.post('http://localhost:5000/users', user)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Créer un utilisateur</h3>
      <form onSubmit={this.onSubmit}>

        <div className="form-group"> 
          <label>Nom d'utilisateur: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
              />
        </div>

        <div className="form-group"> 
          <label>Photo : </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.photo}
              onChange={this.onChangePhoto}
              />
        </div>

        <div className="form-group"> 
          <label>Sexe: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.gendre}
              onChange={this.onChangeGender}>
                <option key="male" value="male">male</option>
                <option key="female" value="female">female</option>
          </select>
        </div>

        <div className="form-group">
          <label>Email: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              />
        </div>

        <div className="form-group">
          <label>Dob: </label>
          <div>
            <DatePicker
              selected={this.state.dob}
              onChange={this.onChangeDob}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Créer un utilisateur" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}