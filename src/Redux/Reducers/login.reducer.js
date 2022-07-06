import { LOGIN } from "../Types";

const initialState = {
    data: [],
}

export default function Login(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            state.data = [action.data]
            return { ...state }
        default:
            return { ...state }
    }
}