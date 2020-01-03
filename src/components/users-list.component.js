import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
  <tr>
    <td><img alt="img" src={props.users.photo} width="40px"></img></td>
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

/*const Page = num => (
    <li class="page-item"><a class="page-link" href={"/users/"+num+"/5"}>{num}</a></li>
)*/

export default class UsersList extends Component {
  constructor(props) {
      //console.log(props);
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
    this.getPage = this.getPage.bind(this);
    /*this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);*/
    this.state = {
        users: [],
        currentPage:1,
        total: 0,
        per_page: 5,
    };
  }

  componentDidMount() {
    this.getPage(1,5);
  }
  
  getPage(page,size){
    axios.get(`http://localhost:5000/users/${page}/${size}`)
    .then(response => {
      this.setState({ 
          users: response.data,
          total: response.data.length,
          current_page : page,
          per_page : size
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

  paginationList(){
    
  }

  userList() {
    return this.state.users.map(currentuser => {
      return <User users={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
    })
  }

  /*pageList() {
    for(i=0;i<this.state.users.length)
    return this.state.users.map(currentuser => {
      return <User users={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
    })
  }*/

  render() {
    /*let renderPageNumbers;
    const pageNumbers = [];
    if (this.state.total !== null) {
        for (let i = 1; i <= Math.ceil(this.state.total / this.state.per_page); i++) {
          pageNumbers.push(i);
        }
        renderPageNumbers = pageNumbers.map(number => {
            let classes = this.state.current_page === number ? 'active' : '';
            console.log(number);
            return ( 
                <li className="page-item"><a key={number} className="page-link" href="#" onClick={() => this.getPage(number,5)}>1</a></li>            
            );
        });
    }*/
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
        <nav>
            <ul className="pagination">
                
            </ul>
        </nav>
      </div>
    )
  }
}