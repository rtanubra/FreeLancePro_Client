const AuthService = {
    saveToken(token,payload){
        window.localStorage.setItem('user_id',payload.user_id)
        window.localStorage.setItem('FLPauthToken', token)
    },
    deleteToken(){
        window.localStorage.removeItem('user_id')
        window.localStorage.removeItem('FLPauthToken')
    }
}

export default AuthService