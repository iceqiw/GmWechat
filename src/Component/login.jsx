import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { is, fromJS } from 'immutable';
import { Tool } from '../Config/Tool';
import { template } from './common/mixin';


class Main extends Component {
    constructor() {
        super();
        this.state = {
            username: '',  //用户名
            pwd: '',   //密码
            preventMountSubmit: true,//防止重复提交
        }

        this.changeValue = (type, event) => {
            if (type === 'username') {
                this.setState({
                    username: event.target.value
                })
            }

            if (type === 'pwd') {
                this.setState({
                    pwd: event.target.value
                })
            }
        }

        this.postInform = () => {
            if (this.state.username == '') {
                Tool.alert('请输入用户名');
            } else if (this.state.pwd == '') {
                Tool.alert('请输入密码');
            } else {
                if (this.state.preventMountSubmit) {
                    this.state.preventMountSubmit == false;
                    this.props.formData('/api/user/login', {
                        username: this.state.username,
                        password: this.state.pwd
                    }, (resp) => {
                        if (resp.data) {
                            hashHistory.push('index')
                        } else {
                            Tool.alert(resp.data);
                        }
                    })
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
        console.log(nextProps.requestData)
    }

    render() {
        return (
            <div className="container">
                <div className="col-md-offset-3 col-md-6 login-panel">
                    <div className="panel panel-primary">
                        <div className="panel-heading">登陆</div>
                        <div className="panel-body">
                            <form className="form-horizontal" >
                                <div className="form-group">
                                    <label className="col-sm-2 control-label" >用户名</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" value={this.state.username} onChange={this.changeValue.bind(this, 'username')} placeholder="username" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label" >密码</label>
                                    <div className="col-sm-10">
                                        <input type="password" className="form-control" value={this.state.pwd} onChange={this.changeValue.bind(this, 'pwd')} placeholder="Password" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-sm-offset-2 col-sm-10">
                                        <div className="checkbox">
                                            <label><input type="checkbox" /> Remember me</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-offset-2 col-sm-10">
                                        <input type="button" onClick={this.postInform} className="btn btn-default" value="sign in" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
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

