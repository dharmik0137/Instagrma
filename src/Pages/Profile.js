import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export default function Profile() {
    let Get_Data = useSelector((state) => state)
    const LoginData = Get_Data.Login.data;
    const Login = Get_Data.Login.data.find((data) => data)
    const Follower = Get_Data.Request.data.filter((data) => data.reciver === Login.firstName)
    const Following = Get_Data.Accept.data.filter((data) => data.sender === Login.firstName);
    return (
        <div>
            <h1>----Your Profile----</h1>
            <div>
                <Link to='/dashboard'><button>Cancle</button></Link>
            </div>
            <div>
                <Link to='/checkpost'><button>Chek Your Post</button></Link>
            </div>
            <div>
                <Link to='panding'><button>panding-Request</button></Link>
            </div>
            <div style={{ marginTop: "50px" }}>
                <div>
                    <p>{Follower.length}</p>
                    <b>Follower</b>
                </div>
                <div>
                    <p>{Following.length}</p>
                    <b>Following</b>
                </div>
            </div>
            <table border='1' align='center' style={{ marginTop: "30px" }}>
                <div>
                    {LoginData.map((data) =>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="280"
                                width="200"
                                image={`${data.avtar}`}

                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Name:-{data.firstName} {data.lastName}
                                </Typography><hr />
                                <Typography gutterBottom variant="h5" component="div">
                                    Email:-{data.email}<hr />
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    UserName:-{data.userName}<hr />
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    MobileNumber:-{data.number}<hr />
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    DOB:-{data.date}<hr />
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    Gender:-{data.gender}
                                </Typography>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </table>
        </div >
    )
}