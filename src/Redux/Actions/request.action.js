import { REQUEST } from '../Types'

export const requestData = (data) => {
    console.log("Data===>", data);
    return async (dispatch) => {
        try {
            dispatch({
                type: REQUEST,
                data
            })
        } catch (error) {
            dispatch({
                error
            })
        }
    }
}