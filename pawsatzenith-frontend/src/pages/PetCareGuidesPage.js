import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Spinner, Alert, Input } from "reactstrap";
import { getCareGuides } from "../api/api";
import { Link } from "react-router-dom";

const PetCareGuidesPage = () => {
  const [guides, setGuides] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getCareGuides()
      .then((res) => {
        setGuides(res.data);
        setFilteredGuides(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching care guides");
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    setFilteredGuides(guides.filter((guide) => guide.type.toLowerCase().includes(value)));
  };

  if (loading) return <Container className="text-center my-5"><Spinner color="primary" /></Container>;
  if (error) return <Container className="text-center my-5"><Alert color="danger">{error}</Alert></Container>;

  return (
    <Container className="my-5">
      <h2 className="text-primary">Pet Care Guides</h2>
      <Input type="text" placeholder="Filter by pet type (e.g., Dog, Cat)" value={filter} onChange={handleFilterChange} className="mb-3" />
      
      <Row>
        {filteredGuides.length === 0 ? (
          <Alert color="info">No guides found for "{filter}"</Alert>
        ) : (
          filteredGuides.map((guide) => (
            <Col md={4} key={guide._id} className="mb-4">
              <Link to={`/care-guides/${guide._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">{guide.title}</CardTitle>
                    <CardText><strong>Type:</strong> {guide.type}</CardText>
                    <CardText>{guide.content.substring(0, 100)}...</CardText>
                  </CardBody>
                </Card>
              </Link>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default PetCareGuidesPage;
