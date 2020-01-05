import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeNews= this.onChangeNews.bind(this);
    this.onChangeDob = this.onChangeDob.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhoto = this.onChangePhoto.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username :'',
      gender :  '',
      news :  false,
      dob :  new Date(),
      email : '',
      photo : 'avatar.png'
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/'+this.props.match.params.id)
    .then(response => {
        if(response.data.date == null) response.data.date = new Date(); 
        this.setState({
          username: response.data.username,
          gender: response.data.gender,
          dob: new Date(response.data.date),
          news: response.data.news,
          email: response.data.email,
          photo: response.data.photo
        })
        console.log(this.state);
    })
    .catch(function (error) {
        console.log(error);
    })
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
  

  onChangeNews(e) {
    this.setState({
      news: e.target.checked
    });
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
      dob: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username : this.state.username,
      gender :  this.state.gender,
      dob :  this.state.dob,
      news :  this.state.news,
      email :  this.state.email,
      photo : this.state.photo
    }
    
    axios.put('http://localhost:5000/users/'+this.props.match.params.id, user)
      .then(res => console.log(res.data))
      .catch(error => alert(error.response.data));
    window.location = '/';
  }

  render() {
      let genders = ['male','female'];
    return (
    <div>
      <h3>Modifier un utilisateur</h3>
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
          <input type="text"
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
              value={this.state.gender}
              onChange={this.onChangeGender}>
              {
                genders.map(function(gender) {
                  return <option 
                    key={gender}
                    value={gender}>{gender}
                    </option>;
                })
              }
          </select>
        </div>

        <div className="form-group">
          <label>Email: </label>
          <input 
              required
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
          <label>News: </label>
          <div>
            <input 
              type="checkbox" 
              className="form-control"
              checked={this.state.news}
              onChange={this.onChangeNews}
              />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Modifier" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}