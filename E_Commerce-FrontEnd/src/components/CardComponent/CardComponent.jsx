import {Card} from 'antd'
import {Flex,Tag} from 'antd'
import React from 'react'
import logo from '../../assets/images/logo.png'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText } from './style'
import {StarFilled} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
const CardComponent = (props) => {
  const {Name ,
    Quantity,
    Description,
    type_ID,
    Price ,
    Image, Id} =props
    console.log(Image)
  const navigate =useNavigate()
  const handleDetailsProduct=(id) =>{
    console.log(id)
    navigate(`/product-details/${id}`)
  }


  return (
    <WrapperCardStyle
            hoverable
            headStyle={{ width: '200px', height: '200px' }}
            style={{ width: 200 }}
            bodyStyle={{ padding: '8px' }}
            cover={<img src={Image} />}
            onClick={() => handleDetailsProduct(Id)}
        >
            <img
                src={Image}
                alt={Image}
                style={{
                    width: '68px',
                    height: '14px',
                    position: 'absolute',
                    top: -1,
                    left: -1,
                    borderTopLeftRadius: '3px'
                }}
            />
      <Flex gap="4px 0" wrap="wrap">
      </Flex>
    <StyleNameProduct>{Name}</StyleNameProduct>
      <WrapperReportText>
        <span style={{marginRight: '4px'}}>
          <span>{Description}</span>
        </span>
        <span>| Còn lại {Quantity}</span> 
      </WrapperReportText>
       <WrapperPriceText>
        <span style={{marginRight: '8px'}}>{Price.toLocaleString()}</span>
        <span>&#8363;</span>    
      </WrapperPriceText> 
    </WrapperCardStyle>
  )
}

export default CardComponent
