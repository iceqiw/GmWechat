import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import pureRender from 'pure-render-decorator';
import { is, fromJS } from 'immutable';
import template from './template';
export { template }

/**
 * 公共头部
 *
 * @export
 * @class Header
 * @extends {Component}
 */


export class Header extends Component {  //头部标题
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    render() {
        let { title } = this.props;
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Brand</a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li className={title=="index"?'active':''}>
                                <IndexLink to="/index">
                                    <span>首页 </span>
                                </IndexLink></li>
                            <li className={title=="search"?'active':''}>
                                <Link to='/search'>
                                    <span>搜索</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}