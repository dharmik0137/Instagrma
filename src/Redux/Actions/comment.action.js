import { COMMENT } from '../Types'

export const commentData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: COMMENT,
                data
            })
        } catch (error) {
            dispatch({
                error
            })
        }
    }
}