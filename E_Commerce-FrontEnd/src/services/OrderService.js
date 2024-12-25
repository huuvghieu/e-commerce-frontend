
import axios from "axios";


export function GetAllOrder(){
    const apiURL = 'http://localhost:8082/order/getallOrder'
    return axios.get(apiURL);
}


export async function GetProductOrder(orderID){
    const response = await axios.get(`http://localhost:8082/order/getallorderid?orderID=${orderID}`);
    return response;
}

export const addOrder = async(data) =>{
    const res = await axios.post(`http://localhost:8082/order/createorder`, data)
    return res.data
}

export function GetAllStatus(){
    const apiURL = 'http://localhost:8082/order/getallStatus'
    return axios.get(apiURL);
}


export function UpdateOrderStutus(data){
    const apiURL = 'http://localhost:8082/order/updatestatusorder'
    return axios.put(apiURL,data);
}

export const payment = async(data) =>{
    const res = await axios.post('http://localhost:8082/payment/createpayment',data)
    return res.data;

}
