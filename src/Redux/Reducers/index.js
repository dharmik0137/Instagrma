import { combineReducers } from 'redux'
import Registration from './registration.reducer'
import Login from './login.reducer'
import Post from './post.reducer'
import Like from './like.reducer'
import Comment from './comment.reducer'
import Request from './request.reducer'
import Accept from './accept.reducer'

export default combineReducers({
    Registration,
    Login,
    Post,
    Like,
    Comment,
    Request,
    Accept
})

