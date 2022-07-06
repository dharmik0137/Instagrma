import { REGISTRATION } from "../Types";

const initialState = {
    data: [],
}

export default function Registration(state = initialState, action) {
    switch (action.type) {
        case REGISTRATION:
            state.data = [...state.data, action.data]
            return { ...state }
        default:
            return { ...state }
    }
}