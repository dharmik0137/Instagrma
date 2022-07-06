import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as allAction from '../Redux/Actions/index'


export default function Serch() {
    const [serch, setSerch] = useState('')

    let State_data = useSelector((state) => state)
    const User = State_data.Registration.data;
    const data = State_data.Login.data;
    const LoginData = data.find((data) => data);
    const RegistrationData = State_data.Registration.data.filter((data) => data.R_id !== LoginData.R_id)
    console.log("Registartion==>", RegistrationData);



    const dispatch = useDispatch();
    const { requestData } = bindActionCreators(allAction, dispatch);


    const sendRequest = (data) => {
        let obj = {
            sender: LoginData.firstName,
            reciver: data,
            time: new Date(),
            status: "panding....."
        }
        requestData(obj)
    }
    return (
        <div>
            <div>
                <h1>---Serch User---</h1>
                <Link to='/dashboard'><button>Cancle</button></Link>
            </div>
            <table align='center'>
                <tr>
                    <td>
                        <input placeholder='Enter UserName' style={{ height: "30px", fontSize: "18px", width: "350px", textAlign: "center" }} onChange={(e) => setSerch(e.target.value)} />
                    </td>
                </tr>
            </table>
            <h3>---All User---</h3>
            <table align='center' border='1' style={{ width: "357px" }}>
                <tr>
                    {
                        RegistrationData.filter((value) => {
                            if (serch === "") {
                                return value;
                            } else if (value.userName.toLowerCase().includes(serch.toLowerCase())) {
                                return value
                            }
                        }).map((item) => <div><p>{item.userName}<button onClick={() => sendRequest(item.firstName)}>Send Request</button></p></div>)
                    }
                </tr>
            </table>
        </div>
    )
}
