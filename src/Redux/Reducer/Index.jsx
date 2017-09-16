import {GET_DATA_SUCCESS} from '../Action/Index'

//手动获取数据
export const requestData = (state = {}, action = {}) => {
    switch(action.type){
        case GET_DATA_SUCCESS:
            state=action.json
            action.success(action.json);
            return state;
        default:
            return state;
    }
}