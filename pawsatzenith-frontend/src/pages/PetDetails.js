import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Spinner,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";
import { useSelector } from "react-redux";

const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);

  const user = useSelector((state) => state.user?.userInfo || null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/pets/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPet(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching pet details");
        setLoading(false);
      });
  }, [id]);

  const toggleModal = () => setModalOpen(!modalOpen);
  const toggleLoginPrompt = () => setLoginPromptOpen(!loginPromptOpen);

  const handleAdopt = async () => {
    if (!user) {
      toggleLoginPrompt();
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/adoptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ pet: pet._id, message: "I would love to adopt!" }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Adoption request submitted successfully!");
        toggleModal();
      } else {
        alert(`Failed to submit: ${data.message}`);
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  };

  if (loading)
    return (
      <Container className="text-center my-5">
        <Spinner color="primary" />
      </Container>
    );

  if (error)
    return (
      <Container className="text-center my-5">
        <Alert color="danger">{error}</Alert>
      </Container>
    );

  return (
    <Container className="my-5">
      {/* Breadcrumb */}
      <div className="mb-4">
        <Link to="/pets" className="text-muted text-decoration-none">
          ← Back to All Pets
        </Link>
      </div>

      {/* Success Message */}
      {successMessage && (
        <Alert color="success" toggle={() => setSuccessMessage(null)} fade>
          {successMessage}
        </Alert>
      )}

      <Row className="d-flex align-items-center">
        {/* Image Section */}
        <Col lg="6" className="order-lg-1 order-2 p-0 mb-4 mb-lg-0">
          <CardImg
            src={pet.images || "https://via.placeholder.com/500"}
            alt={pet.name}
            className="img-fluid rounded-start"
            style={{
              objectFit: "cover",
              height: "100%",
              width: "100%",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Col>

        {/* Info Section */}
        <Col lg="6" className="order-lg-2 order-1">
          <Card className="shadow-lg">
            <CardBody className="p-4">
              <CardTitle tag="h2" className="text-primary">
                {pet.name}
              </CardTitle>
              <CardText>
                <strong>Breed:</strong> {pet.breed}
              </CardText>
              <CardText>
                <strong>Age:</strong> {pet.age} years
              </CardText>
              <CardText>
                <strong>Size:</strong> {pet.size}
              </CardText>
              <CardText>
                <strong>Status:</strong> {pet.adoptionStatus}
              </CardText>
              <CardText>
                <strong>Description:</strong> {pet.description || "No description available."}
              </CardText>

              {/* Action Buttons */}
              <div className="d-flex flex-column flex-md-row justify-content-start gap-3 mt-4">
                {pet.adoptionStatus === "available" && (
                  <Button color="success" className="w-100 w-md-auto" onClick={toggleModal}>
                    Adopt
                  </Button>
                )}
                <Button color="link" className="p-0 mt-2 mt-md-0" onClick={() => alert("Coming soon: Save to favorites!")}>
                  ❤️ Save to Favorites
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Adoption Confirmation Modal */}
      <Modal isOpen={modalOpen} toggle={toggleModal} centered>
        <ModalHeader toggle={toggleModal}>Adopt {pet.name}</ModalHeader>
        <ModalBody>
          Are you sure you want to submit an adoption request for {pet.name}?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAdopt}>
            Confirm
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Login Prompt Modal */}
      <Modal isOpen={loginPromptOpen} toggle={toggleLoginPrompt} centered>
        <ModalHeader toggle={toggleLoginPrompt}>Login Required</ModalHeader>
        <ModalBody>
          You need to <Link to="/login">log in</Link> to submit an adoption request.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" tag={Link} to="/login">
            Go to Login
          </Button>
          <Button color="secondary" onClick={toggleLoginPrompt}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default PetDetails;
