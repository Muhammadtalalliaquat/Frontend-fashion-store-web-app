
import axios from "axios";
import { setUser , setError , setSuccess } from "@/store/features/userSlice";
import { ApiRoutes } from "@/constant/constant";


export const registerUser = (userData) => async (dispatch) => {
    try{
        const response = await axios.post(ApiRoutes.register , userData);
        const { user , verificationToken } = response.data.data;

        localStorage.setItem('token', verificationToken);
        localStorage.setItem('user', JSON.stringify(user));

        dispatch(setUser({ user, verificationToken }));

        console.log("API Response:", user, verificationToken);
        return { success: true, user, verificationToken };

    } catch (error) {
        const errorMessage = error.response?.data?.msg || "Registration failed";
        dispatch(setError(errorMessage));
        console.log('Error during registration:', error.message);
        return { success: false, error: errorMessage };
    }
};

export const verifyEmail  = (token) => async (dispatch) => {    
    try{
        const response = await axios.post(ApiRoutes.verifyEmail , null , {
            headers: { token },
        });

        console.log("API Response:", response.data);

        const verifiedEmail = response.data?.data?.verifiedEmail ?? false;
        const isAuthenticated = response.data?.data?.isAuthenticated ?? false;

        if (verifiedEmail) {
            dispatch(setSuccess({ verifiedEmail, isAuthenticated }));
        } else {
            dispatch(setError("Email verification failed."));
        }

        // dispatch(setSuccess(response.data?.data?.message));
        // console.log(response.data?.data);

    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Verification failed'
        dispatch(setError(errorMessage));
        console.error('Error during Verification:', error.message);
    }
};


export const loginUser = (credentials) => async (dispatch) => {
    try {
        const response = await axios.post(ApiRoutes.login, credentials);
        const { user, token } = response.data.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        dispatch(setUser({ user, token }));
        console.log("API Response:", user, token);
        return { success: true, user, token };

    } catch (error) {
        const errorMessage = error.response?.data?.msg || "Login failed";
        dispatch(setError(errorMessage));
        console.log('Error during login:', error.response || error.message);
        return { success: false, error: errorMessage };
    }
};


export const requestPasswordReset =  async (email) =>{
    try{
        const response = await axios.post(ApiRoutes.forgotPassword , { email });
        console.log(response.data?.data?.message)
    } catch(error) {
        console.log(error.rresponse?.data?.message)

    }   
}