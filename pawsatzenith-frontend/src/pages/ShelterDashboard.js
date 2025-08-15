import React, { useEffect, useState } from "react";
import { Container, Table, Button, Spinner, Alert } from "reactstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShelterDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user?.userInfo || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "shelter") {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:5000/api/adoptions/shelter`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching adoption requests");
        setLoading(false);
      });
  }, [user, navigate]);

  const handleUpdateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/adoptions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status }),
    });

    setRequests((prevRequests) => prevRequests.map((req) => (req._id === id ? { ...req, status } : req)));
  };

  if (loading) return <Spinner color="primary" />;
  if (error) return <Alert color="danger">{error}</Alert>;

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Adoption Requests</h2>
      <Table bordered responsive>
        <thead><tr><th>Pet</th><th>Applicant</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.pet.name}</td><td>{req.user.name}</td><td>{req.status}</td>
              <td>
                {req.status === "pending" && <><Button onClick={() => handleUpdateStatus(req._id, "approved")}>Approve</Button> <Button onClick={() => handleUpdateStatus(req._id, "rejected")}>Reject</Button></>}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ShelterDashboard;
