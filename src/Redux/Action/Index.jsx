import fetch from 'isomorphic-fetch'
import {target} from '../../Config/Config'
import {Tool} from '../../Config/Tool'

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
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors'
        })
        .then(response => response.json())
        .then(json => dispatch(getDataSuccess(path, json, success, name)))
        .catch(error => console.log(error))
    }
}

//手动调用获取数据的aciton
export const postData = (path, data, success, name) => {
    let url = target + path;
    return dispatch => {
        dispatch(getDataStart(data))
        return fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors'
        })
        .then(response => response.json())
        .then(json => dispatch(getDataSuccess(path, json, success, name)))
        .catch(error => console.log(error))
    }
}
