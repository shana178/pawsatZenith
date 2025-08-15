import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
  Card,
  CardBody,
  CardText,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/cart", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
        setError("Failed to load cart.");
        setLoading(false);
      });
  }, []);

  const totalAmount = cartItems.reduce((total, item) => {
    return total + (item.product?.price || 0) * item.quantity;
  }, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (!form.name || !form.phone || !form.address || !form.cardNumber || !form.expiry || !form.cvv) {
      setError("Please fill in all fields.");
      return;
    }

    setPlacingOrder(true);
    fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        items: cartItems,
        shippingInfo: {
          name: form.name,
          phone: form.phone,
          address: form.address,
        },
        paymentInfo: {
          cardNumber: form.cardNumber,
          expiry: form.expiry,
          cvv: form.cvv,
        },
        totalAmount,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Order failed");
        return res.json();
      })
      .then(() => {
        setOrderSuccess(true);
        setPlacingOrder(false);
      })
      .catch((err) => {
        console.error("Order error:", err);
        setError("Failed to place order.");
        setPlacingOrder(false);
      });
  };

  if (loading) return <Spinner color="primary" className="d-block mx-auto mt-5" />;
  if (error) return <Alert color="danger" className="text-center mt-5">{error}</Alert>;
  if (orderSuccess) return <Alert color="success" className="text-center mt-5">🎉 Order placed successfully!</Alert>;

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Checkout</h2>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <Row>
            {cartItems.map((item) => (
              <Col md={6} key={item._id} className="mb-4">
                <Card>
                  <CardBody>
                    <CardText><strong>{item.product?.name}</strong></CardText>
                    <CardText>Qty: {item.quantity}</CardText>
                    <CardText>Subtotal: ${(item.product?.price * item.quantity).toFixed(2)}</CardText>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>

          <h4 className="text-center mt-4 mb-4">Total: <strong>${totalAmount.toFixed(2)}</strong></h4>

          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>Full Name</Label>
                  <Input type="text" name="name" value={form.name} onChange={handleChange} required />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Phone Number</Label>
                  <Input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label>Shipping Address</Label>
              <Input type="textarea" name="address" value={form.address} onChange={handleChange} rows={2} required />
            </FormGroup>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>Card Number</Label>
                  <Input type="text" name="cardNumber" value={form.cardNumber} onChange={handleChange} required />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label>Expiry</Label>
                  <Input type="text" name="expiry" value={form.expiry} onChange={handleChange} required />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label>CVV</Label>
                  <Input type="password" name="cvv" value={form.cvv} onChange={handleChange} required />
                </FormGroup>
              </Col>
            </Row>

            <div className="text-center mt-4">
              <Button color="success" onClick={handlePlaceOrder} disabled={placingOrder}>
                {placingOrder ? "Placing Order..." : "Place Order"}
              </Button>
            </div>
          </Form>
        </>
      )}
    </Container>
  );
};

export default Checkout;
