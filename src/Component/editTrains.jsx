import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import { is, fromJS } from 'immutable';
import { Tool } from '../Config/Tool';
import { Header, template } from './common/mixin';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            trainNo: '',  //用户名
            date: '',   //密码
            startStation: '',//防止重复提交
            endStation: '',//防止重复提交
        }

        this.changeValue = (type, event) => {
            if (type === 'trainNo') {
                this.setState({
                    trainNo: event.target.value
                })
            }
            if (type === 'date') {
                this.setState({
                    date: event.target.value
                })
            }
            if (type === 'startStation') {
                this.setState({
                    startStation: event.target.value
                })
            }
            if (type === 'endStation') {
                this.setState({
                    endStation: event.target.value
                })
            }
        }

        this.postInform = () => {
            this.props.postData('/api/train/curd', {
                trainNo: this.state.trainNo,
                date: this.state.date,
                startStation: this.state.startStation,
                endStation: this.state.endStation
            }, (resp) => {
                if (resp.data) {
                    hashHistory.push('index')
                } else {
                    Tool.alert(resp.data);
                }
            })
        }

        this.putInform = () => {
            this.props.putData('/api/train/curd', {
                id: this.state.id,
                trainNo: this.state.trainNo,
                date: this.state.date,
                startStation: this.state.startStation,
                endStation: this.state.endStation
            }, (resp) => {
                if (resp.data) {
                    hashHistory.push('index')
                } else {
                    Tool.alert(resp.data);
                }
            })
        }

        this.delInform = () => {
            this.props.deleteData('/api/train/curd', {
                id: this.state.id
            }, (resp) => {
                if (resp.data) {
                    hashHistory.push('index')
                } else {
                    Tool.alert(resp.data);
                }
            })
        }
    }


    componentWillMount() {
    }

    componentDidMount() {
        console.log("componentDidMount2")
        if (this.props.params.id != '0') {
            this.props.getData('/api/train/curd', { id: this.props.params.id }, (resp) => {
                console.log(resp)
                if (resp.data) {
                    this.setState(resp.data)
                }
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    componentWillUpdate(nextProps, nextState) {

    }

    render() {
        return (
            <div>
                <Header title='editTrains' />
                <div className="container">
                    <div className="panel panel-primary">
                        <div className="panel-heading">编辑</div>
                        <div className="panel-body">
                            <form className="form-horizontal" >
                                <div className="form-group">
                                    <label className="col-sm-2 control-label" >trainNo</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" value={this.state.trainNo} onChange={this.changeValue.bind(this, 'trainNo')} placeholder="trainNo" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label" >date</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" value={this.state.date} onChange={this.changeValue.bind(this, 'date')} placeholder="date" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label" >startStation</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" value={this.state.startStation} onChange={this.changeValue.bind(this, 'startStation')} placeholder="startStation" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label" >endStation</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" value={this.state.endStation} onChange={this.changeValue.bind(this, 'endStation')} placeholder="endStation" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-offset-2 col-sm-10">
                                        {
                                            this.props.params.id == '0' ? (
                                                <input type="button" onClick={this.postInform} className="btn btn-primary" value="add" />
                                            ) : (
                                                    <div>
                                                        <input type="button" onClick={this.putInform} className="btn btn-info" value="edit" />
                                                        <input type="button" onClick={this.delInform} className="btn btn-danger" value="del" />
                                                    </div>
                                                )
                                        }

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.state.requestID);
    }
}

export default template({
    id: 'editTrains',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: ''
});

