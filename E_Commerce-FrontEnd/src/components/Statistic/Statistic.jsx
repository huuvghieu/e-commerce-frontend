import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Row, Col, Button, InputNumber, DatePicker, Select } from 'antd';

import * as AdminService from  '../../services/AdminService'
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';

const { Option } = Select;
const Statistic = () => {
  const [stateStatistic, setStateStatistic] =useState([])
  const [Year, setYear] =useState(2024)
  
  const [date, setDate] = useState(moment());
  const [mode, setMode] = useState('month'); // Chế độ hiển thị: 'month' hoặc 'day'

  
  const onChangeYear = (newValue) => {
    setYear(newValue);
  };

  const onChangeDate = (date, dateString) => {
    setDate(date);
  };

  const onChangeMode = (value) => {
    setMode(value);
  };
 

  // const {data: viewStatistic} = useQuery({queryKey: ['statistic'], queryFn: fetchStatistic})

  const data = {
    yearselect: Year,
    date: date.format('YYYY-MM-DD'),
    mode: mode
  };

  const handleView = async() => {
    const res = await AdminService.statistic(data)
    console.log(res)
    setStateStatistic(res.data)
  }

  useEffect(() => {
    console.log('stateStatistic1:', stateStatistic);
    //console.log('stateStatistic0:', stateStatistic[0]);
  }, [stateStatistic]);

  const chartData = stateStatistic.map((item, index) => ({
    month: String(index + 1).padStart(2, '0'),
    revenue: item.revenue,
  }));

  return (
    <div style={{ display: 'flex', marginTop: '35px' }}>
      <Row>
        <Col span={4} style={{ display: 'flex', flexDirection: 'column' }}>
          <Select defaultValue="month" onChange={onChangeMode} style={{ marginBottom: '20px' }}>
            <Option value="month">Doanh thu theo tháng</Option>
            <Option value="day">Doanh thu theo ngày</Option>
          </Select>
          <InputNumber min={2024} max={2034} defaultValue={2024} onChange={onChangeYear} />
          {mode === 'day' && <DatePicker onChange={onChangeDate} defaultValue={moment()} />}
          <Button
            style={{ marginTop: '20px', color: 'blueviolet', height: '40px' }}
            onClick={handleView}
          >
            Xem doanh thu
          </Button>
        </Col>
        <Col span={20}>
          <BarChart width={1300} height={800} data={chartData}>
            <XAxis dataKey="time" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#8884d8" />
          </BarChart>
        </Col>
      </Row>
    </div>
  );
};
export default Statistic;