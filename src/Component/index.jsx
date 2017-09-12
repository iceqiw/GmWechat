import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { is, fromJS } from 'immutable';
import { Tool } from '../Config/Tool';
import { Header, template } from './common/mixin';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            topic: '',  //用户名
            domainItemList: [],
            preventMountSubmit: true,//防止重复提交
        }

        this.changeValue = (type, event) => {
            if (type === 'topic') {
                this.setState({
                    topic: event.target.value
                })
            }
        }

        this.getInform = () => {
            if (this.state.topic == '') {
                Tool.alert('请输入topic');
            } else {
                if (this.state.preventMountSubmit) {
                    this.state.preventMountSubmit == false;
                    this.props.getData('/api/jxSearch/' + this.state.topic, {}, (resp) => {
                        console.log(resp)
                        this.state.domainItemList = resp.data
                        this.setState(this.state.domainItemList)
                    }, 'input')
                }
            }
        }
    }

    componentWillMount() {
        console.log("componentWillMount")
    }
    componentDidMount() {
        console.log("componentDidMount")
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate")
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate")
    }

    render() {
        return (
            <div>
                <Header title='index' />
                <div className="container">
                    
                </div>
            </div>
        );
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

