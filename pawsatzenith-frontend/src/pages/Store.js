import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Store.css';
import { Button, Container, Row, Col, Spinner, Card, CardImg, CardBody, CardTitle, CardText, Alert } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify'; // Toast notification for feedback
import 'react-toastify/dist/ReactToastify.css';

const Store = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch Store Items
  useEffect(() => {
    fetch("http://localhost:5000/api/store")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch store items");
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching store items:", err);
        setError("There was an error fetching store items. Please try again.");
        setLoading(false);
      });
  }, []);

  // Navigate to Product Details Page
  const handleViewDetails = (id) => {
    console.log("Navigating to product:", id);
    navigate(`/product/${id}`);
  };

  // Add Item to Cart
  const handleAddToCart = (item) => {
    fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: item._id,
        quantity: 1, // Default quantity is 1
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Item added to cart:", data);
        toast.success("Item added to cart!"); // Show success toast
        navigate("/cart"); // Redirect to Cart after adding
      })
      .catch((err) => {
        console.error("Error adding to cart:", err);
        toast.error("Error adding item to cart.");
      });
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">🐾 Pet Store</h2>

      {/* Loading State */}
      {loading && (
        <div className="text-center">
          <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
          <p className="mt-2">Loading store items...</p>
        </div>
      )}

      {/* Error Handling */}
      {error && (
        <Alert color="danger" className="text-center">
          {error}
        </Alert>
      )}

      {/* Store Items */}
      {!loading && !error && (
        <Row>
          {items.length > 0 ? (
            items.map((item) => (
              <Col md={4} sm={6} key={item._id} className="mb-4">
                <Card className="shadow-sm border-light h-100">
                  <CardImg
                    top
                    src={item.image || 'https://via.placeholder.com/300'}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <CardBody className="d-flex flex-column text-center">
                    <CardTitle tag="h5" className="text-primary">{item.name}</CardTitle>
                    <CardText><strong>Price:</strong> ${item.price.toFixed(2)}</CardText>
                    <CardText className="text-muted">{item.description}</CardText>

                    <div className="mt-auto">
                      <Button
                        color="success"
                        className="w-100 mb-2"
                        onClick={() => handleAddToCart(item)}
                      >
                        🛒 Add to Cart
                      </Button>
                      <Button
                        color="primary"
                        className="w-100"
                        onClick={() => handleViewDetails(item._id)}
                      >
                        🔍 View Details
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center">
              <p>No items available in the store.</p>
            </Col>
          )}
        </Row>
      )}

      {/* Toast Notification */}
      <ToastContainer />

    </Container>
  );
};

export default Store;
