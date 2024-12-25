
import * as service from "../../services/PromotionService";
import React, { useEffect, useState } from 'react';
import {Table ,Select} from 'antd';
import './style.css';
import InputDateTimeComponent from "../../components/InputDateTimeComponent/InputDateTimeComponent";
import ButtonClickComponent from "../../components/ButtonComponent/ButtonClickComponent";
import InputComponentPro from "../../components/InputComponent/InputComponentPro";
import {Input} from 'antd'


const PromotionPage = () => {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [dataProduct, setDataProduct] = useState([]);
    const [id, setID] = useState(null);
    const [name, setName] = useState(null);
    const [percent, setPercent] = useState(null);
    const [dateStart, setDateStart] = useState(null);
    const [dateEnd, setDateEnd] = useState(null);
    const [options, setOptions] = useState([]); 
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const { Option } = Select



    const columnsRem = [
      {
        title: "ID",
        dataIndex: "Id",
        key: "Id"
      },
      {
        title: "Tên Sản Phẩm",
        dataIndex: "Name",
        key: "Name"
      },
      {
        title: "Giá",
        dataIndex: "PriceApply",
        key: "PriceApply"
      },
      {
        title: "Số Lượng",
        dataIndex: "Quantity",
        key: "Quantity"
      }
    ];
    
    // hàm này xử lý khi nhấn vào môth hàng trong bảng
    const handleRowClick = (record, rowIndex) => {
      setID(record.promotionID);
      setName(record.NamePromotion);
      setPercent(record.Discount);
      console.log(record.NamePromotion)
      const ngayBatDau = new Date(record.Datestart);
      setDateStart(ngayBatDau);

      const ngayKetThuc = new Date(record.Dateend);
      setDateEnd(ngayKetThuc);

      const data = {
        promotionID: record.promotionID
      };

      service.GetProductPromotion(data.promotionID).then(data => {
        console.log(data['data']);
        const filteredData = data.data.map(item => ({
          key: item.Id,
          Id: item.Id,
          Name: item.Name,
          PriceApply: item.PriceApply,
          Quantity: item.Quantity
        }));
        setDataProduct(filteredData);

      }).catch(error => {
        console.error("Failed to fetch promotion:", error); 
        alert("Sever không phản hồi vui lòng gọi lại sau");
    });

    };

    // sự kiện khi chọn một rèm trong combobox
    const handleChange = (value, option) => {
      for (const opt of options) {

        if(opt.Id === option.key){
          for(const product of dataProduct){
            if(product.Id === opt.Id){
              alert(" Rèm cửa này bạn đã chọn !");
              return 
            }
          }          
          const filteredData = {
            key: opt.Id,
            Id: opt.Id,
            Name: opt.Name,
            PriceApply: opt.PriceApply,
            Quantity: opt.Quantity
          };
          console.log(filteredData);
          //console.log(opt.gia_ap_dung , " clmmmm");



          setDataProduct([...dataProduct, filteredData]);

        }
      }
    };

    // hàm này gọi các API khi bắt đầu chạy chương trình
    const callAPIinit = () =>{
      service.getPromotion().then(data => {
        if (data.length > 0) {
            // Tạo columns dựa trên keys của đối tượng đầu tiên
            const columns = Object.keys(data[0]).map(key => ({
              title: key.charAt(0).toUpperCase() + key.slice(1), 
              dataIndex: key,
              key: key,
              render: text => <span>{text}</span>
            }));

            const newData = data.map((item, index) => ({
              key: index, 
              ...item
            }));
            console.log(newData);
            setColumns(columns);
            setData(newData);
          }

          service.GetAllProduct().then(response => {
            console.log(response.data);
            setOptions(response.data);
          }).catch(error => {
            console.log("Sever không phản hồi");
          });
    }).catch(error => {
        console.error("Failed to fetch promotion:", error); 
        alert("Sever không phản hồi vui lòng gọi lại sau");
    });
    }

    useEffect(() => {
      callAPIinit();
    }, []);

    // sự kiện xoá một rèm cửa trong khuyến mãi
    const deleteRem = () => {
      for(const index of selectedRowKeys){
        const filteredData = dataProduct.filter(item => item.Id !== index);
        setDataProduct(filteredData);
        console.log(filteredData);
      }
        
    };

    // chọn một hàng trong bảng dưới
    const onSelectChange = (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    };

    // hàm xử lý date
    function formatDate(date) {
      if (!date) return null;
      return date.toISOString().substring(0, 10);  // Cắt chuỗi để lấy yyyy-MM-dd
    }

    //sự kiện thêm một khuyến mãi
    const addKhuyenMai = () =>{
      const list_product = []
      for(const proc of dataProduct){
        list_product.push(proc.Id);
      }
      
      if (list_product.length === 0) {
        alert("Danh sách rèm cửa áp dụng khuyến mãi này không được để trống");
        return;
      } else if (name.length === 0) {
        alert("Tên không được để trống");
        return;
      } else if (percent.length === 0 || isNaN(percent)) {
        alert("Phần trăm không hợp lệ");
        return;
      }

      const data = {
        NamePromotion: name,
        staffID: 1,
        Datestart: formatDate(dateStart),
        Dateend: formatDate(dateEnd),
        Discount : percent,
        list_product : list_product
      }

      service.AddPromotion(data).then(res => {
        callAPIinit();
        alert("Thêm thành công");
      }).catch(error => {
        alert("Thêm thất bại");
      });

    };

    // Sự kiện thêm dữ liệu
    const handleInputChangeKM = (event) => {
      setName(event.target.value);  
    };

    // Sự kiện thêm dữ liệu vào 
    const handleInputChangePM = (event) => {
      setPercent(event.target.value);  
    };

    // Sự kiện xoá một khuyến mãi
    const deleteKM = () => {
      console.log(id);


      if (!id) {
        alert(" Không được để ID rỗng ");
        return
      }      

      const data = {
        promotionID: id
      };

      service.DeletePromotion(data).then(res => {
        callAPIinit();
        alert("Xoá Thành công");
      }).catch(error => {
        alert(" Thất bại ");
      });

    }

    // Sự kiện sửa khuyến mãi
    const updateKM = () => {
      const list_proc = []
      for(const proc of dataProduct){
        list_proc.push(proc.Id);
      }
      
      if (list_proc.length === 0) {
        alert("Danh sách rèm cửa áp dụng khuyến mãi này không được để trống");
        return;
      } else if (name.length === 0) {
        alert("Tên không được để trống");
        return;
      } else if (percent.length === 0 || isNaN(percent)) {
        alert("Phần trăm không hợp lệ");
        return;
      }

      const data = {
        promotionID: id,
        NamePromotion: name,
        Datestart: formatDate(dateStart),
        Dateend: formatDate(dateEnd),
        Discount : percent,
        list_product : list_proc
      }

      service.UpdatePromotion(data).then(res => {
        console.log(data)
        callAPIinit();
        window.location.reload();
        alert("Sửa thành công");
      }).catch(error => {
        alert("Sửa thất bại");
      });


    }


    

    return(
      <div>
        <div>
          <h1 className="title"> Khuyến mãi </h1>
        </div>
        <div>
          <div className="grid-container">
            <InputComponentPro className="readonly-input" placeholder="ID" values={id} />
            <InputComponentPro placeholder="Nhập Tên Khuyến Mãi" values={name} handleInputChange={handleInputChangeKM}/>
            <InputComponentPro placeholder="Nhập Phần Trăm Khuyến Mãi" values={percent} handleInputChange={handleInputChangePM}/>
            <InputDateTimeComponent placeholder="Nhập Ngày Bắt Đầu" value={dateStart} setValue={setDateStart}/>
            <InputDateTimeComponent placeholder="Nhập Ngày Kết Thúc" value={dateEnd} setValue={setDateEnd}/>
          </div>
          <div className="grid-container">
            <ButtonClickComponent textButton="Thêm" className="button-style" onClick={addKhuyenMai}/>
            <ButtonClickComponent textButton="Xoá" className="button-style" onClick={deleteKM}/>
            <ButtonClickComponent textButton="Sửa" className="button-style" onClick={updateKM}/>


          </div>
        </div>
        <div>
            <Table columns={columns} 
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
          <h1 className="title"> Danh sản phẩm của khuyến mãi </h1>
        </div>
          <div className="grid-container">
            <ButtonClickComponent textButton="Xoá" className="button-style" onClick={deleteRem}/>
            <div></div>

            <Select
              showSearch
              style={{ width: '100%' }}  
              placeholder="Chọn Sản Phẩm"  
              optionFilterProp="children" 
              onChange={handleChange}
            >
              
             {options.map(opt => (
                <Option key={opt.Id} value={opt.Name}></Option>
              ))}
          </Select>

          </div>
        <div>
          <Table 
            pagination={{ pageSize: 3 }}
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys,
              onChange: onSelectChange,
            }}
            columns={columnsRem} 
            dataSource={dataProduct}>
            
          </Table>
        </div>

      </div>
        
    )
}

export default PromotionPage;