import axios from "axios"

export const loginAdmin = async(data) =>{
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/staff/getall`)
    return res.data
}
export const statistic= async (data) => {
    const { yearselect, date, mode } = data;
    const params = new URLSearchParams();

    if (mode === 'month' && yearselect) {
        params.append('yearselect', yearselect);
    } else if (mode === 'day' && date) {
        params.append('date', date);
    } else {
        throw new Error('Invalid parameters for statistic function');
    }

    params.append('mode', mode);
    const res = await axios.get(`http://localhost:8082/product/statistic`, { params })
    return res
}

export const getAllAccount = async() =>{
    const apiURL = "http://localhost:8082/staff/getall"
    const res = await axios.get(apiURL)
    return res.data
}


export const registerAccount = async(data) =>{
    const apiURL = "http://localhost:8082/staff/register"
    const res = await axios.post(apiURL, data)
    return res.data
}

export const updateAccount = async (data) => {
    const apiURL = "http://localhost:8082/staff/updateaccount"
    const res = await axios.put(apiURL, data)
    return res.data
}