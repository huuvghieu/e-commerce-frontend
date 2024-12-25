import React, { useEffect, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button , Modal,  Form, Select, message } from 'antd'
import{
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
}from'@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64 } from '../../utills'
import * as ProductService from  '../../services/ProductService.js'
import {useMutationHooks} from '../../hook/useMutationHooks.js'
import Loading from '../../components/LoadingComponent/LoadingComponent.jsx'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent.jsx'
import ModalComponent from '../ModalComponent/ModalComponent.jsx'
import InputComponentPro from '../InputComponent/InputComponentPro.jsx'
import '../Product/style.css'

  
const Product = () => {
  const [content, setContent]=useState('')
  const [rowSelected, setRowSelected] =useState('')
  const [rowNameSelected, setNameRowSelected] =useState('')
  const [rowQuantitySelected, setrowQuantitySelected] =useState('')
  const[rowDescriptionSelected, setrowDescriptionSelected] =useState('')
  const[rowPriceSelected, setrowPriceSelected] =useState('')
  const[rowTypeSelected, setrowTypeSelected] =useState('')
  const[rowIamgeSelected, setrowSImageSelected] =useState('')
  const [fileList, setFileList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false)
  const [form] = Form.useForm();

  const [stateProduct, setstateProduct] = useState({
    Name: "", 
    Quantity: "", 
    Description: "", 
    Price: "", 
    type_ID:"",
    Image: "1", 
    
    
  });
  const [stateProductUpdate, setstateProductUpdate] = useState({
    Id: "", 
    Name: "", 
    Quantity: "", 
    Description: "", 
    Price: "", 
    type_ID:"",
    Image: "", 
  });
  
  const handleOnChange =(e) => {
    setstateProduct({
      ...stateProduct,
      [e.target.name] : e.target.value
    })
    console.log('e.target.name: ', e.target.name, e.target.value );
  }

  const handleOnChangeUpdate =(e) => {
    setstateProductUpdate({
      ...stateProductUpdate,
      [e.target.name] : e.target.value
    })
    console.log('e.target.name: ', e.target.name, e.target.value );
  }

  const handleOnSelect = (value) => {
    setstateProduct({
      ...stateProduct,
      type_ID: value
    });
    console.log('type_ID: ',  value);
  };
 

  const handleOnSelectUpdate = (value) => {
    setstateProductUpdate({
      ...stateProductUpdate,
      type_ID: value
    });
    console.log('type_ID: ',  value);
  };


  const mutation = useMutationHooks(
    (data) => {
      const { Name ,
        Quantity,
        Description,
        type_ID,
        Price ,
        Image} = data
      ProductService.createProduct({ Name ,
        Quantity,
        Description,
        type_ID,
        Price ,
        Image,
      }).then(res => {
        alert(" Thành công")
        setIsModalOpen(false)
        window.location.reload();
      }).catch(error => {
        alert(" Thất Bại")
        setIsModalOpen(false)
      });
      
    }
  )
  const mutationUpdate = useMutationHooks(
    (data) => {
      const { Id,
        Name ,
        Quantity,
        Description,
        type_ID,
        Price ,
        Image,} = data
      ProductService.updateProduct({ Id,
        Name ,
        Quantity,
        Description,
        type_ID,
        Price ,
        Image, 
      }).then(res => {
        alert(" Thành công")
        setIsModalOpen(false)
        window.location.reload();
      }).catch(error => {
        console.error("Lỗi cập nhật sản phẩm:", error);
        alert(" Thất Bại")
        
      })
    }
  )

  const getAllProducts = async() => {
    const res = await ProductService.getAllProduct()
    return res
  }

  const handleDeleteProduct =() =>{
    const data = {
      Id: rowSelected
    }
    console.log(data);

    ProductService.deleteProduct2(data.Id).then(res => {
      alert(" Thành công")
      setIsModalOpenDelete(false)
      window.location.reload();
    }).catch(error => {
      alert(" Thất Bại")
      console.error("Lỗi xóa sản phẩm:", error);
      setIsModalOpenDelete(false)
    });

  }

  const {data, isLoading, isSuccess, isError} = mutation

  const {isLoading : isLoadingProducts, data : products} = useQuery({queryKey: ['products'], queryFn: getAllProducts})
  const renderAction =() =>{
    return(
      <div>
        <DeleteOutlined style={{color:'red', fontSize: '30px', cursor:'pointer',marginRight:'10px'}} onClick={() => setIsModalOpenDelete(true)}/>
        <EditOutlined style={{color:'yellow', fontSize: '30px', cursor:'pointer'}} onClick={() => setIsModalOpenUpdate(true)}/>
      </div>
    )
  }
  const columns = [
    {
        title: 'Id',
        dataIndex: 'Id',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Tên Sản Phẩm',
        dataIndex: 'Name',
    },
    {
        title: 'Mô tả',
        dataIndex: 'Description',
    },
    {
      title: 'Số lượng',
      dataIndex: 'Quantity',
    },
    {
      title: 'Giá Áp Dụng',
      dataIndex: 'PriceApply',
    },
    {
      title: 'Giá',
      dataIndex: 'Price',
    },
    {
      title: 'Tùy chọn',
      dataIndex: 'tuychon',
      render: renderAction  
    },
    
    ]
    const dataTable = products?.length && products?.map((product) => {
      return {...product, key: product._id}
    })

  const onFinish = () => {
    mutation.mutate(stateProduct)
    console.log('finished', stateProduct)
  }
  const onFinishUpdate = () => {
    mutationUpdate.mutate(stateProductUpdate)
    console.log('finishedUpdate', stateProductUpdate)
  }
  
  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    onFinish()
  }

  const handleOkUpdate = () => {
    onFinishUpdate()
  }


  const handleCancelDelete= () =>{
    setIsModalOpenDelete(false)
  } 
  const handleCancelUpdate= () =>{
    setIsModalOpenUpdate(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setstateProduct({
      Name: "", 
    Quantity: "", 
    Description: "", 
    Price: "", 
    type_ID:"",
    Image: "", 
    })
    form.resetFields()
  };
  const [image, setimage] = useState([]);

  const handleUploadChange = async ( e ) => {
    
    console.log(e.target.files[0].name)
    const file = 'http://localhost:3000/image/' + e.target.files[0].name
    console.log(file)
    stateProduct.Image = file
    console.log(stateProduct)
  };
  
  const handleUploadChangeUpdate = async ( e ) => {
    
    console.log(e.target.files[0].name)
    const file = 'http://localhost:3000/image/' + e.target.files[0].name
    console.log(file)
    
    stateProductUpdate.Image = file
    console.log(stateProduct)
  };
  
  const handleRowClick = (record, rowIndex) => {
    setRowSelected(record.Id)
    setNameRowSelected(record.Name)
    setrowQuantitySelected(record.Quantity)
    setrowDescriptionSelected(record.Description)
    setrowPriceSelected(record.Price)
    setrowTypeSelected(record.type_ID)
    setrowSImageSelected(record.Image)
    setContent(record)
  }
  return (
    <div>
      <WrapperHeader> Quản lý sản phẩm</WrapperHeader>
      <div style={{marginTop: '10px'}}>
        <Button style={{height:'150px', width: '150px', borderRadius:'6px', borderStyle: 'dashed'}} onClick={() => setIsModalOpen(true)}>
          <PlusOutlined style={{fontSize: '60px'}}/>
        </Button>
      </div>
      <TableComponent columns={columns} isLoading={isLoadingProducts} data={dataTable}
                       onRow={(record, rowIndex) => {
                        return {
                          onClick: () => handleRowClick(record, rowIndex)
                        };
                      }}
      />
      <ModalComponent title="Thêm Sản Phẩm" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer= {null}>
        <Loading isLoading={isLoading}>
          <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          form={form}
          autoComplete="off"
        >
          <Form.Item
            label="Tên Sản Phẩm"
            name="name"
            rules={[{ required: true, message: 'Không Được Bỏ Trống!' }]}
          >
            <InputComponent value={stateProduct.Name} onChange={handleOnChange} name='Name' />
          </Form.Item>

          <Form.Item
            label="Số Lương"
            name="quantity"
            rules={[{ required: true, message: 'Không Được Bỏ Trống!' }]}
          >
            <InputComponent value={stateProduct.Quantity} onChange={handleOnChange} name='Quantity' />
          </Form.Item >

          <Form.Item
            label="Mô Tả"
            name="description"
            rules={[{ required: true, message: 'Không Được Bỏ Trống!' }]}
          >
            <InputComponent value={stateProduct.Description} onChange={handleOnChange} name='Description' />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: 'Không Được Bỏ Trống!' }]}
          >
            <InputComponent value={stateProduct.Price} onChange={handleOnChange} name='Price' />
          </Form.Item>

          <Form.Item
            label="Loại Sản Phẩm"
            name="type_id"
            rules={[{ required: true, message: 'Không Được Bỏ Trống!' }]}
          >
            <Select value={stateProduct.type_ID} onChange={handleOnSelect}
              options={[
                {
                  value: 'SACHKINHDI',
                  label: 'Sách Kinh Dị',
                },
                {
                  value: 'SACHTINHCAM',
                  label: 'Sách Tình Cảm',
                },
                {
                  value: 'TIEUTHUYET',
                  label: 'Tiểu Thuyết',
                },
                {
                  value: 'SACHVIENTUONG',
                  label: 'Sách Viễn Tưởng',
                },
                {
                  value: 'BUTBI',
                  label: 'Bút Bi',
                },
                {
                  value: 'BUTCHI',
                  label: 'Bút Chì',
                },
                {
                  value: 'THUOC',
                  label: 'Thước',
                },
                {
                  value: 'GOM',
                  label: 'Gôm',
                },
                {
                  value: 'HOPBUT',
                  label: 'Hộp Bút',
                },
                

              ]}
              />
          </Form.Item>

          <Form.Item
          label="Hình Ảnh"
          name="Image"
          >
            <input 
              name='Image' 
              type='file' 
              accept='image/*' 
              onChange={handleUploadChange} 
               />
              {stateProduct.Image && (
                <img 
                  src={stateProductUpdate.Image} 
                  alt="Product Image"
                  style={{
                  height: '60px',
                  width: '60px%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginLeft: '10px',
                  }}  
                />
        )}
          
        </Form.Item>
          <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
      <ModalComponent title='Chi tiết sản phẩm' isOpen={isModalOpenUpdate} onOk={handleOkUpdate} onCancel={handleCancelUpdate} onClose={() => setIsModalOpenUpdate(false)} width="40%">
          <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          form={form}
          autoComplete="off"
        >
          <Form.Item
            label="Id"
            name="Id"
            //rules={[{ required: true, message: 'Không Được Bỏ Trống!' }]}
          >
            <InputComponent className="readonly-input" value={stateProductUpdate.Id=rowSelected } onChange={handleOnChangeUpdate} placeholder={rowSelected} />
          </Form.Item>
          <Form.Item
            label="Tên Sản Phẩm"
            name="Name"
            rules={[{ required: true, message: 'Không Được Bỏ Trống!' }]}
          >
            <InputComponent value={stateProductUpdate.Name } onChange={handleOnChangeUpdate} name='Name' placeholder={rowNameSelected} />
          </Form.Item>

          <Form.Item
            label="Số Lượng"
            name="Quantity"
            rules={[{ required: true, message: 'Không Được Bỏ Trống!' }]}
          >
            <InputComponent value={stateProductUpdate.Quantity } onChange={handleOnChangeUpdate} name='Quantity' placeholder={rowQuantitySelected} />
          </Form.Item >

          <Form.Item
            label="Mô Tả"
            name="Description"
            rules={[{ required: true, message: 'Không Được Bỏ Trống!' }]}
          >
            <InputComponent value={stateProductUpdate.Description } onChange={handleOnChangeUpdate} name='Description' placeholder={rowDescriptionSelected}/>
          </Form.Item>

          <Form.Item
            label="Giá cả "
            name="Price"
            rules={[
              { required: true, message: 'Không Được Bỏ Trống!' },
              { pattern: /^[0-9]*$/, message: 'Chỉ chấp nhận số nguyên!' }
            ]}
          >
            <InputComponent value={stateProductUpdate.Price } onChange={handleOnChangeUpdate} name='Price' placeholder={rowPriceSelected}/>
          </Form.Item>

          <Form.Item
            label="Loại Sản Phẩm"
            name="type_ID"
            rules={[{ required: true, message: 'Không Được Bỏ Trống!' }]}
          >
            <Select value={stateProductUpdate.type_ID} onChange={handleOnSelectUpdate} defaultValue={rowTypeSelected} 
              options={[
                {
                  value: 'SACHKINHDI',
                  label: 'Sách Kinh Dị',
                },
                {
                  value: 'SACHTINHCAM',
                  label: 'Sách Tình Cảm',
                },
                {
                  value: 'TIEUTHUYET',
                  label: 'Tiểu Thuyết',
                },
                {
                  value: 'SACHVIENTUONG',
                  label: 'Sách Viễn Tưởng',
                },
                {
                  value: 'BUTBI',
                  label: 'Bút Bi',
                },
                {
                  value: 'BUTCHI',
                  label: 'Bút Chì',
                },
                {
                  value: 'THUOC',
                  label: 'Thước',
                },
                {
                  value: 'GOM',
                  label: 'Gôm',
                },
                {
                  value: 'HOPBUT',
                  label: 'Hộp Bút',
                },

              ]}
              />
          </Form.Item>

          <Form.Item
          label="Hình Ảnh"
          name="Image"
          >
            <input 
              name='Image' 
              type='file' 
              accept='image/*' 
              onChange={handleUploadChangeUpdate} 
               />
              {stateProductUpdate.Image && (
                <img 
                  src={setstateProductUpdate.Image} 
                  alt="Product Image"
                  style={{
                  height: '60px',
                  width: '60px%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginLeft: '10px',
                  }}  
                />
        )}
          
        </Form.Item>
          <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
          </Form.Item>
          </Form>
      </ModalComponent>
      <ModalComponent title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
          <div>Bạn có chắc xóa sản phẩm này không?</div>
      </ModalComponent>

    </div>
  )
}

export default Product