import React, { FC, memo, useCallback, useEffect } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import styled from 'styled-components'
import Image from 'next/image'
import { IoLogoGoogle } from 'react-icons/io'
import useInput from 'libs/hook/useInput'
import { MdOutlineClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { LOG_IN_REQUEST, LOG_IN_SUCCESS } from 'reducers/user'
import { BUTTON_COLOR, WHITE } from 'libs/css/color'

const LoginFormContainer = styled.div`
  position: absolute;
  width: 320px;
  z-index: 10;
  left: 0;
  right: 0;
  top: 20%;
  vertical-align: middle;
  margin: auto;
  background-color: white;
  -webkit-box-shadow: 0px 0px 9px 1px #a8a8a8; 
  box-shadow: 0px 0px 9px 1px #a8a8a8;
  border-radius: 12px;
`

const FormHeader = styled.h1`
  margin-top: 1rem;
  font-weight: bolder;
`

const FormContainer = styled.div`
  margin: auto;
  width: 80%;
  position: relative;
`
const ButtonStyle = styled(Button)`
  margin-top: 1rem;
  width: 100%;
  height: 50px;
  border-radius: 12px;
  background-color: ${BUTTON_COLOR};
  color: ${WHITE};
  border-color: ${BUTTON_COLOR};
  & .ant-btn:hover, .ant-btn:focus, ::after {
    background-color: ${BUTTON_COLOR};
    color: ${WHITE};
    font-weight: bolder;
    font-size: 100rre;
  }
`
const ButtonPara = styled.p`
  position: absolute;
  font-size: 14px;
  width: 100%;
  font-weight: bolder;
`

const InputStyle = styled(Input)`
  height: 50px;
  border-radius: 12px;
`

const InputPasswordStyle = styled(Input.Password)`
  height: 50px;
  border-radius: 12px;
`

const KakaoLogin = styled.div`
  display: flex;
  width: 100%;
  background-color: #FEE500;
  border-radius: 12px;
  height: 50px;
  line-height: 50px;
  margin-bottom: 1rem;
  cursor: pointer;
  color: black;
`

const GoogleLogin = styled.div`
  width: 100%;
  display: flex;
  background-color: red;
  border-radius: 12px;
  height: 50px;
  line-height: 50px;
  cursor: pointer;
  color: white;
`

const ImgStyle = styled(Image)`
  border-radius: 12px;
`

const GoogleLogo = styled(IoLogoGoogle)`
  width: 25px;
  height: 25px;
  margin-left: 0.7rem;
  margin-top: 0.7rem;
  color: white;
`

const CheckboxStyle = styled(Checkbox)`
  position: absolute;
  left: 0;
  top: 0;
  margin-top: 1rem;
`

const CloseButton = styled(MdOutlineClose)`
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`

export type LoginFormProps = {
  onLogin: () => void
}

const _LoginForm: FC<LoginFormProps> = (props) => {
  const { onLogin } = props
  const { logInLoading, logInError, logInDone } = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const [userId, onChangeUserId] = useInput('')
  const [password, onChangePassword] = useInput('')

  const onSubmitForm = useCallback(() => {
    dispatch({
      type: LOG_IN_REQUEST,
      data: {userId, password}
    })
  }, [userId, password]);

  const onSocialLogin = useCallback((e) => {
    console.log(e.target)
  }, [])

  return (
    <LoginFormContainer>
      <FormHeader>?????????</FormHeader>
      <CloseButton onClick={onLogin}/>
      <FormContainer>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onSubmitForm}
          autoComplete="off"
        >
          <Form.Item
            name="userId"
            rules={[{ required: true, message: '???????????? ??????????????????!' }]}
          >
            <InputStyle name="userId" value={userId} onChange={onChangeUserId} placeholder='?????????' required />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '??????????????? ??????????????????!' }]}
          >
            <InputPasswordStyle name="userPassword" value={password} onChange={onChangePassword} placeholder='????????????' required />
          </Form.Item>
          <ButtonStyle htmlType="submit">
              ???????????????
            </ButtonStyle> 
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 0, span: 16 }}>
            <CheckboxStyle>????????? ?????? ??????</CheckboxStyle>
          </Form.Item>
        </Form>
      </FormContainer>
    </LoginFormContainer>
  )
}

const LoginForm = memo(_LoginForm)

export default LoginForm