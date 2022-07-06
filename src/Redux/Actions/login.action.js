import { LOGIN } from '../Types'

export const loginData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: LOGIN,
                data
            })
        } catch (error) {
            dispatch({
                error
            })
        }
    }
}