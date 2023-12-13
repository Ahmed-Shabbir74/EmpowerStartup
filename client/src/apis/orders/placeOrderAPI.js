import axios from 'axios';
import { toast } from 'react-toastify';

const placeOrderAPI = async (orderData, token) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST}/api/order/place-order`,
      orderData,
      {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const responseData = response.data;
    if (response.status >= 200 && response.status < 300) {
      toast.success(responseData.message);
    } else {
      toast.warning('An unexpected error occurred');
    }
    return responseData;
  } catch (error) {
    console.error('Error placing order:', error);

    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }

    if (error.response && error.response.status === 400) {
      toast.error(error.response.data.message);
    } else if (error.response && error.response.status === 500) {
      toast.error(error.response.data.message);
    } else {
      toast.error('Error placing order');
    }
    throw error;
  }
};

export default placeOrderAPI;
