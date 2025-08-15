import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import { Link } from "react-router-dom";
import { FaHeart, FaPaw } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/pets")
      .then((res) => res.json())
      .then((data) => {
        setPets(data.slice(0, 6)); // Show only first 6 pets
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching pets:", err);
        setError("There was an error fetching the pets.");
        setLoading(false);
      });
  }, []);

  return (
    <Container fluid className="p-0">
      {/* Hero Section */}
      <div className="hero-section d-flex align-items-center justify-content-center text-center" style={{
        backgroundImage: 'url("https://img.goodfon.com/original/3699x2461/3/81/happy-pets-dogs-game-schastlivye-domashnie-zhivotnye-sobaki.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '80vh',
        position: 'relative'
      }}>
        <div className="hero-overlay" style={{
          backgroundColor: 'rgba(0,0,0,0.6)',
          padding: '60px 20px',
          borderRadius: '0',
          width: '100%'
        }}>
          <h1 className="display-3 text-white fw-bold mb-3">Find Your Perfect Pet</h1>
          <p className="lead text-light">Adopt a furry friend and give them a loving home</p>
          <Button color="warning" size="lg" tag={Link} to="/pets" className="mt-3 px-4 py-2 fw-bold rounded-pill">
            Browse Pets
          </Button>
        </div>
      </div>

      {/* Featured Pets */}
      <Container className="my-5">
        <h2 className="text-center fw-bold mb-4" style={{ fontSize: "2.5rem" }}>Featured Pets</h2>

        {loading ? (
          <div className="text-center">
            <Spinner color="primary" />
            <p>Loading pets...</p>
          </div>
        ) : error ? (
          <p className="text-danger text-center">{error}</p>
        ) : (
          <Row>
            {pets.map((pet) => (
              <Col md={4} sm={6} xs={12} key={pet._id} className="mb-4">
                <Card className="shadow-sm border-0 h-100 card-hover" style={{ borderRadius: "16px" }}>
                  <CardImg
                    top
                    src={pet.images || "https://via.placeholder.com/300"}
                    alt={pet.name}
                    style={{ height: "230px", objectFit: "cover", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}
                  />
                  <CardBody className="text-center">
                    <CardTitle tag="h5" className="fw-bold">
                      <FaPaw className="me-2 text-warning" />
                      {pet.name}
                    </CardTitle>
                    <CardText className="text-muted">{pet.breed} | {pet.age} years</CardText>
                    <Button color="primary" tag={Link} to={`/pets/${pet._id}`} className="fw-bold mt-2">
                      More Details
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <div className="text-center mt-4">
          <Button color="dark" tag={Link} to="/pets" className="px-4 py-2 fw-bold rounded-pill">
            View All Pets
          </Button>
        </div>
      </Container>

      {/* Why Adopt From Us */}
      <Container className="py-5 bg-light">
        <h3 className="text-center fw-bold mb-4">Why Adopt From Us?</h3>
        <Row className="text-center">
          <Col md={4}>
            <div className="mb-3" style={{ fontSize: "2rem", background: "#ffe0e0", width: 60, height: 60, borderRadius: "50%", margin: "0 auto" }}>
              <FaHeart className="text-danger" />
            </div>
            <h5>Save a Life</h5>
            <p>Give abandoned pets a second chance at life and love.</p>
          </Col>
          <Col md={4}>
            <div className="mb-3" style={{ fontSize: "2rem", background: "#fff3cd", width: 60, height: 60, borderRadius: "50%", margin: "0 auto" }}>
              <FaPaw className="text-warning" />
            </div>
            <h5>Trusted Shelters</h5>
            <p>All pets come from verified shelters ensuring safe adoption.</p>
          </Col>
          <Col md={4}>
            <div className="mb-3" style={{ fontSize: "2rem", background: "#d4edda", width: 60, height: 60, borderRadius: "50%", margin: "0 auto" }}>
              <FaHeart className="text-success" />
            </div>
            <h5>Easy Process</h5>
            <p>Seamless application & tracking makes adoption easy.</p>
          </Col>
        </Row>
      </Container>

      {/* Pet Care Guides */}
      <Container className="my-5">
        <h3 className="text-center fw-bold mb-4">Pet Care Guides</h3>
        <Row>
          {[
            { title: "Summer Care Tips", text: "Keep your pet cool and hydrated.", link: "/care-guides" },
            { title: "Nutrition Basics", text: "Best food practices for your pets.", link: "/care-guides" },
            { title: "Daily Exercise", text: "Simple ways to keep pets active.", link: "/care-guides" },
          ].map((guide, idx) => (
            <Col md={4} key={idx}>
              <Card className="shadow-sm border-0 mb-4">
                <CardBody>
                  <CardTitle tag="h5" className="fw-bold">{guide.title}</CardTitle>
                  <CardText>{guide.text}</CardText>
                  <Button tag={Link} to={guide.link} color="secondary" size="sm">Read More</Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Testimonials */}
      <Container className="my-5">
        <h3 className="text-center fw-bold mb-4">Happy Tails</h3>
        <Row>
          {[
            { quote: "We found our sweet dog Max through Paws @ Zenith. The process was easy!", name: "Emily & Max" },
            { quote: "Adopting Luna was the best decision. She brings joy every day.", name: "Sarah & Luna" },
          ].map((testimony, idx) => (
            <Col md={6} key={idx}>
              <Card className="p-4 shadow-sm mb-3 rounded-4 border-0 bg-white">
                <CardText className="fst-italic">“{testimony.quote}”</CardText>
                <small className="text-muted d-block mt-2">— {testimony.name}</small>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Store CTA */}
      <Container fluid className="text-center py-5 bg-warning bg-gradient text-dark">
        <h3 className="fw-bold mb-2">Shop Pet Essentials</h3>
        <p className="lead mb-4">Food, toys, grooming supplies & more — all in one place.</p>
        <Button tag={Link} to="/store" color="dark" size="lg" className="fw-bold rounded-pill px-5">
          Visit Store
        </Button>
      </Container>
    </Container>
  );
};

export default Home;
