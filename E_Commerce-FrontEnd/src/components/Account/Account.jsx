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
import * as AdminService from  '../../services/AdminService.js'
import {useMutationHooks} from '../../hook/useMutationHooks.js'
import Loading from '../../components/LoadingComponent/LoadingComponent.jsx'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent.jsx'
import ModalComponent from '../ModalComponent/ModalComponent.jsx'
import InputComponentPro from '../InputComponent/InputComponentPro.jsx'


  
const Account = () => {
  const [content, setContent]=useState('')
  const [rowSelected, setRowSelected] =useState('')
  const [rowNameSelected, setNameRowSelected] =useState('')
  const [rowPassSelected, setrowPassSelected] =useState('')
  const[rowRoleSelected, setrowRoleSelected] =useState('')
  const[rowPhoneSelected, setrowPhoneSelected] =useState('')
  const[rowDateSelected, setrowDateSelected] =useState('')
  const[rowStatusSelected, setrowStatusSelected] =useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false)
  const [form] = Form.useForm();

  const [stateAccount, setstateAccount] = useState({
    Name: "", 
    Password: "", 
    Role: "", 
    PhoneNumber: "", 
    Dateofbirth: "", 
    Status: "", 
    
  });
  const [stateAccountUpdate, setstateAccountUpdate] = useState({
    staffID: "",
    Name: "", 
    Password: "", 
    Role: "", 
    PhoneNumber: "", 
    Dateofbirth: "", 
    Status: "",
  });
 
  const handleOnChange =(e) => {
    setstateAccount({
      ...stateAccount,
      [e.target.name] : e.target.value
    })
    console.log('e.target.name: ', e.target.name, e.target.value );
  }

  const handleOnChangeUpdate =(e) => {
    setstateAccountUpdate({
      ...stateAccountUpdate,
      [e.target.name] : e.target.value
    })
    console.log('e.target.name: ', e.target.name, e.target.value );
  }

  const handleOnSelect = (value) => {
    setstateAccount({
      ...stateAccount,
      staffid: value
    });
  };

  const handleOnSelectUpdate = (value) => {
    setstateAccountUpdate({
      ...stateAccountUpdate,
      staffid: value
      
    });
  };


  const mutation = useMutationHooks(
    (data) => {
      const {
        Name, 
        Password, 
        Role, 
        PhoneNumber, 
        Dateofbirth, 
        Status, } = data
      AdminService.registerAccount({Name, 
        Password, 
        Role, 
        PhoneNumber, 
        Dateofbirth, 
        Status
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
      const {  staffID,
        Name, 
        Password, 
        Role, 
        PhoneNumber, 
        Dateofbirth, 
        Status} = data
      AdminService.updateAccount({ staffID,
        Name, 
        Password, 
        Role, 
        PhoneNumber, 
        Dateofbirth, 
        Status
      }).then(res => {
        alert(" Thành công")
        setIsModalOpen(false)
        window.location.reload();
        console.log(data)
      }).catch(error => {
        alert(" Thất Bại")
        console.log(error)
      })
    }
  )

  

  const handleDeleteProduct =() =>{
    const data = {
      staffID: rowSelected
    }
    console.log(data);

    ProductService.deleteProduct(data).then(res => {
      alert(" Thành công")
      setIsModalOpenDelete(false)
      window.location.reload();
    }).catch(error => {
      alert(" Thất Bại")
      setIsModalOpenDelete(false)
    });

  }

  const {data, isLoading, isSuccess, isError} = mutation

  const renderAction =(record) =>{
    return(
      <div>
        
        {/* <DeleteOutlined style={{color:'red', fontSize: '30px', cursor:'pointer',marginRight:'10px'}} onClick={() => setIsModalOpenDelete(true)}/> */}
        <EditOutlined style={{color:'yellow', fontSize: '30px', cursor:'pointer'}} onClick={() => setIsModalOpenUpdate(true)}/>
      </div>
    )
  }

  const getAllAccount = async() => {
    const res = await AdminService.getAllAccount()
    console.log('API Response:', res);
    return res
  }
  const {isLoading : isLoadingProducts, data : accounts} = useQuery({queryKey: ['accounts'], queryFn: getAllAccount})
  
  
  const columns = [
    {
        title: 'Id',
        dataIndex: 'staffID',
    },
    {
        title: 'Tên',
        dataIndex: 'Username',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Password',
        dataIndex: 'Password',
    },
    {
        title: 'Vai trò',
        dataIndex: 'Role',
    },
    {
        title: 'Số Điện Thoại',
        dataIndex: 'PhoneNumber',
    },
    {
      title: 'Ngày Sinh',
      dataIndex: 'Dateofbirth',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'Status',
    },
    {
      title: 'Tùy chọn',
      dataIndex: 'tuychon',
      render: renderAction  
    },
    
    ]
    const dataTable = accounts?.length && accounts?.map((account) => {
      return {...account, key: account._staffID}
    })
    console.log('DataTable:', dataTable); 

    //create a new account
  const onFinish = () => {
    mutation.mutate(stateAccount)
    console.log('finished', stateAccount)
  }
  const onFinishUpdate = () => {
    mutationUpdate.mutate(stateAccountUpdate)
    console.log('finishedUpdate', stateAccountUpdate)
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
    setIsModalOpen(false)
    setstateAccountUpdate({
      staffID: "",
      Name: "",
      Password: "",
      Role: "",
      PhoneNumber: "",
      Dateofbirth: "",
      Status: "",
  });
  setIsModalOpenUpdate(false)
  }

  const handleCancel = () => {
    setstateAccount({
      Name: "", 
      Password: "", 
      Role: "", 
      PhoneNumber: "", 
      Dateofbirth: "", 
      Status: "", 
    })
    setIsModalOpen(false)
    form.resetFields()
  };
  

  const handleRowClick = (record, rowIndex) => {
    setRowSelected(record.staffID);
    setNameRowSelected(record.Username); 
    setrowPassSelected(record.Password);
    setrowRoleSelected(record.Role)  
    setrowPhoneSelected(record.PhoneNumber)
    setrowDateSelected(record.Dateofbirth)
    setrowStatusSelected(record.Status)
    setContent(record);
  };
  
  
  return (
    <div>
      <WrapperHeader> Quản lý tài khoản </WrapperHeader>
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
      <ModalComponent title="Tạo tài khoản" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer= {null}>
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
            label="Tên"
            name="Name"
            rules={[{ required: true, message: 'Không Được Bỏ Trống!' }]}
          >
            <InputComponent value={stateAccount.Name} onChange={handleOnChange} name='Name' />
          </Form.Item>

          <Form.Item
            label="Password"
            name="Password"
            rules={[{ required: true, message: 'Không Được Bỏ Trống!' }]}
          >
            <InputComponent value={stateAccount.Password} onChange={handleOnChange} name='Password' />
          </Form.Item >

          <Form.Item
            label="Vai Trò"
            name="Role"
            rules={[{ required: true, message: 'Không Được Bỏ Trống!' }]}
          >
            <InputComponent value={stateAccount.Role} onChange={handleOnChange} name='Role' />
          </Form.Item>

          <Form.Item
            label="Số Điện Thoại"
            name="PhoneNumber"
            rules={[{ required: true, message: 'Không Được Bỏ Trống!' }]}
          >
            <InputComponent value={stateAccount.PhoneNumber} onChange={handleOnChange} name='PhoneNumber' />
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            name="Dateofbirth"
            rules={[{ required: true, message: 'Không Được Bỏ Trống!' }]}
          >
            <InputComponent value={stateAccount.Dateofbirth} onChange={handleOnChange} name='Dateofbirth' />
          </Form.Item>

          <Form.Item
            label="Trạng Thái"
            name="Status"
            rules={[
              { required: true, message: 'Không Được Bỏ Trống!' },
              { pattern: /^[0-1]*$/, message: 'Chỉ chấp nhận số nguyên!' }
            ]}
          >
            <InputComponent value={stateAccount.Status} onChange={handleOnChange} name='Status' />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
      <ModalComponent title='Chi tiết tài khoản' isOpen={isModalOpenUpdate} onOk={handleOkUpdate} onCancel={handleCancelUpdate} onClose={() => setIsModalOpenUpdate(false)} width="40%">
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
            label="ID"
            name="staffID"
            //rules={[{ required: true, message: 'Không Được Bỏ Trống!' }]}
          >
            <InputComponent value={stateAccountUpdate.staffID=rowSelected} onChange={handleOnChangeUpdate} placeholder={rowSelected} />
          </Form.Item>
          <Form.Item
            label="Tên"
            name="Name"
            rules={[{ required: true, message: 'Không Được Bỏ Trống!' }]}
          >
            <InputComponent value={stateAccountUpdate.Name }  onChange={handleOnChangeUpdate}  name='Name' placeholder={rowNameSelected}  />
          </Form.Item>

          <Form.Item
            label="Password"
            name="Password"
            rules={[{ required: true, message: 'Không Được Bỏ Trống!' }]}
          >
            <InputComponent value={stateAccountUpdate.Password} onChange={handleOnChangeUpdate} name='Password' placeholder={rowPassSelected}  />
          </Form.Item >

          <Form.Item
            label="Vai Trò"
            name="Role"
            rules={[{ required: true, message: 'Không Được Bỏ Trống!' }]}
          >
            <InputComponent value={stateAccountUpdate.Role } onChange={handleOnChangeUpdate} name='Role' placeholder={rowRoleSelected} />
          </Form.Item>

          <Form.Item
            label="Số Điện Thoại"
            name="PhoneNumber"
            rules={[{ required: true, message: 'Không Được Bỏ Trống!' }]}
          >
            <InputComponent value={stateAccountUpdate.PhoneNumber} name='PhoneNumber' onChange={handleOnChangeUpdate} placeholder={rowPhoneSelected} />
          </Form.Item>

          <Form.Item
            label="Ngày Sinh"
            name="Dateofbirth"
            rules={[{ required: true, message: 'Không Được Bỏ Trống!' }]}
          >
            <InputComponent value={stateAccountUpdate.Dateofbirth } name='Dateofbirth' onChange={handleOnChangeUpdate} placeholder={rowDateSelected} />
          </Form.Item>

          <Form.Item
            label="Trạng Thái"
            name="Status"
            rules={[
              { required: true, message: 'Không Được Bỏ Trống!' },
              { pattern: /^[0-9]*$/, message: 'Chỉ chấp nhận số nguyên!' }
            ]}
          >
            <InputComponent value={stateAccountUpdate.Status } name='Status' onChange={handleOnChangeUpdate} placeholder={rowStatusSelected} />
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

export default Account