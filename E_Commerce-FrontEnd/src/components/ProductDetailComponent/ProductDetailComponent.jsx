import React, { useState,useEffect } from 'react';
import { Image, Row, Col} from 'antd';
import * as ProductService from  '../../services/ProductService.js'
import {StarFilled,PlusOutlined,MinusOutlined, DownloadOutlined} from '@ant-design/icons'
import { InputNumber, Button } from 'antd';
import { MdLocationOn } from 'react-icons/md';
import { WrapperStyleImageSmall, WrapperStyleColImage, WrapperStyleNameProduct, WrapperStyleTextSell, WrapperPriceProduct, WrapperPriceTextProduct, WrapperAddressProduct, WrapperQualityProduct,WrapperButton, WrapperInputNumber } from './style'
import { useQuery } from '@tanstack/react-query';
import * as utills from '../../utills';
const ProductDetailComponent = (Id) => {
  const [quantity, setQuantity] = useState(1)
  const [ dataGlobe, setDataGlobe] = useState({
    Id: "", 
    Name: "", 
    Quantity: "", 
    Description: "", 
    PriceApply: "",
    Price: "", 
    Image: "",
  });

  const onChange = (newValue) => {
    setQuantity(newValue);
  }

  //let num = parseInt(id.id);

  const data = {
    Id : Id.id
  }
  
  const fetchGetDetailsProduct = async() => {
    const res = await ProductService.getDetailsProduct(Id.id)
    console.log(res.data)
    setDataGlobe(res.data[0]); 
  }

  const {data: productDetails} = useQuery({queryKey: ['product-details'], queryFn: fetchGetDetailsProduct})
  console.log(dataGlobe)
  const handleOk = () => {
    utills.deleteCart(dataGlobe.Id)
    const data = {
      Id : dataGlobe.Id,
      Quantity : quantity,
      remain: dataGlobe.Quantity,
      Image: dataGlobe.Image,
      PriceApply:dataGlobe.PriceApply,
      Name: dataGlobe.Name
    }
    utills.saveCart(data);
    const result = utills.getCart();
    
    console.log(result);
  }
  const giaOK=dataGlobe.PriceApply
  
  return (
      <Row style={{padding: '16px'}}>
        <Col span={14}>
          <Image style={{width: '600px', height:'600px'}}
           src={dataGlobe.Image} alt='image product' preview={false} />
          <div>
            <Row style={{paddingTop: '10px',justifyContent: 'space-between'}}>
            </Row>
          </div>
        </Col>
        <Col style={{paddingLeft: '40px '}} span={10}>
          <WrapperStyleNameProduct>{dataGlobe.Name}</WrapperStyleNameProduct>
          <div>
            <MdLocationOn size={20} color="black" />
            <WrapperStyleTextSell>   | Còn lại {dataGlobe.Quantity}</WrapperStyleTextSell>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>
              <span style={{marginRight: '8px'}}>{giaOK}</span>
              <span>&#8363;</span>
              </WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <WrapperAddressProduct>
            <span>Giao từ</span>
            <span className='address'>   97 Man Thiện, Phường Hiệp Phú, Thành Phố Thủ Đức   </span>
            
          </WrapperAddressProduct>
          <div style={{margin: '10px 0 20px', borderTop:' 1px solid #e5e5e5', borderBottom: ' 1px solid #e5e5e5'}}>
        <div style={{marginBottom: '9px', marginTop:'5px'}}>Số lượng</div>
        <InputNumber 
          min={1} 
          max={dataGlobe.Quantity} 
          defaultValue={1} 
          value={quantity} 
          onChange={onChange}
          disabled={dataGlobe.Quantity === 0}  // Vô hiệu hóa ô nhập số lượng nếu hết hàng
        />
      </div>
      <div style={{paddingTop: '20px', display: 'flex', alignItems:'center', gap: '12px'}}>
        {dataGlobe.Quantity > 0 ? (
          <Button 
            style={{ width: '220px', height: '50px', background: 'rgb(255,57,69)'}} 
            type="primary" 
            onClick={handleOk}
          >
            Chọn mua
          </Button>
        ) : (
          <span style={{color: 'red', fontWeight: 'bold'}}>Hết hàng</span>  // Hiển thị thông báo hết hàng
        )}
      </div>
        </Col>
      </Row>
    
  )
}

export default ProductDetailComponent