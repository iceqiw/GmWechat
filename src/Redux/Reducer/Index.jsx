import Immutable from 'immutable'
import {GET_DATA_START , GET_DATA_SUCCESS} from '../Action/Index'


//手动获取数据
export const requestData = (state = {}, action = {}) => {
    switch(action.type){
        case GET_DATA_START:
            return state;
        case GET_DATA_SUCCESS:
            action.success(action.json);
            return state;
        default:
            return state;
    }
}

