import React, { useEffect, useState } from "react";
import { Container, Table, Spinner, Alert, Card, CardBody, CardImg, CardTitle } from "reactstrap";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user?.userInfo || null);

  useEffect(() => {
    if (!user) return;

    fetch("http://localhost:5000/api/adoptions/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching adoption requests");
        setLoading(false);
      });
  }, [user]);
  console.log("User from Redux:", user);

  if (!user) {
    return <Container className="text-center my-5"><Alert color="warning">Please log in to view your adoption requests.</Alert></Container>;
  }

  if (loading) return <Container className="text-center my-5"><Spinner color="primary" /></Container>;
  if (error) return <Container className="text-center my-5"><Alert color="danger">{error}</Alert></Container>;

  return (
    <Container className="my-5">
      <h2 className="text-primary">My Adoption Requests</h2>
      {requests.length === 0 ? (
        <Alert color="info">You haven't submitted any adoption requests yet.</Alert>
      ) : (
        <Table bordered responsive>
          <thead>
            <tr><th>Pet</th><th>Message</th><th>Status</th></tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td>
                  <Card style={{ maxWidth: "200px" }}>
                    <CardImg top src={request.pet?.images || "https://via.placeholder.com/150"} alt={request.pet?.name} />
                    <CardBody><CardTitle>{request.pet?.name}</CardTitle></CardBody>
                  </Card>
                </td>
                <td>{request.message}</td>
                <td><span className={`badge ${request.status === "approved" ? "bg-success" : request.status === "rejected" ? "bg-danger" : "bg-warning"}`}>{request.status}</span></td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserDashboard;
