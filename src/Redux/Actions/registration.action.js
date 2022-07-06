import { REGISTRATION } from '../Types'

export const registrationData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: REGISTRATION,
                data
            })
        } catch (error) {
            dispatch({
                error
            })
        }
    }
}