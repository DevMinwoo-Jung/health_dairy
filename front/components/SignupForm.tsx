import { Button, Input, Form } from 'antd'
import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import useInput from 'libs/hook/useInput'
import { MdOutlineClose } from 'react-icons/md'
import { BUTTON_COLOR, WHITE } from 'libs/css/color'
import { useDispatch } from 'react-redux'
import { SIGN_UP_REQUEST } from 'reducers/user'

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
  width: 100%;
  height: 50px;
  border-radius: 12px;
  margin-bottom: 2rem;
  background-color: ${BUTTON_COLOR};
  color: ${WHITE};
  & :hover {
    background-color: ${BUTTON_COLOR};
    color: ${WHITE};
    font-weight: bolder;
  }
`

const InputStyle = styled(Input)`
  height: 50px;
  border-radius: 12px;
`

const InputPasswordStyle = styled(Input.Password)`
  height: 50px;
  border-radius: 12px;
`

const CloseButton = styled(MdOutlineClose)`
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`

export type SignupFormProps = {
  onSignup: () => void
}

const _SignupForm: FC<SignupFormProps> = (props) => {
  const { onSignup } = props

  const goSignup = () => {
    onSignup()
  }

  const onFinish = (values: any) => {
    console.log('Success:', values);
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }

  const dispatch = useDispatch()
  const [userId, onChangeUserId] = useInput('')
  const [email, onChangeEmail] = useInput('')
  const [nickname, onChangeNickname] = useInput('')
  const [password, onChangePassword] = useInput('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [passwordError, setPasswordError] = useState(false)

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value)
      setPasswordError(e.target.value !== password)
      // console.log(e.target.value)
      // console.log(password)
      console.log(e.target.value !== password)
    },
    [password, passwordCheck]
  );

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, userId, nickname }
    });
  }, [email, password, passwordCheck, nickname]);

  useEffect(() => {
    if (password !== passwordCheck) {
      setPasswordError(true)
    }
  }, [passwordCheck])

  return (
    <LoginFormContainer>
      <FormHeader>????????????</FormHeader>
      <CloseButton onClick={goSignup}/>
      <FormContainer>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="userId"
            rules={[{ required: true, message: '???????????? ??????????????????!' }]}
            >
            <InputStyle value={userId} onChange={onChangeUserId} placeholder='?????????'/>
          </Form.Item>
          <Form.Item
            name="nickname"
            rules={[{ required: true, message: '???????????? ??????????????????!' }]}
            >
            <InputStyle value={nickname} onChange={onChangeNickname} placeholder='?????????'/>
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: '????????? ????????? ????????? ????????????.' }]}
            >
            <InputStyle value={email} onChange={onChangeEmail} type='email' placeholder='?????????'/>
          </Form.Item> 
          <Form.Item
            name="password"
            rules={[{ required: true, message: '??????????????? ??????????????????!' }]}
            >
            <InputPasswordStyle value={password} onChange={onChangePassword} placeholder='????????????'/>
          </Form.Item>
          <Form.Item
            name="passwordCheck"
            required
            rules={[
              { required: passwordError, message: '??????????????? ???????????? ????????????' }]}
            >
            <InputPasswordStyle value={passwordCheck} onChange={onChangePasswordCheck} placeholder='???????????? ??????'/>
          </Form.Item>
          <ButtonStyle htmlType="submit">
              ????????????
          </ButtonStyle> 
        </Form>
      </FormContainer>
    </LoginFormContainer>
  )
}

const SignupForm = memo(_SignupForm)

export default SignupForm