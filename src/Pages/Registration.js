import React from 'react'
import { v4 as uuid } from 'uuid';
import '../Css/Registration.css'
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allAction from '../Redux/Actions/index'
import { Button, Grid, Input } from '@mui/material';
var bcrypt = require('bcryptjs');

export default function Registration() {
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 8)
    const [img, setImage] = useState();
    const nevigate = useNavigate();

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
    const cancle = () => {
        nevigate('/')
    }

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
        nevigate('/')
    }
    return (
        <div className='main-div'>
            <h1 className='registration'>Registration</h1>
            <div className='second'>
                <Grid container spacing={-2}>
                    <Grid xs={4}>
                        <p>Firstname</p>
                    </Grid>
                    <Grid xs={8}>
                        <Input type="text" placeholder='Enter First Name' onChange={(e) => setSave({ ...save, firstName: e.target.value })} />
                    </Grid>
                </Grid>
            </div>
            <div className='second'>
                <Grid container spacing={-2}>
                    <Grid item xs={4}>
                        <p>Lastname</p>
                    </Grid>
                    <Grid item xs={8}>
                        <Input type="text" placeholder='Enter Last Name' onChange={(e) => setSave({ ...save, lastName: e.target.value })} />
                    </Grid>
                </Grid>
            </div>
            <div className='second'>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <p>Gender</p>
                    </Grid>
                    <Grid item xs={5} >
                        <input type="Radio" name='Gender' className="input-1" value="Male" onChange={(e) => setSave({ ...save, gender: e.target.value })} />Male
                        <input type="Radio" name="Gender" value="Female" onChange={(e) => setSave({ ...save, gender: e.target.value })} />Female
                    </Grid>
                </Grid>
            </div>
            <div className='second'>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <p className='dob'>DOB</p>
                    </Grid>
                    <Grid item xs={3}>
                        <Input type="date" className='in-dob' onChange={(e) => setSave({ ...save, date: e.target.value })} />
                    </Grid>
                </Grid>
            </div>
            <div className='second'>
                <Grid container spacing={-2}>
                    <Grid item xs={4}>
                        <p>Mobile</p>
                    </Grid>
                    <Grid item xs={8}>
                        <Input type="number" placeholder='12345-67890' required onChange={(e) => setSave({ ...save, number: e.target.value })} />
                    </Grid>
                </Grid>
            </div>
            <div className='second'>
                <Grid container spacing={-2}>
                    <Grid item xs={4}>
                        <p>Avtar</p>
                    </Grid>
                    <Grid item xs={8}>
                        <Input type="file" className='img-in' onChange={(e) => uploadImage(e)} />
                    </Grid>
                </Grid>
            </div>
            <div className='second'>
                <Grid container spacing={-2}>
                    <Grid item xs={4}>
                        <p>Email</p>
                    </Grid>
                    <Grid item xs={8}>
                        <Input type="email" placeholder='Enter Email' onChange={(e) => setSave({ ...save, email: e.target.value })} />
                    </Grid>
                </Grid>
            </div>
            <div className='second'>
                <Grid container spacing={-2} className="grid">
                    <Grid item xs={4}>
                        <p>Username</p>
                    </Grid>
                    <Grid item xs={8}>
                        <Input type="text" placeholder='Enter UserName' readOnly value={`${save.firstName}${save.date.split("-")[0]}`} />
                    </Grid>
                </Grid>
            </div>
            <div className='second'>
                <Grid container spacing={-2}>
                    <Grid item xs={4}>
                        <p>Password</p>
                    </Grid>
                    <Grid item xs={8}>
                        <Input type="password" placeholder='Enter Password' minlength="8" onChange={(e) => setSave({ ...save, password: e.target.value })} />
                    </Grid>
                </Grid>
            </div>
            <div className='second'>
                <Grid container spacing={-2} className='grid'>
                    <Grid className='sec-grid'>
                        <Button type="button" style={{ borderRadius: "22px" }} className='btn-one' onClick={() => onDataSubmite()}>Registration</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
