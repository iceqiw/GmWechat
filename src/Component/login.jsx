import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import { hashHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import { Tool } from '../Config/Tool';
import { template } from './common/mixin';
import { FormControl, Col, FormGroup, Button, Form, Checkbox, ControlLabel, Well } from 'react-bootstrap';


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
                    this.props.postData('/api/g', {
                        username: this.state.username,
                        pwd: this.state.pwd
                    }, (data) => {
                        console.log(data.res)
                        if (data.res == '1') {
                            Tool.alert(data.res);
                        } else {
                            hashHistory.push('index')
                        }
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
        console.log(nextProps.state)
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    componentWillUpdate(nextProps, nextState) {
    }

    render() {
        return (
            <div className="container">
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            用户名
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" placeholder="username" value={this.state.username} onChange={this.changeValue.bind(this, 'username')} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            密码
                    </Col>
                        <Col sm={10}>
                            <FormControl type="password" placeholder="Password" value={this.state.pwd} onChange={this.changeValue.bind(this, 'pwd')} />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Checkbox>Remember me</Checkbox>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button onClick={this.postInform} >Sign in</Button>
                        </Col>
                    </FormGroup>
                </Form>
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

