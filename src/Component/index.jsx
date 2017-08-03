import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {History, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import {Tool} from '../Config/Tool';
import {Header,template} from './common/mixin';


class Main extends Component {
    constructor() {
        super();
        this.state = {
            saleMoney:'',  //销售金额
            name:'',   //姓名
            phone:'',   //电话
            preventMountSubmit:true,//防止重复提交
        }

        this.changeValue = (type,event) => {
            if (type === 'name') {
                this.setState({
                    name:event.target.value
                })
            }else if(type === 'phone'){
                let value = event.target.value.replace(/\D/gi,'')
                this.setState({
                    phone:value
                })
            }else if(type === 'num'){
                let value = event.target.value.replace(/\D/gi,'')
                this.setState({
                    saleMoney:value
                })
            }
        }

        this.postInform = () => {
            if (this.state.saleMoney == '') {
                Tool.alert('请输入订单金额');
            }else if (this.state.name == '') {
                Tool.alert('请输入客户姓名');
            }else if (this.state.phone == ''||!/^1\d{10}$/.test(this.state.phone)) {
                Tool.alert('请输入正确的电话号码');
            }else{
                if (this.state.preventMountSubmit) {
                    this.state.preventMountSubmit == false;
                    this.props.getData('/api/user/'+this.state.saleMoney,{
                        sales_money:this.state.saleMoney,
                        customers_name :this.state.name,
                        customers_phone :this.state.phone},(res) => {
                        
                        Tool.alert(res);
                        this.setState({
                            saleMoney:'',
                            name:res.issuccess,
                            phone:'',
                            preventMountSubmit:true
                        })
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
            <div className="component_container index_module">
                
                <Header nav saleRecord title='成绩查询'/>
                <div className='index_tip'>
                    <span className='tip_text'>请录入您的信息</span>
                </div>

                <form className='form_style'>
                    <div className='input_container'>
                        <span className='input_descript'>学号：</span>
                        <input type="text" value={this.state.saleMoney} maxLength='7' placeholder='请输入学号' onChange={this.changeValue.bind(this,'num')}/>
                    </div>
                    <div className='input_container'>
                        <span className='input_descript'>姓名：</span>
                        <input type="text" value={this.state.name} placeholder='请输入姓名' onChange={this.changeValue.bind(this,'name')}/>
                    </div>
                    <div className='input_container'>
                        <span className='input_descript'>电话：</span>
                        <input type="text" maxLength='11' value={this.state.phone} placeholder='请输入电话' onChange={this.changeValue.bind(this,'phone')}/>
                    </div>
                </form>
                <div className='submit' onClick={this.postInform}>
                    提交
                </div>
                <span className='input_descript'>电话:{this.state.name}</span>
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

