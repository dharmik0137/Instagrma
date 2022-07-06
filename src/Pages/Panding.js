import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import * as allAction from '../Redux/Actions/index'


export default function Panding() {

    const dispatch = useDispatch();
    const { acceptData } = bindActionCreators(allAction, dispatch);

    let Get_Data = useSelector((state) => state)

    const Login = Get_Data.Login.data.find((data) => data)
    console.log("Login==>", Login);
    const Follower = Get_Data.Request.data.filter((data) => data.reciver === Login.firstName)
    console.log("Follower==>", Follower);

    const acceptTheData = (data) => {
        console.log("Data==>", data);
        let obj = {
            sender: Login.firstName,
            reciver: data.sender,
            date: new Date(),
            status: "Success...."
        }
        acceptData(obj);
        console.log("Obj==>", obj);
    }
    return (
        <div>
            <h1>---Panding Request---</h1>
            <div>
                {
                    Follower.map((data) =>
                        <div>{data.sender}<button onClick={() => acceptTheData(data)}>Accept</button></div>
                    )}
            </div>
            <Link to='/dashboard'><button>Cancle</button></Link>
        </div>
    )
}
