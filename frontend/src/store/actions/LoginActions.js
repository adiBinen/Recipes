import UserService from '../../services/UserService';

export const login = (credentials) => {
    return async (dispatch) => {
        try {
            const user = await UserService.login(credentials);
            dispatch({ type: 'SET_CURR_USER', user })
            return true;
        } catch (err) {
            return false
        }
    }
}

export const signup = (newUser) => {
    return async (dispatch) => {
        try {
            const user = await UserService.signup(newUser);
            dispatch({ type: 'SET_CURR_USER', user })
            return true;
        } catch (err) {
            return false
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        const res = await UserService.logout();
        if (res) {
            dispatch({ type: 'REMOVE_CURR_USER', user: {} })
            return res;
        } else return res;
    }
}

export const checkLoggedInUser = () => {
    return async (dispatch) => {
        const user = await UserService.checkLoggedInUser();
        if (user) dispatch({ type: 'SET_CURR_USER', user })
        return user;
    }
}