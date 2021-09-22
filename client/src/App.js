import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import Header from './components/Header/Header.component'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './pages/Login.Page'
import Home from './pages/Home.Page.jsx'
import Signup from './pages/Signup.Page'
import LoginProvider from './contexts/Login.Provider.jsx'

// const responseSuccessGoogle = (response) => {
//   const headers = { headers: { "Content-Type": "application/json" } }
//   const body = { tokenId: response.tokenId }
//   axios.post(
//     'http://localhost:5000/api/users/google-login',
//     { tokenId: response.tokenId }
//   ).then(response => {
//     console.log(response)
//   }).catch(err => {
//     console.log(err)
//   })
// }

// const responseFailureGoogle = (response) => {

// }

function App() {
  return (
    <LoginProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          {/* <Route exact path='/signup' component={SignUp} /> */}
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
        </Switch>
      </Router>
    </LoginProvider>


  );
}

{/*
<GoogleLogin
  clientId="380829121265-5qk4vemufsunancvgqhqvttaaa2hgcpm.apps.googleusercontent.com"
  buttonText="Login"
  onSuccess={responseSuccessGoogle}
  onFailure={responseFailureGoogle}
  cookiePolicy={'single_host_origin'}
/>, */}

export default App;
