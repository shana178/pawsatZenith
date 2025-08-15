import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPets } from "../redux/petSlice";
import { fetchSession, logout } from "../redux/userSlice"; 
import { Container, Row, Col, Form, Input, Spinner, Card, CardImg, CardBody, CardTitle, CardText, Button, Alert } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Box } from 'rebass';
import { FaSearch } from "react-icons/fa"; 

const Pets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pets, loading, error } = useSelector((state) => state.pets);
  const { userInfo } = useSelector((state) => state.user);

  const [search, setSearch] = useState("");
  const [filteredPets, setFilteredPets] = useState([]);

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  useEffect(() => {
    setFilteredPets(
      pets.filter((pet) => pet.name.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, pets]);

  useEffect(() => {
    if (!userInfo) {
      dispatch(fetchSession()); 
    }
  }, [dispatch, userInfo]);

  const handleManageAdoptionsClick = () => {
    if (userInfo) {
      navigate("/dashboard");
    } else {
      alert("Please log in to manage adoptions.");
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4" style={{ fontFamily: "Poppins, sans-serif", fontWeight: "600", fontSize: "2rem", color: "#333" }}>
        Adopt a Pet
      </h2>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          color="secondary"
          onClick={handleManageAdoptionsClick}
          disabled={!userInfo}
          sx={{
            backgroundColor: userInfo ? "#FF8C00" : "#ccc", 
            borderColor: "#FF8C00",
            fontWeight: "bold",
            padding: "10px 20px",
            transition: "all 0.3s ease",
            ":hover": { backgroundColor: "#ff7a00" },
          }}
        >
          Manage Adoptions
        </Button>
      </Box>

      <Form className="mb-4 d-flex justify-content-center">
        <div className="position-relative" style={{ width: "60%", maxWidth: "500px" }}>
          <Input
            type="text"
            placeholder="Search by pet name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              borderRadius: "50px",
              paddingLeft: "40px",
              backgroundColor: "#f9f9f9",
              fontSize: "16px",
              border: "1px solid #ddd",
              height: "45px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
            }}
          />
          <FaSearch
            className="position-absolute"
            style={{ top: "50%", left: "10px", transform: "translateY(-50%)", color: "#aaa" }}
          />
        </div>
      </Form>

      {loading ? (
        <div className="text-center">
          <Spinner color="primary" />
          <p>Loading pets...</p>
        </div>
      ) : error ? (
        <Alert color="danger" className="text-center">
          Error: {error}
        </Alert>
      ) : (
        <Row className="g-4">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <Col md={4} sm={6} key={pet._id}>
                <Card
                  className="shadow-sm border-0 rounded-3 overflow-hidden"
                  style={{ transition: "all 0.3s ease" }}
                >
                  <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                    <CardImg
                      top
                      src={pet.images || "https://via.placeholder.com/300"}
                      alt={pet.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </div>
                  <CardBody className="text-center p-4">
                    <CardTitle tag="h5" className="text-primary" style={{ fontWeight: "500" }}>
                      {pet.name}
                    </CardTitle>
                    <CardText className="text-muted">{pet.breed}</CardText>
                    <Button
                      color="primary"
                      tag={Link}
                      to={`/pets/${pet._id}`}
                      className="rounded-pill w-100 mt-3"
                      style={{
                        backgroundColor: "#FF8C00", 
                        borderColor: "#FF8C00",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      More Details
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">No pets found. Please try a different search.</p>
          )}
        </Row>
      )}

      {loading && (
        <Row>
          {[...Array(6)].map((_, index) => (
            <Col md={4} sm={6} key={index}>
              <Card className="shadow-sm border-0 rounded-3 overflow-hidden">
                <Skeleton height={200} width="100%" />
                <CardBody className="text-center p-4">
                  <Skeleton width="60%" />
                  <Skeleton width="80%" />
                  <Skeleton width="40%" />
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Pets;
