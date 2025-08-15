import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, Spinner, Alert } from "reactstrap";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/store/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError("Failed to load product.");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product._id,
        quantity: 1,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/cart");
      })
      .catch((err) => console.error("Error adding to cart:", err));
  };

  if (loading) return <Spinner color="primary" className="d-block mx-auto mt-5" />;
  if (error) return <Alert color="danger" className="text-center mt-5">{error}</Alert>;

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <Card>
            <CardImg src={product.image || "https://via.placeholder.com/300"} alt={product.name} />
          </Card>
        </Col>
        <Col md={6}>
          <CardBody>
            <CardTitle tag="h3">{product.name}</CardTitle>
            <CardText className="text-muted">{product.description}</CardText>
            <CardText><strong>Price:</strong> ${product.price.toFixed(2)}</CardText>
            <Button color="success" onClick={handleAddToCart}>Add to Cart</Button>
          </CardBody>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
