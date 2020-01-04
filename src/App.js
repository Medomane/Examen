import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import UsersList from "./components/users-list.component";
import CreateUser from "./components/create-user.component";
import EditUser from "./components/edit-user.component";

function App() {

  


  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={UsersList} />
        <Route path="/users/:page/:size" exact component={UsersList} />
        <Route path="/users/" exact component={CreateUser} />
        <Route path="/users/:id" exact component={EditUser} />
      </div>
      
    </Router>
    
  );
}
export default App;