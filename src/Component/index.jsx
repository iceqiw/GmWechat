import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { is, fromJS } from 'immutable';
import { Tool } from '../Config/Tool';
import { Header, template } from './common/mixin';


class Table extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    render() {
        return (
            <table className="table ">
                <thead>
                    <tr>
                        <th >车次</th>
                        <th >日期</th>
                        <th >始发站</th>
                        <th >终点站 </th>
                        <th >硬卧</th>
                        <th >硬座</th>
                        <th >软卧</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.list.map((item, index) => {
                            return <TableRow key={index} {...item} index={index} />
                        })
                    }
                </tbody>
            </table>
        );
    }
}

class TableRow extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {

        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    render() {
        let { num_yw, num_yz, num_rw, train,end_station,start_station,date} = this.props;
        return (
            <tr>
                <td >{train}</td>
                <td >{date}</td>
                <td >{start_station}</td>
                <td >{end_station}</td>
                <td >{num_yw}</td>
                <td >{num_yz}</td>
                <td >{num_rw}</td>
            </tr>
        );
    }
}

class Main extends Component {
    constructor() {
        super();
        this.state = {
            productList: [],
        }
    }


    componentWillMount() {
        console.log("componentWillMount")
        this.props.getData('/api/train/search/2017-10-01/FZS/WAR/T306', {}, (resp) => {
            console.log(resp)
            this.setState({productList:resp.data})
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
                    <Table list={this.state.productList} />
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

