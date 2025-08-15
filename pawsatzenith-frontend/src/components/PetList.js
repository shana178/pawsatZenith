import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPets } from "../redux/petSlice";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Spinner, Button } from "reactstrap";
import { Link } from "react-router-dom";

const PetList = ({ search }) => {
  const dispatch = useDispatch();
  const { pets, loading, error } = useSelector((state) => state.pets);

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  if (loading)
    return (
      <div className="text-center">
        <Spinner color="primary" />
        <p>Loading pets...</p>
      </div>
    );

  if (error) return <p className="text-danger text-center">{error}</p>;

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Row className="g-4">
      {filteredPets.length > 0 ? (
        filteredPets.map((pet) => (
          <Col md={4} sm={6} key={pet._id}>
            <Card className="shadow-lg border-0 rounded-3 overflow-hidden">
              {/* Image */}
              <div style={{ height: "250px", overflow: "hidden" }}>
                <CardImg
                  top
                  src={pet.images || "https://via.placeholder.com/300"}
                  alt={pet.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    transition: "transform 0.3s ease-in-out",
                  }}
                />
              </div>

              {/* Card Body */}
              <CardBody className="p-4 text-center">
                <CardTitle tag="h5" className="text-primary mb-2" style={{ fontWeight: "600" }}>
                  {pet.name}
                </CardTitle>
                <CardText className="text-muted mb-3">{pet.breed}</CardText>

                {/* Button */}
                <Button
                  color="primary"
                  tag={Link}
                  to={`/pets/${pet._id}`}
                  className="rounded-pill px-4 py-2"
                  style={{
                    backgroundColor: "#FFA500", // Orange
                    borderColor: "#FFA500",
                    transition: "background-color 0.3s ease",
                    width: "100%",
                  }}
                >
                  More Details
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))
      ) : (
        <p className="text-center">No pets found</p>
      )}
    </Row>
  );
};

export default PetList;
