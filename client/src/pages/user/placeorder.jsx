import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'react-bootstrap';
import { GetUser } from '../../apis/general/getuserdetailsAPI';
import Navbar from '../../components/navbar/navbar';
import placeOrderAPI_1 from '../../apis/orders/placeOrderAPI';


export default function PlaceOrder() {
  const [userDetails, setUserDetails] = useState();
  const [stateUpdate, setStateUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetUser(localStorage.getItem('jwtToken'));
        setUserDetails(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [stateUpdate]);

  const formik = useFormik({
    initialValues: {
      productName: '',
      quantity: 1,
      productname2: '',
      quantity2: 1,
      productname3: '',
      quantity3: 1,
      productname4: '',
      quantity4: 1,
    },
    validationSchema: Yup.object({
      productName: Yup.string().required('Product name is required'),
      quantity: Yup.number().min(1, 'Must be at least 1').required('Required'),
      productname2: Yup.string().matches(/^[A-Za-z]+$/, 'Product name must contain only alphabets').required('Product name is required'),
      quantity2: Yup.number().min(1, 'Must be at least 1').required('Required'),
      productname3: Yup.string().matches(/^[A-Za-z]+$/, 'Product name must contain only alphabets').required('Product name is required'),
      quantity3: Yup.number().min(1, 'Must be at least 1').required('Required'),
      productname4: Yup.string().required('Required'),
      quantity4: Yup.number().min(1, 'Must be at least 1').required('Required'),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        await handlePlaceOrder(values);
        setSubmitting(false); // Set submitting to false after the operation is complete
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitting(false); // Ensure setSubmitting is called in case of an error
      }
    },
  });

  const handlePlaceOrder = async (values) => {
    console.log(values);
    console.log(userDetails.id);
    const orderData = {
      productName: values.productName,
      quantity: values.quantity,
      productname2: values.productname2,
      quantity2: values.quantity2,
      productname3: values.productname3,
      quantity3: values.quantity3,
      productname4: values.productname4,
      quantity4: values.quantity4,
      userId: userDetails.id,
    };

    try {
      await placeOrderAPI_1(orderData, localStorage.getItem('jwtToken'));

      // Update the state directly to trigger re-render
      setStateUpdate(prevState => !prevState);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const Card = ({ children }) => {
    const cardStyle = {
      width: '80%',
      border: '2px solid #ccc',
      padding: '30px',
      borderRadius: '10px',
      marginLeft: '100px',
      marginTop: '50px',
      position: 'relative',
      height: 'auto',
      //backgroundColor: 'whitesmoke',
    };

    return <div style={cardStyle}>{children}</div>;
  };

  const products = ['Tea', 'Oil', 'Lays', 'Soap', 'Shampoo'];
  const sectionStyle = {
    
    backgroundColor: 'whitesmoke',
  };
  
  return (
    <div className="" style={sectionStyle}>
      <Navbar />
      <ToastContainer />
      <div className="row justify-content-center d-flex container">
        <div className="content col-6">
          {userDetails ? (
            <Card>
              <Form onSubmit={formik.handleSubmit}>
                <div>
                  <label htmlFor="productName">Product Name:</label>
                  <select
                    onChange={formik.handleChange}
                    value={formik.values.productName}
                    className="form-control"
                    id="productName"
                    name="productName"
                    onBlur={formik.handleBlur}
                    required
                  >
                    <option value="" label="Select a product" />
                    {products.map((product) => (
                      <option key={product} value={product} label={product} />
                    ))}
                  </select>
                  {formik.touched.productName && formik.errors.productName ? (
                    <p>{formik.errors.productName}</p>
                  ) : (
                    <p></p>
                  )}
                </div>

                <div>
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.quantity}
                    className={`form-control ${formik.touched.quantity && formik.errors.quantity ? 'is-invalid' : ''}`}
                    id="quantity"
                    name="quantity"
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.quantity && formik.errors.quantity ? (
                    <div className="invalid-feedback">{formik.errors.quantity}</div>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="productname2">product 2 name:</label>
                  <select
                    onChange={formik.handleChange}
                    value={formik.values.productname2}
                    className={`form-control ${formik.touched.productname2 && formik.errors.productname2 ? 'is-invalid' : ''}`}
                    id="productname2"
                    name="productname2"
                    onBlur={formik.handleBlur}
                    required
                  >
                    <option value="" label="Select a product" />
                    {products.map((product) => (
                      <option key={product} value={product} label={product} />
                    ))}
                  </select>
                  {formik.touched.productname2 && formik.errors.productname2 ? (
                    <div className="invalid-feedback">{formik.errors.productname2}</div>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="quantity2">Quantity2:</label>
                  <input
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.quantity2}
                    className={`form-control ${formik.touched.quantity2 && formik.errors.quantity2 ? 'is-invalid' : ''}`}
                    id="quantity2"
                    name="quantity2"
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.quantity2 && formik.errors.quantity2 ? (
                    <div className="invalid-feedback">{formik.errors.quantity2}</div>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="productname3">product 3 name:</label>
                  <select
                    onChange={formik.handleChange}
                    value={formik.values.productname3}
                    className={`form-control ${formik.touched.productname3 && formik.errors.productname3 ? 'is-invalid' : ''}`}
                    id="productname3"
                    name="productname3"
                    onBlur={formik.handleBlur}
                    required
                  >
                    <option value="" label="Select a product" />
                    {products.map((product) => (
                      <option key={product} value={product} label={product} />
                    ))}
                  </select>
                  {formik.touched.productname3 && formik.errors.productname3 ? (
                    <div className="invalid-feedback">{formik.errors.productname3}</div>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="quantity3">Quantity3:</label>
                  <input
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.quantity3}
                    className={`form-control ${formik.touched.quantity3 && formik.errors.quantity3 ? 'is-invalid' : ''}`}
                    id="quantity3"
                    name="quantity3"
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.quantity3 && formik.errors.quantity3 ? (
                    <div className="invalid-feedback">{formik.errors.quantity3}</div>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="productname4">product 4 name:</label>
                  <select
                    onChange={formik.handleChange}
                    value={formik.values.productname4}
                    className={`form-control ${formik.touched.productname4 && formik.errors.productname4 ? 'is-invalid' : ''}`}
                    id="productname4"
                    name="productname4"
                    onBlur={formik.handleBlur}
                    required
                  >
                    <option value="" label="Select a product" />
                    {products.map((product) => (
                      <option key={product} value={product} label={product} />
                    ))}
                  </select>
                  {formik.touched.productname4 && formik.errors.productname4 ? (
                    <div className="invalid-feedback">{formik.errors.productname4}</div>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="quantity4">Quantity4:</label>
                  <input
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.quantity4}
                    className={`form-control ${formik.touched.quantity4 && formik.errors.quantity4 ? 'is-invalid' : ''}`}
                    id="quantity4"
                    name="quantity4"
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.quantity4 && formik.errors.quantity4 ? (
                    <div className="invalid-feedback">{formik.errors.quantity4}</div>
                  ) : null}
                </div>

                <div>
                  <button className="btn btn-outline-primary submit-btn" style={{ marginTop: '10px' }} type="submit">
                    PLACE ORDER
                  </button>
                </div>
              </Form>
            </Card>
          ) : (
            <p>Loading user details...</p>
          )}
        </div>
      </div>
    </div>
  );
}









