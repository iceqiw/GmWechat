import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { is, fromJS } from 'immutable';
import { Tool } from '../Config/Tool';
import { Header, template } from './common/mixin';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            topic: '[1]'
        }
    }


    componentWillMount() {
        console.log("componentWillMount")
        this.props.getData('/api/train/search/2017-10-01/1/1/1', {}, (resp) => {
            console.log(resp)
            this.setState(resp.data)
        }, 'input')

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
                    <table className="table ">
                        <thead>
                            <tr>
                                <th >硬卧</th>
                                <th >硬座</th>
                                <th >软卧</th>
                                <th >车次</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td >{this.state.num_yw}</td>
                                <td >{this.state.num_yz}</td>
                                <td >{this.state.num_rw}</td>
                                <td >{this.state.train}</td>
                            </tr>
                        </tbody>
                    </table>
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

