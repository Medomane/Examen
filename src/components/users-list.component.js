import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from './navigation.component';
import Sort from './sort.component';
import { GoTrashcan,GoPencil } from 'react-icons/go';

const User = props => (
  <tr>
    <td><img alt="img" src={'/avatars/'+props.users.photo} width="40px"></img></td>
    <td>{props.users.username}</td>
    <td>{props.users.gender}</td>
    <td>{props.users.dob}</td>
    <td>{props.users.news}</td>
    <td>{props.users.email}</td>
    <td>
      <Link to={"/users/"+props.users._id}><GoPencil size="1.5em" /></Link> | <a href="#" className="glyphicon glyphicon-plus" onClick={() => { props.deleteUser(props.users._id) }}><GoTrashcan size="1.5em" /></a>
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
    let size = (this.props.match.params.size !== undefined)?this.props.match.params.size:'5';
    let page = (this.props.match.params.page !== undefined)?this.props.match.params.page:'1';
    this.getPage(page+'/'+size+this.props.location.search);
  }

  getPage(path){
    axios.get(`http://localhost:5000/users/${path}`)
    .then(response => {
      response.data.users.map(user => {
        user.dob = this.convertDate(user.dob);
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
    if(inputFormat === null || inputFormat === '') return null ;
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
              <th>News</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { this.userList() }
          </tbody>
        </table>
        
        <Sort path={this.props.location.search}/>
        <Pagination
          infos={this.state.infos}
          paginate={paginate}
        />
      </div>
    )
  }
}