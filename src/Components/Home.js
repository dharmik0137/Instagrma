import { AppBar, Avatar, Button, Card, CardContent, CardMedia, Container, Grid, IconButton, Input, Menu, Toolbar, Tooltip } from '@mui/material'
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import * as allAction from '../Redux/Actions/index'
import MenuIcon from '@mui/icons-material/Menu';


export default function Home() {

    const [comment, setComment] = useState({ comment: "" })
    const [like, setLike] = useState();
    const [dislike, setDisLike] = useState();

    const nevigate = useNavigate();

    let Get_Data = useSelector((state) => state)
    const allPost = Get_Data.Post.data;
    const Userdata = Get_Data.Login.data;

    const dispatch = useDispatch();
    const { commentData, likeData, loginData } = bindActionCreators(allAction, dispatch);


    const addComment = (id) => {
        console.log(id);
        let obj = {
            postId: id,
            comment: comment.comment
        }
        commentData(obj)
        const CommentId = Get_Data.Post.data.filter((data) => data.U_id === obj.postId);
        const addComment = CommentId.find((data) => data);
        const dataPush = addComment.commentId.push(obj.comment)
    }

    const onLikeSubmit = (id) => {
        console.log("Id===>", id);
        let obj = {
            _id: id,
            like: like,
            Dislike: dislike
        }
        likeData(obj);
        const CommentId = Get_Data.Post.data.filter((data) => data.U_id === obj._id);
        const addComment = CommentId.find((data) => data);
        const update = addComment.likeId.push([obj.like]);
    }
    const setLogout = () => {
        nevigate('/')
        loginData().pop()
    }
    const profile = () => {
        nevigate('/dashboard/profile')
    }
    const post = () => {
        nevigate('/dashboard/addpost')
    }
    const serch = () => {
        nevigate('/dashboard/serch')
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Avatar alt="Remy Sharp" src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png' />
                        <Button color="inherit" onClick={() => profile()}>Profile</Button>
                        <Button color="inherit" onClick={() => post()}>AddPost</Button>
                        <Button color="inherit" onClick={() => serch()}>Serch</Button>
                        <Button color="inherit" onClick={() => setLogout()}>Logout</Button>
                        <Avatar alt="Remy Sharp" src={`${Userdata[0].avtar}`} />
                    </Toolbar>
                </AppBar>
            </Box>
            <div>
                {allPost.map((data) =>
                    <table border='1' align='center' style={{ marginTop: "30px" }}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="240"
                                width="250"
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
                                <div>
                                    <input placeholder='Add Comment' style={{ height: "40px", marginTop: "10px", fontSize: "20px" }} onChange={(e) => setComment({ ...comment, comment: e.target.value })} /><Button onClick={() => addComment(data.U_id)}>Submit</Button><hr />
                                </div>
                                <div>
                                    <input type='radio' name='Like' onChange={() => setLike("true")} />Like
                                    <input type='radio' name='Like' onChange={() => setDisLike("false")} />Dislike
                                    <Button onClick={() => onLikeSubmit(data.U_id)}>Submit</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </table>
                )}
            </div> 
        </div >
    )
}
