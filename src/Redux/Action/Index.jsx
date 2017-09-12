import fetch from 'isomorphic-fetch'
import {target} from '../../Config/Config'
import {Tool} from '../../Config/Tool'
import { hashHistory } from 'react-router';
export const GET_DATA_START = 'GET_DATA_START'
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS'



//开始获取数据
const getDataStart = path => {
  return {
    type: GET_DATA_START,
    path
  }
}

//获取数据成功
const getDataSuccess = (path, json, success, name) => {
  return {
    type: GET_DATA_SUCCESS,
    path ,
    json ,
    success ,
    name
  }
}


//手动调用获取数据的aciton
export const getData = (path, postData, success, name) => {
    let url = target + path + Tool.paramType(postData);
    return dispatch => {
        dispatch(getDataStart(postData))
        return fetch(url,{
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors'
        })
        .then(response =>{
            console.log("status", response.ok);
            if (response.ok) {
                response.json().then(json => dispatch(getDataSuccess(path, json, success, name)))
            } else {
                hashHistory.push('login')
            }
        }).catch(error => console.log(error))
    }
}

//手动调用获取数据的aciton
export const postData = (path, data, success, name) => {
    let url = target + path;
    return dispatch => {
        dispatch(getDataStart(data))
        return fetch(url,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body:JSON.stringify(data)
        })
        .then(response =>{
            console.log("status", response.status);
            if (response.ok) {
                response.json().then(json => dispatch(getDataSuccess(path, json, success, name)))
            } else {
                hashHistory.push('login')
            }
        }).catch(error => console.log(error))
    }
}
