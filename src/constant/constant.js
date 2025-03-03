const DEV_URL = `http://localhost:4000/`
// const PROD_URL = `https://back-end-sever-chat-app-production.up.railway.app/`

export const BASIC_URL = DEV_URL
// export const BASIC_URL = PROD_URL

export const ApiRoutes = {
    login: BASIC_URL + `user/login`,
    register: BASIC_URL + `user/register`,
    verifyEmail: BASIC_URL + `user/verifyemail`,
    forgotPassword: BASIC_URL + `user/requestPasswordReset`,
    forgotPasswordSent: BASIC_URL + `user/resetPassword`,
    // getTask: BASIC_URL + `task`,
    // postTask: BASIC_URL + `task`,
    // editTask: BASIC_URL + `task`,
    // deleteTask: BASIC_URL + `task`,
}
