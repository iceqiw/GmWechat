import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {hashHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import {Tool} from '../Config/Tool';
import {Header,template} from './common/mixin';
import { Navbar, Nav, NavItem,Button } from 'react-bootstrap';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            username:'',  //销售金额
            pwd:'',   //姓名
            preventMountSubmit:true,//防止重复提交
        }

        this.postInform = () => {
            if (this.state.username == '') {
                Tool.alert('请输入学号');
            }else if (this.state.pwd == '') {
                Tool.alert('请输入密码');
            }else{
                if (this.state.preventMountSubmit) {
                    this.state.preventMountSubmit == false;
                    this.props.getData('/api',{
                        username:this.state.username,
                        pwd :this.state.pwd},(res) => {             
                        hashHistory.push('/index')
                    },'input')
                }
            }
        }
        
    }

    componentWillMount() {

    }
    componentDidMount() {
         
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    
    componentWillUpdate(nextProps,nextState){
        if (this.props !== nextProps) {
            let {data} = nextProps.state;

        }
    }
   
    render() {
        return (
        <div>
            <Navbar fixedTop>
            <Navbar.Header>
                <Navbar.Brand> 
                <a href="#">react-bootstrap</a>
                </Navbar.Brand>
                <Navbar.Toggle/>
            </Navbar.Header>
            </Navbar>
        </div>
        )
    }
    
    componentWillUnmount() {
        cancelAnimationFrame(this.state.requestID);
    }
}

export default template({
    id: 'login',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: ''
});

