import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './login.less';
import logo from './images/logo.jpg';

const Item = Form.Item; //不能写在import前面

class Login extends Component{

    handleSubmit = (event) => {
        // 阻止事件的默认行为
        event.preventDefault();
        // 对所有的表单字段进行检验
        this.props.form.validateFields((err, values) => {
            if (!err) {//校验成功
              console.log('提交登录的Ajax请求: ', values)
            } else {
                console.log('校验失败!')
            }
          });
        // 得到from对象
        const form = this.props.form;
        // 获取表单项的输入数据
        const values = form.getFieldsValue()
        
        console.log('handleSubmit()', values)
        
    }

    /*对密码进行自定义验证 */
    validatePwd = (rule, value, callback) => {
        console.log('validatePwd()', rule, value);
        if(!value){
            callback('密码不能为空!')
        }else if(value.length < 4){
            callback('密码字符长度不能少于4位!')
        }else if(value.length > 12){
            callback('密码字符长度不能大于12位!')
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须是以字母、数字和下划线组成!')
        }
        callback();
    }
    render(){

        const form = this.props.form;
        const { getFieldDecorator } = form;

        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>信息 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Item>
                            {
                                getFieldDecorator('username',{ //配置对象:属性名是一些特定的名称
                                    rules: [
                                        { required: true, whitespace: true, message: '请输入您的用户名!' },
                                        { min: 4, message: '用户名至少是4位字符!' },
                                        { max: 12, message: '用户名最多是12位字符!' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是以字母、数字和下划线组成!' },
                                    ],
                                })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />,
                                )
                            }
                            </Item>
                            <Item>
                            {
                                getFieldDecorator('password',{
                                    rules: [{ validator: this.validatePwd }],
                                })(
                                <Input 
                                    type="password"
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="密码" 
                                />,
                                )
                            }
                            </Item>
                            <Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>记住账号</Checkbox>)}
                            <a className="login-form-forgot" href="">
                                忘记密码
                            </a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                            或者 <a href="">立即注册</a>
                            </Item>
                        </Form>
                </section>
            </div>
        )
    }
}

const WrapLogin = Form.create()(Login);

export default WrapLogin;
