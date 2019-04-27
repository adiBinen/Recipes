const userReducer = (state = {
    userToDisplay: null
}, action) => {
    switch(action.type) {
        case 'SET_USER': 
            return {
                ...state,
                userToDisplay: action.user
            }
        default:
            return state;
    }
}

export default userReducer;