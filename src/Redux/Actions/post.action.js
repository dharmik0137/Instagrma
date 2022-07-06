import { POST } from '../Types'

export const postData = (data) => {
    console.log("Data==>", data);
    return async (dispatch) => {
        try {
            dispatch({
                type: POST,
                data
            })
        } catch (error) {
            dispatch({
                error
            })
        }
    }
}