import React from 'react'
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allAction from '../Redux/Actions/index'
var bcrypt = require('bcryptjs');

export default function Registration() {
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 8)
    const [img, setImage] = useState();

    const dispatch = useDispatch();
    const { registrationData } = bindActionCreators(allAction, dispatch);
    const [save, setSave] = useState({
        R_id: small_id,
        firstName: "",
        lastName: "",
        gender: "",
        date: "",
        number: "",
        avtar: "",
        email: "",
        userName: "",
        password: "",
    })
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64Image(file);
        setImage(base64);
    }
    const convertBase64Image = (file) => new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            resolve(fileReader.result);
        }
        fileReader.onerror = (error) => {
            reject(error)
        }
        fileReader.readAsDataURL(file);
    });

    const onDataSubmite = () => {
        var hash = bcrypt.hashSync(save.password, 8);
        let obj = {
            R_id: small_id,
            firstName: save.firstName,
            lastName: save.lastName,
            gender: save.gender,
            date: save.date,
            number: save.number,
            avtar: img,
            email: save.email,
            userName: `${save.firstName}${save.date.split("-")[0]}`,
            password: hash,
        }
        console.log(obj);
        registrationData(obj);
    }
    return (
        <div className="App">
            <h1>Registration</h1>
            <form>
                <table border='1' align='center'>
                    <tr>
                        <div>
                            <h1>REGISTRATION</h1>
                            <table >
                                <tr>
                                    <td>First_Name:-</td>
                                    <td>
                                        <input type="text" placeholder='Enter First Name' onChange={(e) => setSave({ ...save, firstName: e.target.value })} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Last_Name:-</td>
                                    <td>
                                        <input type="text" placeholder='Enter Last Name' onChange={(e) => setSave({ ...save, lastName: e.target.value })} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Gender:-</td>
                                    <td>
                                        <input type="Radio" name='Gender' value="Male" onChange={(e) => setSave({ ...save, gender: e.target.value })} />Male
                                        <input type="Radio" name="Gender" value="Female" onChange={(e) => setSave({ ...save, gender: e.target.value })} />Female
                                    </td>
                                </tr>
                                <tr>
                                    <td>Date Of Birth:-</td>
                                    <td>
                                        <input type="date" onChange={(e) => setSave({ ...save, date: e.target.value })} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Mobile Number:-</td>
                                    <td>
                                        <input type="number" placeholder='12345-67890' required onChange={(e) => setSave({ ...save, number: e.target.value })} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Avtar:-</td>
                                    <td>
                                        <input type="file" onChange={(e) => uploadImage(e)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Email:-</td>
                                    <td>
                                        <input type="email" placeholder='Enter Email' onChange={(e) => setSave({ ...save, email: e.target.value })} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>UserName:-</td>
                                    <td>
                                        <input type="text" placeholder='Enter UserName' readOnly value={`${save.firstName}${save.date.split("-")[0]}`} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Password</td>
                                    <td>
                                        <input type="password" placeholder='Enter Password' minlength="8" onChange={(e) => setSave({ ...save, password: e.target.value })} />
                                    </td>
                                </tr>
                                <tr>
                                    <td><Link to='/'><button type="button">Cancel</button></Link></td>
                                    <td><Link to='/'><button type="button" onClick={() => onDataSubmite()}>Submit</button></Link></td>
                                </tr>
                            </table>
                        </div>
                    </tr>
                </table>
            </form>
        </div >
    )
}
