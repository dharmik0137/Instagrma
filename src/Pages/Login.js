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
    <div className='login-body'>
      <div className='main-div'>
        <h1 className='login-page'>Login</h1>
        <div style={{ marginTop: "38px" }}>
          <tr>
            <td style={{ color: "brown" }}>Enter Email</td>
            <td>
              <input type='text' placeholder='Enter Email' className='text-first' onChange={(e) => setLogin({ ...login, email: e.target.value })} />
            </td>
          </tr>
          <tr>
            <td style={{ color: "brown" }}>Enter Password</td>
            <td>
              <input type='password' placeholder='Enter Password' className='text-first' onChange={(e) => setLogin({ ...login, password: e.target.value })} />
            </td>
          </tr>
          <div>
            <tr>
              <td>
                <button onClick={() => onUserLogin()} className="btn-first">Submit</button>
                <Link to='/registration'><button className="btn-first">Registraton</button></Link>
              </td>
            </tr>
          </div>
        </div>
      </div>
    </div >
  )
}
