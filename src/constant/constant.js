const DEV_URL = `http://localhost:4000/`
// const PROD_URL = `https://back-end-fashion-web-app-server-production.up.railway.app/`

export const BASIC_URL = DEV_URL
// export const BASIC_URL = PROD_URL

export const ApiRoutes = {
    login: BASIC_URL + `user/login`,
    register: BASIC_URL + `user/register`,
    verifyEmail: BASIC_URL + `user/verifyemail`,
    forgotPassword: BASIC_URL + `user/requestPasswordReset`,
    forgotPasswordSent: BASIC_URL + `user/resetPassword`,

    getProduct: BASIC_URL + `admin/`,
    addProduct: BASIC_URL + `admin/addProdcuts`,
    editProduct: BASIC_URL + `admin/edit/:id`,
    deleteProduct: BASIC_URL + `admin/delete`,
}
