import axios from 'axios';

import {BASE_URL} from "@/enums";
import {getLocalStorage, setLocalStorage} from "@/utils";

axios.defaults.timeout = 5000 // 超时时间设置
axios.defaults.withCredentials = true // true允许跨域
axios.defaults.baseURL = BASE_URL + 'api';
// Content-Type 响应头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
let tokenKey = '_token';
let userKey = '_user';

/**
 * 获取Token
 * @returns {any | null}
 */
export function getToken() {
    return getLocalStorage(tokenKey);
}

/**
 * 保存 Token
 * @param token
 */
function setToken(token) {
    return setLocalStorage(tokenKey, token);
}

/**
 * 处理 auth response ,将用户数据和Token数据保存
 * @param data
 */
function responseToken(data) {
    let {access_token, token_type, expires_in, user} = data;
    setToken({
        access_token,
        token_type,
        expires_in : Date.now() + expires_in*1000,
    });
    setUser(user)
}

/**
 * 获取 storage 中的用户数据
 * @returns {any | null}
 */
export function getUser() {
    return getLocalStorage(userKey)
}

/**
 * 存储用户数据到 storage 中
 * @param user
 */
function setUser(user) {
    return setLocalStorage(userKey, user);
}


/**
 * 登录Api
 * @param params
 * @returns {Promise<AxiosResponse<any>|*>}
 */
export async function login(params) {
    try {
        let res = await axios.post('/auth/login', params);
        responseToken(res.data);
        console.log("res", res);

        return res;
    } catch (err) {
        return err;
    }
}

/**
 * 注册Api
 * @param params
 * @returns {Promise<AxiosResponse<any>|*>}
 */
export async function signIn(params) {
    try {
        return await axios.post('/auth/register', params);
    } catch (err) {
        return err;
    }
}

/**
 * 刷新Token
 * @returns {Promise<AxiosResponse<any>|*>}
 */
export async function refreshToken() {
    try {
        let token = getToken();
        let res = await axios.put('/auth/register', {},{
            headers: {
                'Authorization' : `${token.token_type} ${token.access_token}`
            }
        });
        responseToken(res.data);
        console.log("res", res);

        return res;
    } catch (err) {
        return err;
    }
}