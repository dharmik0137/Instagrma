import { Button, Input } from '@mui/material';
import '../Css/Login.css';
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
    <div className='second-div'>
      <h1 className='login'>Login</h1>
      <div>
        <p className='user'>Username</p>
        <Input type='text' className='input' placeholder='Type your email' onChange={(e) => setLogin({ ...login, email: e.target.value })} />
      </div>
      <div>
        <p className='pass'>Password</p>
        <Input type='password' placeholder='Type your password' className='input' onChange={(e) => setLogin({ ...login, password: e.target.value })} />
      </div>
      <div>
        <div>
          <Button onClick={() => onUserLogin()} className='btn' style={{ marginTop: "50px", borderRadius: "20px" }}>Login</Button>
        </div>
        <div>
          <Link to='/registration'><Button className='btn-second' style={{ marginTop: "37px" }}>Registraton</Button></Link>
        </div>
      </div>
    </div>
  )
}
