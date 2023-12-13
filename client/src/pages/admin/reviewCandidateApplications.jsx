import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ApproveCandidateAPI } from "../../apis/admin/reviewCandidate/reviewCandidateAPI";
import GetPendingApprovalsAPI from "../../apis/admin/reviewCandidate/reviewCandidateAPI";
import Navbar from "../../components/navbar/navbar";
import { Pagination } from "../../components/pagination/pagination";
import { RejectCandidateAPI } from "../../apis/admin/reviewCandidate/reviewCandidateAPI";
import  CandidateApplicationDetails  from "../user/CandidateApplicationDetails";

const ReviewCandidateApplications = () => {
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [stateUpdate, setStateUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pendingApprovals.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const approvalsData = await GetPendingApprovalsAPI(
          localStorage.getItem("jwtToken")
        );
        setPendingApprovals(approvalsData);
      } catch (error) {
        console.error("Error fetching pending approvals:", error);
      }
    };
    fetchData();
  }, [stateUpdate]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleApprove = async (approval) => {
    await ApproveCandidateAPI(localStorage.getItem("jwtToken"), approval);
    setStateUpdate(!stateUpdate);
  };

  const handleDelete = (approval) => {
    RejectCandidateAPI(localStorage.getItem("jwtToken"), approval);
    setStateUpdate(!stateUpdate);
  };

  const showApplicationDetails = (approval) => {
    setSelectedApplication(approval);
  };

  return (
    <div className="">
      <Navbar />
      <ToastContainer />
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <h2>Pending Approvals</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>User CNIC</th>
                  <th>Username</th>
                  {/* <th>city_address</th>
                  <th>startup_address</th> */}
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((approval) => (
                  <tr key={approval._id}>
                    <td>{approval.cnic}</td>
                    <td>{approval.username}</td>
                                     
                    {/* <td>{approval.UserAddress}</td>
                    <td>{approval.StartupAddress}</td> */}
                    <td>
                      <button
                        className="btn btn-outline-success mr-2"
                        onClick={() => handleApprove(approval)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-outline-danger mr-2"
                        onClick={() => handleDelete(approval)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-outline-info"
                        onClick={() => showApplicationDetails(approval)}
                      >
                        Show Application
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={pendingApprovals.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
      {selectedApplication && (
        <CandidateApplicationDetails application={selectedApplication} />
      )}
    </div>
  );
};

export default ReviewCandidateApplications;
