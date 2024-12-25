import axios from "axios"

export const createProduct = async(data) =>{
    const apiURL = 'http://localhost:8082/product/createproduct'
    const res = await axios.post(apiURL, data)
    return res.data
}
export const getAllProduct = async() =>{
    const apiURL = 'http://localhost:8082/product/getall'
    const res = await axios.get(apiURL)
    return res.data
}

export async function getDetailsProduct(Id){
    
        const response = await axios.get(`http://localhost:8082/product/getproductbyid?Id=${Id}`);
        return response;

    
}
    

export const getDetailsProduct2 = async (Id) => {
    const res = await axios.get(`http://localhost:8082/product/getproductbyid?Id=${Id}`)
    return res
}

export async function deleteProduct2(Id){
    const response = await axios.put(`http://localhost:8082/product/deleteproduct?Id=${Id}`);
    return response;
}

export const deleteProduct = async (data) => {
    const apiURL = 'http://localhost:8082/product/deleteproduct?orderID=${orderID}'
    const res = await axios.delete(apiURL,{
        data: data  // Truyền dữ liệu trong config
      });
    return res.data
}
export const updateProduct = async (data) => {
    const apiURL = 'http://localhost:8082/product/updateproduct'
    const res = await axios.put(apiURL, data)
    return res.data
}

export const getType= async (data) => {
    const res = await axios.get(`http://localhost:8082/product/getproductbytype?type_ID=${data}` )
    return res.data
}
export const searchProduct= async (data) => {
    const res = await axios.get(`http://localhost:8082/product/searchProduct?Name=${data}`)
    return res.data
}