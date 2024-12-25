import React, { useState } from 'react'
import { Video, WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import axios from 'axios'
import * as message from '../../components/Message/Message'
import { useNavigate } from 'react-router-dom';


const SignInPage = () => {

  const [isShowPassword, setIsShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOnchangeName = (value) => {
    setName(value)
  }
  const handleOnchangePassword = (value) => {
    setPassword(value)
  }
  const handleSignIn = () => {
    const apiUrl = 'http://localhost:8082/staff/getuserPass';
    axios.get(apiUrl, {
      params: {
        Name: name,
        Password: password
      }
    })
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        setIsLoggedIn(true) //oke
        alert(" Đăng nhập thành công")
        navigate('/system/admin')
      } else {
        alert('Tài khoản hoặc mật khẩu sai! Vui lòng thử lại')
      }
    })
    .catch(error => {
      alert('Tài Khoản và Mật Khẩu bạn nhập không có trong hệ thống')
      // Xử lý lỗi hoặc hiển thị thông báo lỗi  
    })
  }

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh'}}>
      <div style={{width: '1000px', height: '600px', borderRadius: '6px', background: '#fff', display: 'flex'}}>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập bằng tài khoản Admin</p>
          <InputForm style={{marginBottom: '10px'}} placeholder='Username' value={name} onChange={handleOnchangeName} />
          <div style={{position: 'relative'}}>
            <span 
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '15px',
                right: '8px', 
              }}>{
                isShowPassword ? (
                  <EyeFilled/>
                ):(
                  <EyeInvisibleFilled/>
                )
              }
            </span>
              <InputForm 
                placeholder='password' type={isShowPassword ? "text" : "Password"} 
                value={password} onChange={handleOnchangePassword}
              />
          </div>
          <ButtonComponent
            disabled={!name.length || !password.length} //no active log in 
            onClick={handleSignIn}
            bordered ={false}
            size={40}
            styleButton={{
              background: 'rgb(255, 57, 69)',
              height: '48px',
              wdith: '100%',
              border: 'none',
              borderRadius: '4px',
              margin: '26px 0 10px'
            }}
            textButton={'Đăng nhập'}
            styleTextButton={{color: '#fff', fontSize: '15px', fontWeight: '700'}}
          >
          </ButtonComponent>
        </WrapperContainerLeft>
        <WrapperContainerRight>
        <Video src={require('../../assets/videos/login.mp4')} autoPlay loop muted />
        </WrapperContainerRight>
      </div>
    </div>
  )
}

export default SignInPage