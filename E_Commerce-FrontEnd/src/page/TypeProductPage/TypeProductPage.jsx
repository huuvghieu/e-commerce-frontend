import React, { Fragment } from 'react'
import CardComponent from '../../components/CardComponent/CardComponent'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import { Row, Col } from 'antd'
import * as ProductService from  '../../services/ProductService.js'
import { WrapperProducts, WrapperNavbar } from './style'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const TypeProductPage = () => {
  const {id} =useParams()
  console.log(id)
  const navigate = useNavigate()

  const handleTypeProduct=(Id) =>{
    navigate(`/type/${Id}`)
    window.location.reload();
  }
  const onChange = () => { }
  const dataType = {
    type_ID: id
  }
  console.log(dataType)
  console.log(dataType.type_ID)

  const getTypeProduct = async() => {
    const res = ProductService.getType(dataType.type_ID)
    return res
  }
   const { data : products} = useQuery({queryKey: ['products'], queryFn: getTypeProduct})
   console.log(products)

  return (
    <div style={{height: '1000px'}}>
      <div style={{padding: '10px 120px', background: '#efefef'}}>
      <div className="header-container" style={{textAlign: 'center', width: '1600px', marginTop: '52px', height: '20px'}}>
        <span style={{marginTop: '10px', marginLeft : '-50px',cursor: 'pointer', fontSize:'20px', marginRight:'60px'}} onClick={() => handleTypeProduct("SACHKINHDI")}>
          Sách Kinh Dị
        </span>
        <span style={{marginTop: '10px', cursor: 'pointer', fontSize:'20px', marginRight:'60px'}} onClick={() => handleTypeProduct("SACHTINHCAM")}>
          Sách Tình Yêu
        </span>
        <span style={{marginTop: '10px', cursor: 'pointer', fontSize:'20px', marginRight:'60px'}} onClick={() => handleTypeProduct("SACHVIENTUONG")}>
          Sách Viễn Tưởng
        </span>
        <span style={{marginTop: '10px', cursor: 'pointer', fontSize:'20px', marginRight:'60px'}} onClick={() => handleTypeProduct("BUTBI")}>
          Bút Bi
        </span>
        <span style={{marginTop: '10px', cursor: 'pointer', fontSize:'20px', marginRight:'60px'}} onClick={() => handleTypeProduct("BUTCHI")}>
          Bút Chì 
        </span>
        <span style={{marginTop: '10px', cursor: 'pointer', fontSize:'20px', marginRight:'60px'}} onClick={() => handleTypeProduct("THUOC")}>
          Thước
        </span>
        <span style={{marginTop: '10px', cursor: 'pointer', fontSize:'20px', marginRight:'60px'}} onClick={() => handleTypeProduct("GOM")}>
          Gôm
        </span>
        <span style={{marginTop: '10px', cursor: 'pointer', fontSize:'20px', marginRight:'60px'}} onClick={() => handleTypeProduct("HOPBUT")}>
          Hộp Bút
        </span>
        <span style={{marginTop: '10px', cursor: 'pointer', fontSize:'20px', marginRight:'60px'}} onClick={() => handleTypeProduct("CAP")}>
          Cặp
        </span>
        
        </div> 
      </div>
      <div style={{marginTop: '80px',height: '100%',width: '100%', background: '#efefef'}}>
        <div style={{width: '1270', margin: '0 auto'}}>
          <Row style={{flexWrap: 'nowrap', paddingTop: '10px' }}>
            <WrapperNavbar spam = {4}>
                <NavbarComponent/>
            </WrapperNavbar>  
            <Col span = {20} style={{marginLeft:'30px'}}>
              <WrapperProducts>
                {products?.map((product) => {
                  return (
                    <CardComponent
                      Name = {product.Name}
                      Quantity = {product.Quantity}
                      Description = {product.Description}
                      type_ID = {product.type_ID}
                      Price = {product.PriceApply}
                      Image = {product.Image}
                      Id ={product.Id}
                    />
                  )
                })}
              </WrapperProducts>
            </Col>
          </Row>
        </div>
        <div style={{height:'50px'}}></div>
      </div>
    </div>
  )
}

export default TypeProductPage