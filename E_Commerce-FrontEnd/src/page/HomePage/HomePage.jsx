import React from 'react'
import { TypeProduct } from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
import s1 from '../../assets/images/s1.png'
import s2 from '../../assets/images/s2.png'
import s3 from '../../assets/images/s3.png'
import s4 from '../../assets/images/s4.png'
import s5 from '../../assets/images/s5.png'
import { useEffect, useState } from 'react'
import '../HomePage/style.css';
import SliderComponent from '../../components/SliderComponent/SliderComponet'
import CardComponent from '../../components/CardComponent/CardComponent.jsx'
import * as ProductService from  '../../services/ProductService.js'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const HomePage = () => {

  const navigate =useNavigate()

  const handleTypeProduct=(Id) =>{
    navigate(`/type/${Id}`)
  }
  const getAllProducts = async() => {
    const res = await ProductService.getAllProduct()
    console.log(res)
    return res
  }
  const { data : products} = useQuery({queryKey: ['products'], queryFn: getAllProducts})

  const [blobUrls, setBlobUrls] = useState({});

  const bufferToBlob = (buffer) => {
    return new Blob([new Uint8Array(buffer)], { type: 'image/jpeg' });
  };
  
  const createBlobUrl = (blob) => {
    return URL.createObjectURL(blob);
  };



  useEffect(() => {
    const fetchBlobUrls = async () => {
      if (products) {
        const urls = {};
        for (let product of products) {
          try {
            // Chuyển đổi mảng byte thành Blob
            const blob = bufferToBlob(product.Image.data);
            // Tạo URL blob từ Blob
            const url = createBlobUrl(blob);
            urls[product.Id] = url;
            console.log(url);
          } catch (error) {
            console.error(`Error fetching image for product ${product.Id}:`, error);
            // Sử dụng hình ảnh dự phòng nếu fetch thất bại
          }
        }
        setBlobUrls(urls);
        console.log(blobUrls)
        
      }
    };
    fetchBlobUrls();
  }, [products]);



  return (
    <>
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
        <div className='body' style={{ width: '100%', backgroundColor: '#efefef', }}>
        <div id="container" style={{ height: '100%', width: '1600px', margin: '0 auto' }}>
          <SliderComponent arrImages={[s1, s2, s3, s4, s5]} />
          <WrapperProducts>
            {products?.map((product) => {
              return (
                <CardComponent
                  Name = {product.Name}
                  Quantity = {product.Quantity}
                  Description = {product.Description}
                  type_ID = {product.type_ID}
                  Price = {product.PriceApply}
                  Image = {product.Image }
                  Id ={product.Id}
                />
              )
            })}
          </WrapperProducts>
            <div style={{width: '100%', display: 'flex', justifyContent:'left', marginTop: '10px'}}>
              <div style={{height:'50px'}}></div>
            </div>
          </div>
          </div>
    </>
  )
}

export default HomePage