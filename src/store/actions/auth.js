import * as actionTypes from '../../store/actions/actionTypes';
import axios from 'axios';

export const authStart = ()=>{
    return {
        type:actionTypes.AUTH_START
    }
};

export const authSuccess = (authData)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        authData:authData
    }

}

export const authFail = (error) =>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    };
}

export const logout = () => {
    return {
        type:actionTypes.AUTH_LOGOUT,
        token:null,
        userId:null
    }
}

export const authLogoutTimer = (expirationTime) =>{

    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout());
        },expirationTime*1000)
    }

}




export const auth = (email, password,isSignUp) =>{
    return dispatch =>{
        dispatch(authStart());

        const signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA62egMRgmxGmkqWCBinZqm9YbLskmBrxs';
        const signinUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA62egMRgmxGmkqWCBinZqm9YbLskmBrxs';
        
        const url = isSignUp ? signupUrl :signinUrl;
        const authData = {
            email: email,
            password: password,
            returnSecureToken:true
        }
        axios.post(url,authData)
        .then((response)=>{
            console.log(response.data);
            const expirationDate = new Date(new Date().getTime() + (response.data.expiresIn*1000));

            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',response.data.localId);

            dispatch(authLogoutTimer(response.data.expiresIn));
            dispatch(authSuccess(response.data));
        })
        .catch((error)=>{
            dispatch(authFail(error.message));
        });

    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authCheckState = () => {

    return dispatch=>{

        const token = localStorage.getItem('token');
        
        if(!token){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const userId = localStorage.getItem('userId');
            if(expirationDate > new Date()){
                dispatch(authSuccess({idToken:token,localId:userId}));
                const expirationTime = (expirationDate.getTime()-new Date().getTime())/1000;
                dispatch(authLogoutTimer(expirationTime)) //takes time in seconds
            }
            else{
                dispatch(logout());
            }
        }

    }

} 