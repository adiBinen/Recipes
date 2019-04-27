// Services
import UserService from '../../services/UserService'

export const loadUser = (userId) => {
    return async (dispatch) => {
        try {
            const user = await UserService.getById(userId);
            dispatch({ type: 'SET_USER', user })
            return true;
        } catch (err) {
            return false
        }
    }
}

export const clearUserToDisplay = () => {
    return (dispatch) => {
        dispatch({type: 'SET_USER', user: null })
    }
}