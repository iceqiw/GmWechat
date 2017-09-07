import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { is, fromJS } from 'immutable';
import { Tool } from '../Config/Tool';
import { template } from './common/mixin';
import { FormControl, Col, FormGroup, Button, Form, Checkbox, ControlLabel, Well } from 'react-bootstrap';


class List extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }

    render() {
        return (
            <div> 
                <ul className="product_list_ul">
                    {
                        this.props.list.map((item, index) => {
                            return <ListItem key={index} {...item} index={index}/>
                        })
                    }
                </ul>
            </div>
        );
    }
}

class ListItem extends Component {
    constructor(props,context){
        super(props,context)
        this.state = {
          
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    
    render() {
        let {question} = this.props;
        return (
            <li className='chooseProduct_item clear'>
                {question}
            </li>
        );
    }
}

class Main extends Component {
    constructor() {
        super();
        this.state = {
            topic: '',  //用户名
            productList:[],     
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
                    this.props.getData('/api/jxSearch/' + this.state.topic, {}, (data) => {
                        console.log(data)
                        this.state.productList=data
                        this.setState(this.state.productList)
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
            <div className="index-main ">
                <div className="index-main-body">
                    <h2 className="title">search</h2>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                topic
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" placeholder="topic" value={this.state.topic} onChange={this.changeValue.bind(this, 'topic')} />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button onClick={this.getInform} >Sign in</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
                <List list={this.state.productList}/>
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

