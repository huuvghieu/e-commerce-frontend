import React from 'react'
import { Checkbox, Row, Col, Rate } from 'antd';

import { WrapperLabelText,WrapperTextValue , WrapperContent,WrapperTextPrice} from './style'
import { type } from '@testing-library/user-event/dist/type'
import { ColorFactory } from 'antd/es/color-picker/color';
import { useNavigate } from 'react-router-dom';
const NavbarComponent = () => {

    const onchange = () => { }

    const navigate =useNavigate()

    const handleReload = () => {
        window.location.reload();
    }

    const handleTypeProduct=(idloairem) =>{
        navigate(`/type/${idloairem}`)
        window.location.reload();
    }
    
    const renderContent =(type,options) => {
        switch (type){
            case 'text':
                return options.map((option) => {
                   return <WrapperTextValue>{option}</WrapperTextValue>
                    
                })
            case 'checkbox':
                return (
                <Checkbox.Group style={{width: '100%', display:'flex', flexDirection:'column'}} onChange={onchange}>
                    {options.map((option) => {
                        return (
                            <Checkbox value={option.value }>{option.label}</Checkbox>
                        )
                    })}
                </Checkbox.Group>
            )
            case 'star':
                 
                return options.map((option) => {
                    console.log('check',option)
                    return (
                        <div style={{display:'flex'}}>
                            <Rate style={{fontSize: '12px'}} disabled defaultValue={option} />
                            <span>{`tu ${option} sao`}</span>
                        </div>
                    )
                 })
            case 'price':
                 
                return options.map((option) => {
                    
                    return (
                        <WrapperTextPrice>
                            {option}
                        </WrapperTextPrice>
                    )
                 })     
            // eslint-disable-next-line no-fallthrough
            default:
                return   {}
        }
    }

    return (
    <div style={{background: '#fff'}}>
        <WrapperLabelText>Danh mục</WrapperLabelText>
        < WrapperContent>
            <span style={{cursor: 'pointer', fontSize:'15px', marginRight:'60px'}} onClick={() => handleTypeProduct("SACHKINHDI")}>
            Sách Kinh Dị
            </span>
            <span style={{cursor: 'pointer', fontSize:'15px', marginRight:'60px'}} onClick={() => handleTypeProduct("SACHTINHCAM")}>
            Sách Tình Yêu
            </span>
            <span style={{cursor: 'pointer', fontSize:'15px', marginRight:'60px'}} onClick={() => handleTypeProduct("SACHVIENTUONG")}>
            Sách Viễn Tưởng
            </span>
            <span style={{cursor: 'pointer', fontSize:'15px', marginRight:'60px'}} onClick={() => handleTypeProduct("BUTBI")}>
            Bút Bi
            </span>
            <span style={{cursor: 'pointer', fontSize:'15px', marginRight:'60px'}} onClick={() => handleTypeProduct("BUTCHI")}>
            Bút Chì
            </span>
            <span style={{cursor: 'pointer', fontSize:'15px', marginRight:'60px'}} onClick={() => handleTypeProduct("THUOC")}>
            Thước
            </span>
            <span style={{cursor: 'pointer', fontSize:'15px', marginRight:'60px'}} onClick={() => handleTypeProduct("GOM")}>
            Gôm
            </span>
            <span style={{cursor: 'pointer', fontSize:'15px', marginRight:'60px'}} onClick={() => handleTypeProduct("HOPBUT")}>
            Hộp Bút
            </span>
            <span style={{cursor: 'pointer', fontSize:'15px', marginRight:'60px'}} onClick={() => handleTypeProduct("CAP")}>
            Cặp
            </span>
            
        </WrapperContent>  
    </div>
  )
}

export default NavbarComponent
