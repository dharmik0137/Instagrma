import { POST } from "../Types";
const initialState = {
    data: [],
}

export default function Post(state = initialState, action) {
    console.log("Action==>", action.data);
    switch (action.type) {
        case POST:
            state.data = [...state.data, action.data]
            return { ...state }
        default:
            return state;
    }
}