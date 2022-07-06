import { ACCEPT } from "../Types";

const initialState = {
    data: [],
}

export default function Accept(state = initialState, action) {
    switch (action.type) {
        case ACCEPT:
            state.data = [...state.data, action.data]
            return { ...state }
        default:
            return state;
    }
}