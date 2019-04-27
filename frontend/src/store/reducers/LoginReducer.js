import StorageService from '../../services/StorageService';

const USER_KEY = 'recipes-user';

const loginReducer = (state = {
    currUser : StorageService.getFromLocal(USER_KEY) || {}
}, action) => {
    switch (action.type) {
        case 'SET_CURR_USER':
            StorageService.saveToLocal(USER_KEY, action.user);
            return {
                ...state,
                currUser: action.user
            }
        case 'REMOVE_CURR_USER':
            StorageService.removeFromLocal(USER_KEY);
            return {
                ...state,
                currUser: action.user
            }
        default:
            return state;
    }
}

export default loginReducer;