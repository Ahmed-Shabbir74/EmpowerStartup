import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "react-bootstrap";
import { GetUser } from "../../apis/general/getuserdetailsAPI";
import Navbar from "../../components/navbar/navbar";
import InputinventoryAPI_1 from "../../apis/Inputinventory/Inputinventory";

const predefinedProducts = ["Tea", "Soap", "Snacks", "Oil"];

export default function Inputinventory() {
  const [userDetails, setUserDetails] = useState();
  const [stateUpdate, setStateUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetUser(localStorage.getItem("jwtToken"));
        setUserDetails(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [stateUpdate]);

  const formik = useFormik({
    initialValues: {
      quantity1: 1,
      quantity2: 1,
      quantity3: 1,
      quantity4: 1,
    },
    validationSchema: Yup.object({
      quantity1: Yup.number().min(1, "Must be at least 1").required("Required"),
      quantity2: Yup.number().min(1, "Must be at least 1").required("Required"),
      quantity3: Yup.number().min(1, "Must be at least 1").required("Required"),
      quantity4: Yup.number().min(1, "Must be at least 1").required("Required"),
    }),

    onSubmit: async (values) => {
      handleInputinventory(values);
    },
  });

  const handleInputinventory = async (values) => {
    const Inputdata = {
      productName1: predefinedProducts[0],
      quantity1: values.quantity1,
      productName2: predefinedProducts[1],
      quantity2: values.quantity2,
      productName3: predefinedProducts[2],
      quantity3: values.quantity3,
      productName4: predefinedProducts[3],
      quantity4: values.quantity4,
      userId: userDetails.id,
    };

    try {
      await InputinventoryAPI_1(Inputdata, localStorage.getItem("jwtToken"));

      setTimeout(() => {
        // Toggle stateUpdate for re-rendering
        setStateUpdate((prevState) => !prevState);
      }, 500);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const Card = ({ children }) => (
    <div
      style={{
        border: "2px solid #ccc",
        borderRadius: "8px",
        padding: "20px",
        marginLeft: "80px",
        marginTop: "50px",
      }}
    >
      {children}
    </div>
  );

  return (
    <div style={{ backgroundColor: "whitesmoke", minHeight: "100vh" }}>
      <Navbar />
      <ToastContainer />
      <div className="row justify-content-center d-flex container">
        <div className="content col-6">
          <Card>
            {userDetails ? (
              <Form onSubmit={formik.handleSubmit}>
                {predefinedProducts.map((productName1, index) => (
                  <div key={index}>
                    <label htmlFor={`quantity${index + 1}`}>
                      {productName1} Quantity:
                    </label>
                    <input
                      type="number"
                      onChange={formik.handleChange}
                      value={formik.values[`quantity${index + 1}`]}
                      className={`form-control ${
                        formik.touched[`quantity${index + 1}`] &&
                        formik.errors[`quantity${index + 1}`]
                          ? "is-invalid"
                          : ""
                      }`}
                      id={`quantity${index + 1}`}
                      name={`quantity${index + 1}`}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched[`quantity${index + 1}`] &&
                    formik.errors[`quantity${index + 1}`] ? (
                      <div className="invalid-feedback">
                        {formik.errors[`quantity${index + 1}`]}
                      </div>
                    ) : null}
                  </div>
                ))}
                <div>
                  <button
                    style={{ marginTop: "10px" }}
                    className="btn btn-outline-primary submit-btn"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            ) : (
              <p>Loading user details...</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
