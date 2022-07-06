import { REQUEST } from "../Types";

const initialState = {
    data: [],
}

export default function Request(state = initialState, action) {
    switch (action.type) {
        case REQUEST:
            state.data = [...state.data, action.data]
            return { ...state }
        default:
            return { ...state }
    }
}