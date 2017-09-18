import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { is, fromJS } from 'immutable';
import { Tool } from '../Config/Tool';
import { Header, template } from './common/mixin';


class ListItem extends Component {
    constructor() {
        super()
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    render() {
        let { question, answer, optiona, optionb, optionc, optiond, index, imglink } = this.props;
        return (
            <ul className="list-group">
                <li className="list-group-item"><h4>{index + 1} . {question} ({answer})</h4></li>
                {
                    imglink ? (
                        <img height="180" src={imglink} width="204" />
                    ) : ("")
                }
                {
                    optiona ? (
                        <div>
                            <li className="list-group-item">A:{optiona}</li>
                            <li className="list-group-item">B:{optionb}</li>
                            <li className="list-group-item">C:{optionc}</li>
                            <li className="list-group-item">D:{optiond}</li>
                        </div>
                    ) : ("")
                }

            </ul>
        );
    }
}


class List extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    render() {
        return (
            <div className='"well well-lg' >
                {
                    this.props.list.map((item, index) => {
                        return <ListItem key={index} {...item} index={index} />
                    })
                }
            </div>
        );
    }
}

class Main extends Component {
    constructor() {
        super();
        this.state = {
            topic: '',  //用户名
            productList: [],
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
                    this.props.getData('/api/jxSearch/search/' + this.state.topic, {}, (resp) => {
                        console.log(resp)
                        this.setState({
                            productList: resp.data
                        })
                    })
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
                <Header title='search' />
                <div className="container">
                    <div className='row'>
                        <div className="col-md-6">
                            <h2 >search</h2>
                            <form className="form-horizontal" >
                                <div className="form-group">
                                    <label className="col-sm-2 control-label" >题目</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" value={this.state.topic} onChange={this.changeValue.bind(this, 'topic')} placeholder="topic" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-offset-2 col-sm-10">
                                        <input type="button" onClick={this.getInform} className="btn btn-primary" value="search" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='row' >
                        <List list={this.state.productList} />
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
    id: 'search',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: ''
});

