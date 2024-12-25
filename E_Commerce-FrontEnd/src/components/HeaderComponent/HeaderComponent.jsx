import React, { useState } from 'react'
import { Badge, Col, Input} from 'antd';
import { WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './style';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useDispatch } from 'react-redux';
import * as utills from '../../utills';
import { useNavigate } from 'react-router-dom';
import {
  PhoneOutlined,
  ShoppingCartOutlined,
  LoginOutlined
} from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import '../HeaderComponent/style.css';

const HeaderComponent = () => {
  const navigate = useNavigate()
  const [stateInput, setStateInput]=useState('')
  const dispatch =useDispatch()
  const [search, setSearch] =useState('')

  const handleNavigateLogin = () => {
    navigate('/admin')
  }
  const handleNavigateMain = () => {
    navigate('/')
  }
  const handleNavigatecCart = () => {
    navigate('/cart')
  }
  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Chuyển hướng khi ấn Enter
      navigate(`/search/${stateInput}`)
      window.location.reload();
    }
  }
   
  const onSearch =(e) =>{
    setStateInput(e.target.value)
  }
  const num = utills.getCart()
  const cartCount = num.length
 
  return (
    <div className="header-container" style={{width: '100%', background:'rgb(185, 149,, 115)', display:'flex', justifyContent:'center'}}>
      <WrapperHeader>
        <Col span={5} style={{display: 'flex', gap:'20px', alignItems:'center', marginLeft: '40px'}}>
            <div onClick={handleNavigateMain} style={{cursor: 'pointer'}}>
              <WrapperTextHeader>Nhà Sách Tuấn Minh</WrapperTextHeader>
            </div>
        </Col>
        <Col span={13}>
          <Input
              placeholder="nhập từ khóa tìm kiếm"
              style={{backgroudColor: '#fff', borderRadius: '4px 0 0 4px'}}
              onChange={onSearch}
              onKeyDown={handleInputKeyDown}
          />
        </Col>
        <Col span={6} style={{display: 'flex', gap:'54px', alignItems:'center'}}>
          { <WrapperHeaderAccount>
            <LoginOutlined style={{fontSize: '30px'}} onClick={handleNavigateLogin}/>
            <div>
              <WrapperTextHeaderSmall style={{fontSize: '13px'}}>Đăng nhập</WrapperTextHeaderSmall>
              <div>
                <WrapperTextHeaderSmall style={{fontSize: '13px'}}>Cho nhân viên</WrapperTextHeaderSmall> 
              </div>
            </div>
          </WrapperHeaderAccount>}
          <div>
            <Badge count={cartCount} size='small'>
              <ShoppingCartOutlined style={{cursor: 'pointer',fontSize: '30px', color: 'rgb( 150, 71, 52)'}}
               onClick={handleNavigatecCart}/>  
            </Badge>
            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  )
} 

export default HeaderComponent