import React from 'react'
import { useParams } from 'react-router-dom'
import * as ProductService from  '../../services/ProductService.js'
import { useQuery } from '@tanstack/react-query'
import CardComponent from '../../components/CardComponent/CardComponent.jsx'
import { Col, Row } from 'antd'
import { WrapperProducts } from './style'
import { useNavigate } from 'react-router-dom'
const SearchPage = () => {

  const navigate =useNavigate()

  const handleTypeProduct=(Id) =>{
    navigate(`/type/${Id}`)
    window.location.reload();
  }
  const {data} =useParams()
  const dataType = {
    keyword: data
  }
  const getSearchProduct = async() => {
    const res = ProductService.searchProduct(dataType.keyword)
    return res
  }
   const { data : products} = useQuery({queryKey: ['products'], queryFn: getSearchProduct})
  return (
    <div style={{height: '1000px'}}>

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
    <div style={{marginTop: '100px',height: '100%',width: '100%', background: '#efefef'}}>
      <div style={{width: '1270', margin: '0 auto'}}>
        <Row style={{flexWrap: 'nowrap', paddingTop: '10px', display: 'flex', alignItems: 'center' }}>
          <Col span = {1}>
          </Col>
          <Col span = {22} style={{marginLeft:'30px',}}>
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
          <Col span = {1}>
          </Col>
        </Row>
      </div>
      <div style={{height:'50px'}}></div>
    </div>
    </div>
  )
}

export default SearchPage