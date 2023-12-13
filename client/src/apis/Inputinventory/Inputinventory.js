import axios from 'axios';
import { toast } from 'react-toastify';

const InputinventoryAPI = async (orderData, token) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST}/api/Inputinventory/Input-inventory`,
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
    console.error('Error while input:', error);

    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }

    if (error.response && error.response.status === 400) {
      toast.error(error.response.data.message);
    } else if (error.response && error.response.status === 500) {
      toast.error(error.response.data.message);
    } else {
      toast.error('Error while Input');
    }
    throw error;
  }
};

export default InputinventoryAPI;
