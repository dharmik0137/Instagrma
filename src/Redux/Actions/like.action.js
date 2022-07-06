import { LIKE } from '../Types'

export const likeData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: LIKE,
                data
            })
        } catch (error) {
            dispatch({
                error
            })
        }
    }
}