import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {History, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import {Tool} from '../Config/Tool';
import {template} from './common/mixin';


class Main extends Component {
    constructor() {
        super();
        this.state = {
            saleMoney:'',  //销售金额
            name:'',   //姓名
            phone:'',   //电话
            preventMountSubmit:true,//防止重复提交
        }
        
    }

    componentWillMount() {

    }
    componentDidMount() {
         
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate")
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    
    componentWillUpdate(nextProps,nextState){

    }
   
    render() {
        return (
            <div className="component_container index_module">
                123
            </div>
        )
    }
    
    componentWillUnmount() {
        cancelAnimationFrame(this.state.requestID);
    }
}

export default template({
    id: 'index',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: ''
});

