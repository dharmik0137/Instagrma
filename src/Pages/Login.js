import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import Home from '../Components/Home';
import * as allAction from '../Redux/Actions/index'
var bcrypt = require('bcryptjs');


export default function Login() {
  const [login, setLogin] = useState({ email: "", password: "" })
  const dispatch = useDispatch();
  const { loginData } = bindActionCreators(allAction, dispatch);
  const UserData = useSelector((state) => state.Registration);
  const nevigate = useNavigate();
  const onUserLogin = () => {

    let findId = UserData.data.find((data) => data.email === login.email)
    let password = bcrypt.compareSync(login.password, findId.password);
    if (login.email === findId.email && password === true) {
      nevigate('/dashboard')
    }
    else {
      console.log("False")
    }
    loginData(findId)

  }
  return (
    <div>
      <h1>-----Login Page-----</h1>
      <table border='1' align='center'>
        <tr>
          <td>Enter Email:-</td>
          <td>
            <input type='text' placeholder='Enter Email' onChange={(e) => setLogin({ ...login, email: e.target.value })} />
          </td>
        </tr>
        <tr>
          <td>Enter Password:-</td>
          <td>
            <input type='password' placeholder='Enter Password' onChange={(e) => setLogin({ ...login, password: e.target.value })} />
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={() => onUserLogin()}>Submit</button>
            <Link to='/registration'><button>Registraton</button></Link>
          </td>
        </tr>
      </table>
    </div>
  )
}
