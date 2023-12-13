import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "react-bootstrap"
import { GetUser } from "../../apis/general/getuserdetailsAPI";
import Navbar from "../../components/navbar/navbar";
import updateCandidateStatusAPI from "../../apis/user/applyAsCandidateAPI";


export default function ApplyAsCandidate() {
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
      partyName: "",
      CNICFront: "",
      CNICBack: "",
      Electricitybill: "",
      Utilitybill: "",
      StartupDesc: "",
      Startuptype: "",
      UserAddress: "",
      StartupAddress: "",
      appliedAsCandidate: true,
    },
    validationSchema: Yup.object({
      partyName: Yup.string().min(3, "Must be 3 Chars").required("Required"),
      StartupDesc: Yup.string().min(50, "Must be 50 Chars").required("Required"),
      UserAddress: Yup.string().min(30, "Must be 30 Chars").required("Required"),
      Startuptype: Yup.string().required("Required"),

      StartupAddress: Yup.string().min(30, "Must be 30 Chars").required("Required"),
      CNICFront: Yup.mixed()
        .test("fileType", "Only image files are allowed", (value) => {
          if (!value) return true;
          const supportedFormats = ["image/jpeg", "image/png", "image/gif", "image/jpg", "image/webp"];
          return supportedFormats.includes(value.type);
        }),
      CNICBack: Yup.mixed()
        .test("fileType", "Only image files are allowed", (value) => {
          if (!value) return true;
          const supportedFormats = ["image/jpeg", "image/png", "image/gif", "image/jpg", "image/webp"];
          return supportedFormats.includes(value.type);
        }),

      Electricitybill: Yup.mixed()
        .test("fileType", "Only image files are allowed", (value) => {
          if (!value) return true;
          const supportedFormats = ["image/jpeg", "image/png", "image/gif", "image/jpg", "image/webp"];
          return supportedFormats.includes(value.type);
        }),
      Utilitybill: Yup.mixed()
        .test("fileType", "Only image files are allowed", (value) => {
          if (!value) return true;
          const supportedFormats = ["image/jpeg", "image/png", "image/gif", "image/jpg", "image/webp"];
          return supportedFormats.includes(value.type);
        }),
    }),

    onSubmit: async (values) => {
      handleApplyForCandidate(values);
    },
  });

  const handleApplyForCandidate = async (values) => {
    console.log(values);
    const formData = new FormData();
    formData.append("partyName", values.partyName);
    formData.append("CNICFront", values.CNICFront);
    formData.append("CNICBack", values.CNICBack);
    formData.append("Electricitybill", values.Electricitybill);
    formData.append("Utilitybill", values.Utilitybill);
    formData.append("appliedAsCandidate", values.appliedAsCandidate);
    formData.append("id", userDetails.id);
    formData.append("StartupDesc", values.StartupDesc);
    formData.append("UserAddress", values.UserAddress);
    formData.append("Startuptype", values.Startuptype);
    formData.append("StartupAddress", values.StartupAddress);
    try {
      await updateCandidateStatusAPI(formData, localStorage.getItem("jwtToken"));

      setTimeout(() => {
        stateUpdate ? setStateUpdate(false) : setStateUpdate(true);
      }, 500);
    } catch (error) {
    }
  };

  const handleFileChange = (event) => {
    formik.setFieldValue("CNICFront", event.currentTarget.files[0]);
    formik.setFieldValue("CNICBack", event.currentTarget.files[0]);
    formik.setFieldValue("Electricitybill", event.currentTarget.files[0]);
    formik.setFieldValue("Utilitybill", event.currentTarget.files[0]);
  };

  return (
    <div className="" style={{ backgroundColor: 'whitesmoke' }}>
      <Navbar />
      <ToastContainer />
      <div className="row justify-content-center d-flex container">

        <div className="content col-6" >
          <img src={require('../general/1.jpg')} alt="Slide 1"  style={{ position: 'fixed', width: '555px', height: '100%' }} />
        </div>

        <div className="content col-6">
          {userDetails ? (
            userDetails.appliedAsCandidate ? (
              <h1>Applied For Candidateship</h1>
            ) : (
              <Form onSubmit={formik.handleSubmit}>
                <div>
                  <label htmlFor="StartupName">Startup :</label>
                  <input
                    type="text"
                    placeholder="Enter Your Startup Name"
                    onChange={formik.handleChange}
                    value={formik.values.partyName}
                    className="form-control"
                    autoComplete="off"
                    id="partyName"
                    name="partyName"
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.partyName && formik.errors.partyName ? (
                    <p>{formik.errors.partyName}</p>
                  ) : (
                    <p>

                    </p>
                  )}
                </div>


                <div>
                  <label htmlFor="StartupDesc">Startup Description:</label>
                  <input
                    type="text"
                    id="StartupDesc"
                    name="StartupDesc"
                    onChange={formik.handleChange}
                    value={formik.values.StartupDesc}
                    onBlur={formik.handleBlur}
                    className={`form-control ${formik.touched.StartupDesc && formik.errors.StartupDesc ? "is-invalid" : ""}`}
                  />
                  {formik.touched.StartupDesc && formik.errors.StartupDesc ? (
                    <div className="invalid-feedback">{formik.errors.StartupDesc}</div>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="Startuptype">Startup Type:</label>
                  <select
                    id="Startuptype"
                    name="Startuptype"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Startuptype}
                    className={`form-control ${formik.touched.Startuptype && formik.errors.Startuptype ? "is-invalid" : ""}`}
                  >
                    <option value="" label="Select an option" />
                    <option value="Departmental Store" label="Departmental Store" />
                  </select>
                  {formik.touched.Startuptype && formik.errors.Startuptype ? (
                    <div className="invalid-feedback">{formik.errors.Startuptype}</div>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="UserAddress">User Address:</label>
                  <input
                    type="text"
                    id="UserAddress"
                    name="UserAddress"
                    onChange={formik.handleChange}
                    value={formik.values.UserAddress}
                    onBlur={formik.handleBlur}
                    className={`form-control ${formik.touched.UserAddress && formik.errors.UserAddress ? "is-invalid" : ""}`}
                  />
                  {formik.touched.UserAddress && formik.errors.UserAddress ? (
                    <div className="invalid-feedback">{formik.errors.UserAddress}</div>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="StartupAddress">Startup Address:</label>
                  <input
                    type="text"
                    id="StartupAddress"
                    name="StartupAddress"
                    onChange={formik.handleChange}
                    value={formik.values.StartupAddress}
                    onBlur={formik.handleBlur}
                    className={`form-control ${formik.touched.StartupAddress && formik.errors.StartupAddress ? "is-invalid" : ""}`}
                  />
                  {formik.touched.StartupAddress && formik.errors.StartupAddress ? (
                    <div className="invalid-feedback">{formik.errors.StartupAddress}</div>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="CNICFront">CNIC FRONT:</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    id="CNICFront"
                    name="CNICFront"
                    className="form-control"
                    onBlur={formik.handleBlur}
                    accept=".png, .jpg, .jpeg .webp"
                    required
                  />
                  {formik.touched.CNICFront && formik.errors.CNICFront ? (
                    <p>{formik.errors.CNICFront}</p>
                  ) : (
                    <p>

                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="CNICBack">CNIC BACK:</label>
                  <input
                    type="file"
                    onChange={(event) => handleFileChange(event, "CNICBack")}
                    id="CNICBack"
                    name="CNICBack"
                    className="form-control"
                    onBlur={formik.handleBlur}
                    accept=".png, .jpg, .jpeg .webp"
                    required
                  />
                  {formik.touched.CNICBack && formik.errors.CNICBack ? (
                    <p>{formik.errors.CNICBack}</p>
                  ) : (
                    <p>

                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="Electricitybill">Electricity Bill:</label>
                  <input
                    type="file"
                    onChange={(event) => handleFileChange(event, "Electricitybill")}
                    id="Electricitybill"
                    name="Electricitybill"
                    className="form-control"
                    onBlur={formik.handleBlur}
                    accept=".png, .jpg, .jpeg .webp"
                    required
                  />
                  {formik.touched.Electricitybill && formik.errors.Electricitybill ? (
                    <p>{formik.errors.Electricitybill}</p>
                  ) : (
                    <p>

                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="Utilitybill">Utility Bill:</label>
                  <input
                    type="file"
                    onChange={(event) => handleFileChange(event, "Utilitybill")}
                    id="Utilitybill"
                    name="Utilitybill"
                    className="form-control"
                    onBlur={formik.handleBlur}
                    accept=".png, .jpg, .jpeg .webp"
                    required
                  />
                  {formik.touched.Utilitybill && formik.errors.Utilitybill ? (
                    <p>{formik.errors.Utilitybill}</p>
                  ) : (
                    <p>
                    </p>
                  )}
                </div>

                <div>
                  <button
                    className="btn btn-outline-primary submit-btn"
                    type="submit"
                  >
                    APPLY FOR STARTUP
                  </button>
                </div>
              </Form>
            )
          ) : (
            <p>Loading user details...</p>
          )}
        </div>

      </div>
    </div>
  );

}