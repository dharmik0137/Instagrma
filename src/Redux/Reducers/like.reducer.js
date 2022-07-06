import { LIKE } from "../Types";

const initialState = {
    data: [],
}

export default function Like(state = initialState, action) {
    switch (action.type) {
        case LIKE:
            state.data = [...state.data, action.data]
            return { ...state }
        default:
            return state;
    }
}