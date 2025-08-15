import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Input, Card, CardBody, CardText, CardTitle, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa"; // Optional: for the search icon
import "./LostFound.css"; // Import CSS for any additional styles if needed

const LostFound = () => {
  const [typeFilter, setTypeFilter] = useState("all");
  const [reportType, setReportType] = useState("lost");
  const [description, setDescription] = useState("");
  const [lastSeenLocation, setLastSeenLocation] = useState("");
  const [image, setImage] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, [typeFilter]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/lostfound");
      if (typeFilter === "all") {
        setReports(response.data);
      } else {
        setReports(
          response.data.filter((report) => report.type === typeFilter)
        );
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reports", error);
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloudinary_name/image/upload",
        formData
      );
      setImage(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reportData = {
      type: reportType,
      description,
      lastSeenLocation,
      image,
    };

    try {
      await axios.post("/api/lostfound", reportData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      alert("Report submitted successfully!");
      fetchReports();
    } catch (error) {
      console.error("Error submitting report", error);
      alert("Error submitting report");
    }
  };

  return (
    <Container className="my-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>Help Reunite Lost Pets with Their Families</h1>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>
          Report lost or found pets to help others in your community.
        </p>
      </div>

      {/* Report Form */}
      <Form onSubmit={handleSubmit} className="mb-5">
        <Row className="justify-content-center">
          <Col md={6} sm={12}>
            <Card className="shadow-sm border-0 rounded-3 p-4">
              <CardBody>
                <h4 className="text-center mb-4">Report a Pet</h4>
                <div className="mb-3">
                  <label htmlFor="type">Type</label>
                  <select
                    id="type"
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="form-control"
                  >
                    <option value="lost">Lost</option>
                    <option value="found">Found</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="lastSeenLocation">Last Seen Location</label>
                  <Input
                    type="text"
                    id="lastSeenLocation"
                    value={lastSeenLocation}
                    onChange={(e) => setLastSeenLocation(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image">Upload Image</label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="form-control-file"
                  />
                </div>
                <div className="text-center">
                  <Button color="primary" type="submit" className="w-100">
                    Report
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Form>

      {/* Filter Section */}
      <div className="text-center mb-4">
        <label htmlFor="filter" className="d-block mb-2">Filter by Type</label>
        <select
          id="filter"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="form-control w-auto d-inline-block"
          style={{ maxWidth: "200px" }}
        >
          <option value="all">All</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>

      {/* Reports Section */}
      {loading ? (
        <div className="text-center">
          <Spinner color="primary" />
          <p>Loading reports...</p>
        </div>
      ) : (
        <Row>
          {reports.length > 0 ? (
            reports.map((report) => (
              <Col md={4} sm={6} key={report._id} className="mb-4">
                <Card className="shadow-sm border-0 rounded-3">
                  {report.image && (
                    <img
                      src={report.image}
                      alt="Lost or Found Pet"
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}
                  <CardBody>
                    <CardTitle tag="h5" className="text-center">{report.type === "lost" ? "Lost Pet" : "Found Pet"}</CardTitle>
                    <CardText>
                      <strong>Description:</strong> {report.description}
                    </CardText>
                    <CardText>
                      <strong>Last Seen:</strong> {report.lastSeenLocation}
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">No reports found.</p>
          )}
        </Row>
      )}
    </Container>
  );
};

export default LostFound;
