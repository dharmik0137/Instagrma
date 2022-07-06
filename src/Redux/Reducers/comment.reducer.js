import { COMMENT } from "../Types";

const initialState = {
    data: [],
}

export default function Comment(state = initialState, action) {
    switch (action.type) {
        case COMMENT:
            state.data = [...state.data, action.data]
            return { ...state }
        default:
            return state;
    }
}