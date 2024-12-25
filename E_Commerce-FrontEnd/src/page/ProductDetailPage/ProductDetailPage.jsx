import React from 'react'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetailPage = () => {
  const {id} =useParams()
  const navigate = useNavigate()  
  const handleTypeProduct=(Id) =>{
    navigate(`/type/${Id}`)
  }
  return (
    
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
      <div style={{marginTop: '130px'}}>
        <h5 style={{marginTop: '10px',fontSize: '15px', fontWeight: 'bold'}}>Trang chủ - Chi tiết sản phẩm</h5>
        <div style={{display:'flex', background:'#fff'}}>
          <ProductDetailComponent id={id}/>
        </div>
        <div style={{height:'100px'}}></div>
      </div>
       
    </div>
  )
}
export default ProductDetailPage
