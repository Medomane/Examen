import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from './navigation.component';

const User = props => (
  <tr>
    <td><img alt="img" src={'/avatars/'+props.users.photo} width="40px"></img></td>
    <td>{props.users.username}</td>
    <td>{props.users.gender}</td>
    <td>{props.users.dob}</td>
    <td>{props.users.news}</td>
    <td>{props.users.email}</td>
    <td>
      <Link to={"/users/"+props.users._id}>modifier</Link> | <a href="#" onClick={() => { props.deleteUser(props.users._id) }}>supprimer</a>
    </td>
  </tr>
)

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
    this.convertDate = this.convertDate.bind(this);
    this.getPage = this.getPage.bind(this);
    this.state = {
        users: [],
        infos:[]
    };
  }

  componentDidMount() {
    let size = 5,page = 1;
    if(this.props.match.params.size !== undefined) size = this.props.match.params.size;
    if(this.props.match.params.page !== undefined) page = this.props.match.params.page;
    this.getPage(page,size);
  }

  getPage(page,size){
    axios.get(`http://localhost:5000/users/${page}/${size}`)
    .then(response => {
      response.data.users.map(user => {
        if(user.dob == null) user.dob = this.convertDate(new Date());
        else user.dob = this.convertDate(user.dob);
        if(user.news === true) user.news = 'Yes';
        else user.news = 'No';
      });
      this.setState({ 
          users: response.data.users,
          infos:response.data.infos
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  deleteUser(id) {
    axios.delete('http://localhost:5000/users/'+id)
      .then(response => { console.log(response.data)});
    this.setState({
      users: this.state.users.filter(el => el._id !== id)
    })
  }

  userList() {
    return this.state.users.map(currentuser => {
      return <User users={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
    })
  }
  convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }

  render() {
    const paginate = pageNumber => this.getPage(pageNumber,5);
    return (
      <div>
        <h3>Liste des utilisateurs</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Photo</th>
              <th>Username</th>
              <th>Sexe</th>
              <th>Dob</th>
              <th>News</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { this.userList() }
          </tbody>
        </table>
        <Pagination
          infos={this.state.infos}
          paginate={paginate}
        />
      </div>
    )
  }
}