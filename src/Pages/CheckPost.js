import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export default function Checkpost() {
    const UserData = useSelector((state) => state);
    const LoginId = UserData.Login.data.find((id) => id);
    const UserPost = UserData.Post.data.filter((data) => data.P_id === LoginId.R_id);
    console.log("UserPost===>", UserPost);
    return (
        <div>
            <h1>----Your Posts----</h1>
            <div>
                <Link to='/dashboard'><button>Cancle</button></Link>
            </div>
            <div>
                {UserPost.map((data) =>
                    <table border='1' align='center' style={{ marginTop: "20px" }}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="340"
                                width="450"
                                image={`${data.image}`}

                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Title:-{data.title}<hr />
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Discription:-{data.discription}<hr />
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <h5>Comments:-</h5>
                                    {`${data.commentId}`}<hr />
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <h5>Likes:-</h5>
                                    {`${data.likeId.length}`}<hr />
                                </Typography>
                            </CardContent>
                        </Card>
                    </table>
                )}
            </div>
        </div>
    )
}