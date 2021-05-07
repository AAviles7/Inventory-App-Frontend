const userReducer = (state = { user: null, all_users: [] }, action) => {
    switch(action.type){
        case 'LOGIN_USER':
            return{
                ...state,
                user: action.user
            }
        case 'LOGOUT_USER':
            return{
                ...state,
                user: null
            }
        case 'ALL_USERS':
            return{
                ...state,
                all_users: action.all_users
            }
        default:
            return state
    }
}

export default userReducer