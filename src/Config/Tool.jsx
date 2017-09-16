
import * as config from './Config';

const { target } = config;
export const Tool = {};

Tool.urlParam = data => {
    let paramArr = [];
    let paramStr = '';
    for (let attr in data) {
        paramArr.push(attr + '=' + data[attr]);
    }
    paramStr = paramArr.join('&');
    paramStr = '?' + paramStr;
    return paramStr
}

Tool.formParam = data => {
    let paramArr = [];
    let paramStr = '';
    for (let attr in data) {
        paramArr.push(attr + '=' + data[attr]);
    }
    paramStr = paramArr.join('&');
    return paramStr
}


let alertText = document.createElement('div');
alertText.setAttribute('id', 'alertText');
let alertDom = document.createElement('div');
alertDom.setAttribute('id', 'alertTip');
alertDom.appendChild(alertText);

document.body.appendChild(alertDom);
let timer = null;
Tool.alert = (msg) => {
    clearTimeout(timer);
    alertText.innerHTML = '<div class="alert alert-danger">' + msg + '</div>';
    alertDom.style.display = 'block';
    alertDom.onclick = () => {
        clearTimeout(timer);
        alertDom.style.display = 'none';
    }
    timer = setTimeout(() => {
        alertDom.style.display = 'none';
        clearTimeout(timer);
    }, 3000)
}

