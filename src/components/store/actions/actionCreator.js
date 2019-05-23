import axios from 'axios';
import { REGISTER_USER,SIGN_USER, AUTO_SIGN_IN,GET_ARTICLES,ADD_ARTICLE,GET_USER_POSTS, DELETE_USER_POST } from './actionTypes';
import { SIGNUP,SIGNIN,REFRESH } from '../../utils/misc';
import { setToken } from '../../utils/misc';
import axiosModule from '../axios/axios';

export const signUp = (data) => {

    const request = axios({
        method:"POST",
        url:SIGNUP,
        data:{
            email:data.email,
            password:data.password,
            returnSecureToken:true
        },
        headers:{
            "Content-Type":"application/json"
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        return false
    })

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export const signIn = data => {
    const request = axios.post(SIGNIN,{
        email: data.email,
        password: data.password,
        returnSecureToken: true
    }).then(response => {
        return response.data
    }).catch(error => {
        return false
    })
    return {
        type: SIGN_USER,
        payload: request
    }
}

export const autoSignIn = refToken => {
    const request = axios.post(REFRESH,{
        grant_type:"refresh_token",
        refresh_token: refToken
    }).then(response => {
        return response.data
    }).catch(error => {
        return false;
    })

    return {
        type: AUTO_SIGN_IN,
        payload:request
    }
}

export const getArticles = (cat) => {

    let url = "/articles.json"
    if(cat !== "All"){
        url += `/?orderBy="category"&equalTo="${cat}"`   
    }

    const request = axiosModule.get(url).then(response => {
        const articles = [];

        for(let key in response.data){
            articles.push({
                ...response.data[key],
                id:key
            })
        }

        return articles;
        
        }).catch(error => {
            console.log(error)
        })

    return {
        type: GET_ARTICLES,
        payload: request
    }
}

export const addArticle = (data,token) => {
    const request = axiosModule.post(`/articles.json?auth=${token}`,data).then(response => {return response.data}).catch(error => console.log(error))

    return {
        type:ADD_ARTICLE,
        payload:request
    }
}

export const resetArticle = () => {
    return {
        type:RESET_ARTICLE,
    }
}

 

export const deleteUserPost = (id,userData) => {
    const request = axiosModule.delete(`/articles/${id}.json?auth=${userData.token}`).then(response => {
        return response.data
    })
    .catch(() => {
        const signIn = autoSignIn(userData.refToken);

        signIn.payload.then(response => {
            let newToken = {
                token: response.id_token,
                refToken:response.refresh_token,
                uid:response.user_id
            }

            setToken(newToken,() => {
                axiosModule.delete(`/articles/${id}.json?auth=${userData.token}`);
            })
        })
    })

    return {
        type: DELETE_USER_POST,
        payload: request
    }
}