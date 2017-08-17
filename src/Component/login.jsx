import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import { hashHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import { Tool } from '../Config/Tool';
import { template } from './common/mixin';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            username: '',  //销售金额
            pwd: '',   //姓名
            preventMountSubmit: true,//防止重复提交
        }

        this.changeValue = (type,event) => {
            if (type === 'username') {
                this.setState({
                    username:event.target.value
                })
            }

            if (type === 'pwd') {
                this.setState({
                    pwd:event.target.value
                })
            }
        }

        this.postInform = () => {
            if (this.state.username == '') {
                Tool.alert('请输入学号');
            } else if (this.state.pwd == '') {
                Tool.alert('请输入密码');
            } else {
                if (this.state.preventMountSubmit) {
                    this.state.preventMountSubmit == false;
                    this.props.getData('/api/g', {
                        username: this.state.username,
                        pwd: this.state.pwd
                    }, (res) => {
                        Tool.alert(this.state);
                  
                    }, 'input')
                }
            }
        }

    }

    componentWillMount() {

    }
    componentDidMount() {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    componentWillUpdate(nextProps, nextState) {
   
    }

    render() {
        return (
            <div>
                <form className='form_style'>
                    <div className='input_container'>
                        <span className='input_descript'>学号：</span>
                        <input type="text" value={this.state.username} maxLength='7' placeholder='请输入学号' onChange={this.changeValue.bind(this,'username')} />
                    </div>
                    <div className='input_container'>
                        <span className='input_descript'>姓名：</span>
                        <input type="text" value={this.state.pwd} placeholder='请输入密码' onChange={this.changeValue.bind(this,'pwd')} />
                    </div>
                </form>
                <button className='submit' onClick={this.postInform}>
                    提交
                </button>
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

