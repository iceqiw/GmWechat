import fetch from 'isomorphic-fetch'
import { target } from '../../Config/Config'
import { Tool } from '../../Config/Tool'
import { hashHistory } from 'react-router';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS'

//获取数据成功
const getDataSuccess = (json, success) => {
    return {
        type: GET_DATA_SUCCESS,
        json,
        success
    }
}


//手动调用获取数据的aciton
export const getData = (path, urlData, success) => {
    let url = target + path + Tool.urlParam(urlData);
    return dispatch => {
        return fetch(url, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        }).then(response => {
            if (response.ok) {
                response.json().then(json => dispatch(getDataSuccess(json, success)))
            } else {
                hashHistory.push('login')
            }
        }).catch(error => console.log(error))
    }
}

//手动调用获取数据的aciton
export const formData = (path, data, success) => {
    let url = target + path;
    return dispatch => {
        return fetch(url, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: Tool.formParam(data)
        }).then(response => {
            if (response.ok) {
                response.json().then(json => dispatch(getDataSuccess(json, success)))
            } else {
                hashHistory.push('login')
            }
        }).catch(error => console.log(error))
    }
}

export const postData = (path, data, success) => {
    let url = target + path;
    return dispatch => {
        return fetch(url, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                response.json().then(json => dispatch(getDataSuccess(json, success)))
            } else {
                hashHistory.push('login')
            }
        }).catch(error => console.log(error))
    }
}

export const putData = (path, data, success) => {
    let url = target + path;
    return dispatch => {
        return fetch(url, {
            method: 'PUT',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                response.json().then(json => dispatch(getDataSuccess(json, success)))
            } else {
                hashHistory.push('login')
            }
        }).catch(error => console.log(error))
    }
}

export const deleteData = (path, urlData, success) => {
    let url = target + path + Tool.urlParam(urlData);
    return dispatch => {
        return fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            mode: 'cors'
        }).then(response => {
            if (response.ok) {
                response.json().then(json => dispatch(getDataSuccess(json, success)))
            } else {
                hashHistory.push('login')
            }
        }).catch(error => console.log(error))
    }
}
