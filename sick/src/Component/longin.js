import React , {Component} from "react"
import "../asset/css/login.scss"

import {Button , Input , Radio} from "element-react"

import {connect} from "react-redux"

import {markOnload} from "../actions/counter"

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tip: false
        }
    }

    toRegOrOnload(tip) {
        this.setState({
            tip,
        })
    }

    render() {
        const { tip } = this.state
        if (!tip) {
            return (
                <div className="onloadPage">
                    <div className="loadBackground"></div>
                    <div className="load">
                        <div className="onloadBox">
                            <p>Login</p>
                            <div className="input">
                                <div className="username">
                                    <span>username</span>
                                    <div className="usernameInput">
                                        <Input placeholder="username:" icon="edit"></Input>
                                    </div>
                                </div>
                                <div className="passworld">
                                    <span>passworld</span>
                                    <div className="usernameInput">
                                        <Input placeholder="passworld:" icon="edit"></Input>
                                    </div>
                                </div>
                                <div className='choose'>
                                    <div>
                                        <Radio value="9">记住密码</Radio>
                                    </div>
                                    <div className="forget">
                                        <span>忘记密码?</span>
                                    </div>
                                </div>
                                <div className="onloadBtn">
                                    <Button onClick={() => this.props.markOnload()}>Verify</Button>
                                </div>
                                <div className="registe">
                                    <div></div>
                                    <div>
                                        <span>还没有账户？</span>
                                        <span style={{ color: '#8793F2' }} onClick={() => { this.toRegOrOnload(true) }}>注册</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="onloadPage">
                    <div className="loadBackground"></div>
                    <div className="load">
                        <div className="onloadBox">
                            <p>Re</p>
                            <div className="input">
                                <div className="username">
                                    <span>username</span>
                                    <div className="usernameInput">
                                        <Input placeholder="username:" icon="edit"></Input>
                                    </div>
                                </div>
                                <div className="passworld">
                                    <span>passworld</span>
                                    <div className="usernameInput">
                                        <Input placeholder="passworld:" icon="edit"></Input>
                                    </div>
                                </div>
                                <div className="onloadBtn">
                                    <Button onClick={() => this.props.markOnload()}>Re</Button>
                                </div>
                                <div className="registe">
                                    <div></div>
                                    <div>
                                        <span>已有账户？</span>
                                        <span style={{ color: '#8793F2' }} onClick={() => { this.toRegOrOnload(false) }}>登录</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const getcounter= state=>{
    return {
      counter : state.counter
    }
  }
  
  const onload = dispatch=>{
    return{
      markOnload(){
        dispatch(markOnload())
      }
    }
  }

export default connect(getcounter , onload)(Login )