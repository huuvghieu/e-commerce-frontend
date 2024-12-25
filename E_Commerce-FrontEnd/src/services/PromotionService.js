import axios from "axios";

export const getPromotion = async () => {
    const apiURL = 'http://localhost:8082/promotion/getallpromotion'
    const response = await axios.get(apiURL);
    return response.data;
}


export async function GetProductPromotion(promotionID){
    const response = await axios.get(`http://localhost:8082/promotion/getallpromotionid?promotionID=${promotionID}`);
    return response;
}

export function GetAllProduct(){
    return axios.get(`http://localhost:8082/product/getall`);
}


export function AddPromotion(data){
    return axios.post(`http://localhost:8082/promotion/createpromotion`, data);
}


export function DeletePromotion(data){
    return axios.post(`http://localhost:8082/promotion/deletepromotion`, data);
}

export function UpdatePromotion(data){
    return axios.put(`http://localhost:8082/promotion/updatepromotion`, data);
}


