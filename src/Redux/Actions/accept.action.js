import { ACCEPT } from '../Types'

export const acceptData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ACCEPT,
                data
            })
        } catch (error) {
            dispatch({
                error
            })
        }
    }
}