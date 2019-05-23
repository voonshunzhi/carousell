import axios from 'axios';

const axiosModule = axios.create({
    baseURL:"https://carousell-d92c8.firebaseio.com/"  
})

export default axiosModule;