import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Icon, message, Spin } from "antd";
import { Button } from 'ss-ui-library'
import SInput from '@/components/Input'
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import { useHistory } from 'react-router-dom';
import style from "./index.module.less";
import { login, getUserInfo } from "@/store/actions";
//assets
import images from '@/assets/images'



const Login = (props) => {
  const { form, token, login, getUserInfo } = props;
  const { getFieldDecorator } = form;
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleLogin = (username, password) => {
    // 登录完成后 发送请求 调用接口获取用户信息
    setLoading(true);
    login(username, password)
      .then((data) => {
        console.log('token:', data)
        message.success("登录成功");
        handleUserInfo(data.token);
      })
      .catch((error) => {
        setLoading(false);
        message.error(error);
      });
  };

  // 获取用户信息
  const handleUserInfo = (token) => {
    getUserInfo(token)
      .then((data) => {
        history.push({
          pathname: '/'
        })
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const handleSubmit = (event) => {
    // 阻止事件的默认行为
    event.preventDefault();

    // 对所有表单字段进行检验
    form.validateFields((err, values) => {
      // 检验成功
      if (!err) {
        const { username, password } = values;
        handleLogin(username, password);
      } else {
        console.log("检验失败!");
      }
    });
  };

  if (token) {
    return <Redirect to={'/'} />;
  }
  return (
    <DocumentTitle title={"用户登录"}>
      <div className={style.loginContainer}>
        <div className={style.loginFormContainer} style={{ backgroundImage: `url(${images.login})` }}>
          <img src={images.loginLogo} alt="登录logo 暗色主题" className={style.logoImage} />
          <Form onSubmit={handleSubmit} className={style.content}>
            <Spin spinning={loading} tip="登录中...">
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: "请输入用户名",
                    },
                  ],
                  initialValue: "admin", // 初始值
                })(
                  <SInput
                    style={{ height: '40px', width: '240px' }}
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="用户名"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: "请输入密码",
                    },
                  ],
                  initialValue: "123456", // 初始值
                })(
                  <SInput
                    style={{ height: '40px', width: '240px' }}
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="密码"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  style={{width: '240px'}}
                  type="primary"
                  htmlType="submit"
                  basic
                  className={style.loginFormButton}
                >
                  登录
                </Button>
              </Form.Item>
              <div className={style.footerInfo}>忘记密码?</div>
              <div className={style.footerInfo}>联系我们 400-119-9898</div>
            </Spin>
          </Form>
          <div className={style.loginTitleTop}>
            NEW
          </div>
          <div className={style.loginTitleBottom}>
            STILL ME
          </div>
        </div>
      </div>
    </DocumentTitle>
  );
};

const WrapLogin = Form.create()(Login);

export default connect((state) => state.user, { login, getUserInfo })(
  WrapLogin
);
