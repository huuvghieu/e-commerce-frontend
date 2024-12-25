import React, { useEffect, useState, useRef  } from 'react'
import {Table, Select } from 'antd';
import './style.css';
import * as service from '../../services/OrderService';
import InputComponentPro from '../../components/InputComponent/InputComponentPro';
import ButtonClickComponent from '../../components/ButtonComponent/ButtonClickComponent';
import ReactToPrint from 'react-to-print';
const OrderPage = () => {
  const [data, setData] = useState([]);
  const [id, setID] = useState(null);
  const [total, settotal] = useState(null);
  const [email, setemail] = useState(null);
  const [phone, setphone] = useState(null);
  const [address, setaddress] = useState(null);
  const [dataProduct, setDataProdcut] = useState([]);
  const [options, setOptions] = useState([]); 
  const [selectedKey, setSelectedKey] = useState();
  const { Option } = Select
  const invoiceRef = useRef();

  const columnsProdcut = [
    {
      title: "ID",
      dataIndex: "Id",
      key: "Id"
    },
    {
      title: "Tên",
      dataIndex: "Name",
      key: "Name"
    },
    {
      title: "Số Lượng",
      dataIndex: "Quantity",
      key: "Quantity",
    },
    {
      title: "Giá",
      dataIndex: "Total",
      key: "Total"
    }
  ];

  const columnsOrder = [
    {
      title: "ID",
      dataIndex: "orderID",
      key: "orderID"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "SDT",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total"
    },
    {
      title: "Trạng Thái`",
      dataIndex: "NameStatus",
      key: "NameStatus"
    },
    {
      title: "Hình Thức",
      dataIndex: "NamePayment",
      key: "NamePayment"
    },
    {
      title: "Ngày tạo",
      dataIndex: "datestart",
      key: "datestart"
    },
  ];

  const callAPIinit = () => {
    service.GetAllOrder().then(data => {
      const newData = []
      for(const order of data.data){
        const dataTable = {
          orderID : order.orderID,
          email : order.email,
          address : order.address,
          phone : order.phone,
          total : order.total,
          NamePayment : order.NamePayment,
          NameStatus : order.NameStatus,
          datestart : order.datestart,
          IDpayment : order.IDpayment,
          IDstatus : order.IDstatus
         }
         newData.push(dataTable)
      }
      setData(newData);

      service.GetAllStatus().then(response => {
        setOptions(response.data);
        console.log(options)
      }).catch(error => {
        alert(" Sever không phản hồi ");
      });

    }).catch(error =>{
      alert(" Sever không phải hồi ");
    });


  }

  useEffect(() => {
    callAPIinit();
  }, []);

  

  const handleRowClick = (record, rowIndex) => {
    setID(record.orderID);
    console.log(record.NameStatus);
    setSelectedKey(record.NameStatus);
    settotal(record.total);
    setemail(record.email);
    setphone(record.phone);
    setaddress(record.address);
    console.log(record.total);
    const dataProductOder = {
      orderID: record.orderID
    };
    console.log( record.orderID)

    service.GetProductOrder(dataProductOder.orderID).then(data => {
      console.log( data)
      const filteredData = data.data.map(item => ({
        key: item.Id,
        Id: item.Id,
        Name: item.Name,
        Quantity: item.Quantity,
        Total: item.Total
      }));
      setDataProdcut(filteredData);
      console.log( filteredData );
    }).catch(error => {
      console.error("Failed to fetch  :", error); 
      alert("Sever không phản hồi vui lòng gọi lại sau");
  });


  };

  const handleChange = (value, option) => {
    console.log(value)
    setSelectedKey(value);
    console.log(selectedKey)
  }

  const updateOrder = () => {
    let IDstatus = null
    for(const opt of options){
      console.log(opt.NameStatus)
      if(opt.NameStatus === selectedKey){
        IDstatus = opt.IDstatus
      }
    }

    if(IDstatus === null){
      alert("Trạng thái không hợp lệ");
      return
    }

    const data = {
      orderID: id,
      IDstatus : IDstatus
    }

    service.UpdateOrderStutus(data).then(res => {
      callAPIinit();
      alert("Cập nhật thành công");
    }).catch(error => {
      alert(" Sever không phản hồi ");
    });

  }



  return (
    <div>
      <div>
          <h1 className="title"> ĐƠN HÀNG </h1>
      </div>
      <div className="grid-container">
            <InputComponentPro className="readonly-input" placeholder="ID" values={id} />

            <Select
              showSearch
              style={{ width: '100%' }}  
              placeholder="Chọn trạng thái cho đơn hàng"  
              optionFilterProp="children" 
              onChange={handleChange}
              value={selectedKey} 
            >
             {options.map(opt => (
                <Option key={opt.IDstatus} value={opt.NameStatus}></Option>
              ))}
          </Select>

          <ButtonClickComponent style={{ width: '45%',marginLeft: '30px' }} textButton="Cập nhật trạng thái" className="button-style" onClick={updateOrder}/>
            
          <ReactToPrint
            trigger={() => (
              <ButtonClickComponent style={{ width: '50%', marginLeft: '0px' }} textButton="In hóa đơn" />
            )}
            content={() => invoiceRef.current}
          />



            
        </div>
      <div>
          <Table  columns={columnsOrder} 
                  dataSource={data} 
                  pagination={{ pageSize: 5 }} 
                  onRow={(record, rowIndex) => {
                  return {
                    onClick: () => handleRowClick(record, rowIndex)
                  };
                }}
          />;
      </div>
      <div>
          <h1 className="title"> DANH SÁCH SẢN PHẨM CỦA ĐƠN HÀNG </h1>
      </div>
      <div>
      <Table 
            columns={columnsProdcut} 
            dataSource={dataProduct}>
            pagination={{ pageSize: 5 }}
          </Table>

      </div>
      <div style={{ display: 'none' }}>
        <div ref={invoiceRef} style={{ padding: '20px', border: '1px solid #ddd' }}>
          <h1>Hóa Đơn</h1>
          <p>ID Đơn hàng: {id}</p>
          <p>Trạng thái: {selectedKey}</p>
          <p>Email: {email}</p>
          <p>Số Điện Thoại: {phone}</p>
          <p>Địa Chỉ: {address}</p>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Sản phẩm</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Số lượng</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Giá</th>
              </tr>
            </thead>
            <tbody>
              {dataProduct.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.Name}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.Quantity}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.Total}</td>
                </tr>
              ))}
            </tbody>
          </table>
            <h2 style={{ marginTop: '20px', marginLeft: '600px' }}>Tổng tiền: {total} VND</h2>
        </div>
      </div>
    </div>
    
  )
}

export default OrderPage