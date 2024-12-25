import React, { useEffect, useState } from 'react'
import { WrapperLeft, WrapperRight, WrapperInfo, WrapperTotal,WrapperCountOrder, WrapperItemOrder, WrapperListOrder, WrapperInputNumber} from './style'
import { Button, Form, Select } from 'antd'
import { DeleteOutlined, MinusOutlined, PlusOutlined} from '@ant-design/icons'
import ModalComponent from '../../components/ModalComponent/ModalComponent'
import InputComponent from '../../components/InputComponent/InputComponent'
import * as utills from '../../utills';
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'antd/es/form/Form'
import * as OrderService from  '../../services/OrderService'
import * as ProductService from  '../../services/ProductService'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
  const [stateCart, setStateCart] =useState('')
  const [cartItems, setCartItems] = useState([])
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
  const [stateOrder, setStateOrder] = useState({
    email: "", 
    address: "", 
    phone: "", 
    total: "",
    IDstatus: "4", 
    IDpayment: "", 
    procs: "",
  })
  const [ dataStorage, setDataStorage] = useState({
   
    Id : "", 
    Quantity : "", 
    remain: "",
    Image: "", 
    PriceApply: "", 
    Name: "",
  });

  const [form] = Form.useForm();


  const navigate =useNavigate()


  const handleTypeProduct=(Id) =>{
    navigate(`/type/${Id}`)
  }


  const loadLocalStorage =() =>{
    const res = utills.getCart()
    return res
  }
  const handleChangeQuantity =(newValue) =>{
    setQuantity(newValue)
  }
 
 
  const handleConfirmQuantity = ( Id , remain, Image, PriceApply, Name) => {
    utills.deleteCart(Id)
    const data = {
      Id : Id,
      Quantity : quantity,
      remain: remain,
      Image: Image,
      PriceApply:PriceApply,
      Name: Name,
    }
    utills.saveCart(data);
    window.location.reload();
  }

  const handleZaloPay = (e) => {
    const data ={
      listproc : stateOrder.procs,
      total : stateOrder.total
    }
      
    console.log(data)
  }

  const handleOnSelect = (value) => {
    setStateOrder({
      ...stateOrder,
      IDpayment: value
    });
    
    console.log(value)
    if (value === '1') { // ZaloPay selected
      // Trigger ZaloPay action
      const data ={
        items : localData,
        total : totalPrice
      }
      OrderService.payment(data).then(response => {
        console.log(response);
        console.log(response.order_url)
        window.open(response.order_url, '_blank');
      
      }).catch(error => {
        console.log("Sever không phản hồi");
      });
      console.log(data)
    }
  };

  const loadCartItems = () => {
    const cartData = utills.getCart();
    setCartItems(cartData || []);
  };
 
  const {data: localData} = useQuery({queryKey: ['local-storage'], queryFn: loadLocalStorage})
  console.log(localData)


  const calculateTotalPrice = () => {
    if (!localData || localData.length === 0) {
      return 0;
    }
  
    return localData.reduce((acc, currentItem) => {
      return acc + (currentItem.Quantity * currentItem.PriceApply);
    }, 0);
  };
  
  const totalPrice = calculateTotalPrice();

  const handleOnChange =(e) => {
    setStateOrder({
      ...stateOrder,
      [e.target.name] : e.target.value
    })
    console.log('e.target.name: ', e.target.name, e.target.value );
  }


  const handleConfirmOrder =() =>{
    stateOrder.total = totalPrice;
    if (localData && localData.length > 0){
      setStateOrder((prevState) => ({
        ...prevState,
        procs: localData,
      }));
      console.log(stateOrder)
      if (stateOrder && stateOrder.procs.length > 0){
        console.log(stateOrder)
        OrderService.addOrder(stateOrder).then(res => {
          alert(" Thành công")
          setIsModalOpen(false)
          window.location.reload();
          localStorage.clear();
        }).catch(error => {
          alert(" Thất Bại")
        });
      }
    }
  }
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleCancel =() =>{
    setIsModalOpen(false)
  }
  const handleOK = async () => {
    setIsModalOpen(false)
  };
  const handleReload = async () => {
    window.location.reload();
  }

  return (
    <div style={{background: '#f5f5fa', with: '100%', height: '100%'}}>
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
      <div>
        <div style={{width:'1900px', height: '50px', fontSize:'25px', alignContent:'center', display:'flex',justifyContent:'center'  }}>
        </div>
        <div style={{fontSize:'25px', alignContent:'center', display:'flex',justifyContent:'center', marginBottom:'50px'}}>
          Giỏ hàng của bạn
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', height: '100%'}}>
          <WrapperLeft>
          <WrapperListOrder>  
          {localData?.map((cart) => {
              return (
            <WrapperItemOrder>
                <div style={{width: '390px', display: 'flex', alignItems: 'center', gap: 4}}> 
                  <img src={cart.Image} style={{width: '77px', height: '79px', objectFit: 'cover'}}/>
                  <div style={{
                    width: 260,
                    overflow: 'hidden',
                    textOverflow:'ellipsis',
                    whiteSpace:'nowrap',
                    fontSize:'15px',
                    marginLeft: '8px'
                  }}>{cart.Name}</div>
                </div>
                <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <span>
                    <span style={{ fontSize: '17px', color: '#242424' }}>{cart.PriceApply}</span>
                  </span>
                  <WrapperCountOrder>
                    <WrapperInputNumber 
                      
                      defaultValue={cart.Quantity} 
                      size="small" min={1}
                      max={cart.remain} 
                      onChange={handleChangeQuantity}
                    />
                    <Button 
                      style={{padding:'1px', height:'25px', width: '70px', marginLeft:'2px'}} 
                      onClick={() => handleConfirmQuantity(cart.Id, cart.remain, cart.Image, cart.PriceApply, cart.Name)}
                    >
                      Xác nhận
                    </Button>
                  </WrapperCountOrder>
                  
                  <span style={{color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500}}>{cart.remain}</span>
                  <DeleteOutlined style={{cursor: 'pointer'}}
                  onClick={() => {
                    utills.deleteCart(cart.Id);
                    window.location.reload();
                  }} />
                </div>
              </WrapperItemOrder>
               )
            })}  
          </WrapperListOrder>
          </WrapperLeft >
          <WrapperRight>
              <div style={{width: '100%'}}>
                <WrapperInfo>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight:'bold', fontSize: '15px'}}>
                    <span>Thông tin đơn hàng</span>
                  </div>
                </WrapperInfo>
                <WrapperTotal>
                  <span>Tổng tiền</span>
                  <span style={{display:'flex', flexDirection: 'column'}}>
                    <span style={{color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold'}}>{totalPrice.toLocaleString()}</span>
                    <span style={{color: '#000', fontSize: '11px'}}>(Đã bao gồm VAT nếu có)</span>
                  </span>
                </WrapperTotal>
              </div>
              <Button
                type="primary"
                style={{
                    background: 'rgb(255, 57, 69)',
                    height: '48px',
                    width: '320px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
                onClick={() => setIsModalOpen(true)}
              >
                Thanh toán
              </Button>
          </WrapperRight>
        </div>
      </div>
      <div style={{height: '50px'}}>

      </div>
      <ModalComponent title="Thêm thông tin giao hàng" open={isModalOpen} onOk={handleConfirmOrder} onCancel={handleCancel}  width="40%">
          <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: 600 }}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Địa chỉ EMAIL"
            name="email"
            rules={[
              { required: true, message: 'Không Được Bỏ Trống!' },
              {
                pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Địa chỉ email không hợp lệ!',
              },
            ]}
          >
            <InputComponent value={stateOrder.email} onChange={handleOnChange} name="email" />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: 'Không Được Bỏ Trống!' }]}
          >
            <InputComponent value={stateOrder.address} onChange={handleOnChange} name='address' />
          </Form.Item >

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: 'Không Được Bỏ Trống!' },
              {
                pattern: /^(0?\d{9}|0?\d{10})$/,
                message: 'Số điện thoại không hợp lệ!',
              },
            ]}
          >
            <InputComponent value={stateOrder.phone} onChange={handleOnChange} name='phone' />
          </Form.Item>

          <Form.Item
            label="Hình thức thanh toán"
            name="IDpayment"
            rules={[{ required: true, message: 'Không Được Bỏ Trống!' }]}
          >
            <Select value={stateOrder.IDpayment} onChange={handleOnSelect}
              options={[
                {
                  value: '1',
                  label: 'ZaloPay',
                },
                {
                  value: '2',
                  label: 'Thanh toán khi nhận hàng (COD)',
                },
              ]}
              />
          </Form.Item>
          </Form>
      </ModalComponent>
    
    </div>
  )
}

export default Cart