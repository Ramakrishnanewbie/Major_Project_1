import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Import your components
import Students from './components/Students';
import Faculty from './components/Faculty';
import Programs from './components/Programs';
import Research from './components/Research';
import Admissions from './components/Admissions';
import Home from './components/Home';
import Login from './components/Login';
import AddUser from './components/AddUser';
import ExcelUpload from './components/ExcelUpload';
import ViewUser from './components/ViewUser';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';
import DeleteUser from './components/DeleteUser';
import './App.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setCurrentUser(user);
      } else {
        // No user is signed in.
        setCurrentUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>

        {/* Protected Routes */}
        <Route exact path='/students' render={() => currentUser ? <Students /> : <Redirect to="/login" />} />
        <Route exact path='/faculty' render={() => currentUser ? <Faculty /> : <Redirect to="/login" />} />
        <Route exact path='/programs' render={() => currentUser ? <Programs /> : <Redirect to="/login" />} />
        <Route exact path='/research-grants' render={() => currentUser ? <Research /> : <Redirect to="/login" />} />
        <Route exact path='/admissions' render={() => currentUser ? <Admissions /> : <Redirect to="/login" />} />
        <Route exact path='/adduser' render={() => currentUser ? <AddUser /> : <Redirect to="/login" />} />
        <Route exact path='/upload' render={() => currentUser ? <ExcelUpload /> : <Redirect to="/login" />} />
        <Route exact path='/viewuser' render={() => currentUser ? <ViewUser /> : <Redirect to="/login" />} />
        <Route exact path='/userhome' render={() => currentUser ? <UserHome /> : <Redirect to="/login" />} />
        <Route exact path='/adminhome' render={() => currentUser ? <AdminHome /> : <Redirect to="/login" />} />
        <Route exact path='/deleteuser' render={() => currentUser ? <DeleteUser /> : <Redirect to="/login" />} />
      </Switch>
    </Router>
  );
};

export default App;
