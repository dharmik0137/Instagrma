import React from 'react'
import { v4 as uuid } from 'uuid';
import '../Css/Registration.css'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allAction from '../Redux/Actions/index'
import { Button, Input, Table } from '@mui/material';
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
        <div className='main-div'>
            <h1>Registration</h1>
            <div>
                <Table>
                    <tr>
                        <td>Firstname</td>
                        <td>Lastname</td>
                    </tr>
                    <tr>
                        <td>
                            <Input type="text" placeholder='Enter First Name' onChange={(e) => setSave({ ...save, firstName: e.target.value })} />
                        </td>
                        <td>
                            <Input type="text" placeholder='Enter Last Name' onChange={(e) => setSave({ ...save, lastName: e.target.value })} />
                        </td>
                    </tr>
                    <tr>
                        <td>Gender</td>
                        <td>DOB</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="Radio" name='Gender' value="Male" onChange={(e) => setSave({ ...save, gender: e.target.value })} />Male
                            <input type="Radio" name="Gender" value="Female" onChange={(e) => setSave({ ...save, gender: e.target.value })} />Female
                        </td>
                        <td>
                            <input type="date" onChange={(e) => setSave({ ...save, date: e.target.value })} />
                        </td>
                    </tr>
                    <tr>
                        <td>Mobile</td>
                        <td>Avtar</td>
                    </tr>
                    <tr>
                        <td>
                            <Input type="number" placeholder='12345-67890' required onChange={(e) => setSave({ ...save, number: e.target.value })} />
                        </td>
                        <td>
                            <Input type="file" onChange={(e) => uploadImage(e)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>Username</td>
                    </tr>
                    <tr>
                        <td>
                            <Input type="email" placeholder='Enter Email' onChange={(e) => setSave({ ...save, email: e.target.value })} />
                        </td>
                        <td>
                            <Input type="text" placeholder='Enter UserName' readOnly value={`${save.firstName}${save.date.split("-")[0]}`} />
                        </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>
                            <Input type="password" placeholder='Enter Password' minlength="8" onChange={(e) => setSave({ ...save, password: e.target.value })} />
                        </td>
                    </tr>
                    <tr>
                        <td><Link to='/'><Button type="button">Cancel</Button></Link></td>
                        <td><Link to='/'><Button type="button" onClick={() => onDataSubmite()} >Submit</Button></Link></td>
                    </tr>
                </Table>
            </div>
        </div>
    )
}
