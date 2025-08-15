import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Input,
  Spinner,
} from "reactstrap";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/cart")
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
        setError("Failed to load cart items.");
        setLoading(false);
      });
  }, []);

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    fetch(`http://localhost:5000/api/cart/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    })
      .then((res) => res.json())
      .then((updatedItem) => {
        setCartItems(
          cartItems.map((item) =>
            item._id === id ? { ...item, quantity: updatedItem.quantity } : item
          )
        );
      })
      .catch((err) => console.error("Error updating quantity:", err));
  };

  const handleRemoveFromCart = (id) => {
    fetch(`http://localhost:5000/api/cart/${id}`, { method: "DELETE" })
      .then(() => {
        setCartItems(cartItems.filter((item) => item._id !== id));
      })
      .catch((err) => console.error("Error removing item:", err));
  };

  const totalAmount = cartItems.reduce((total, item) => {
    return total + (item.product?.price || 0) * item.quantity;
  }, 0);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (loading) return <Spinner color="primary" className="d-block mx-auto mt-5" />;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <Card key={item._id} className="cart-item shadow-sm mb-4" style={{ display: 'flex', flexDirection: 'row', padding: '10px', alignItems: 'center' }}>
                <CardImg
                  src={item.product?.image || "https://via.placeholder.com/150"}
                  alt={item.product?.name || "Product Image"}
                  className="img-fluid"
                  style={{ width: '150px', height: '150px', objectFit: 'cover', marginRight: '20px' }}
                />
                <CardBody style={{ flex: 1 }}>
                  <CardTitle tag="h5">{item.product?.name || "No Name"}</CardTitle>
                  <CardText>
                    <strong>Price:</strong> ${item.product?.price ? (item.product.price * item.quantity).toFixed(2) : "N/A"}
                  </CardText>
                  <CardText>
                    <strong>Quantity:</strong>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item._id, parseInt(e.target.value))}
                      style={{ width: "80px", textAlign: "center" }}
                    />
                  </CardText>
                  <Button color="danger" onClick={() => handleRemoveFromCart(item._id)}>
                    Remove
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="text-center mt-4">
            <h4>Total Amount: <strong>${totalAmount.toFixed(2)}</strong></h4>
            <Button
              color="success"
              className="mt-3 px-5"
              size="lg"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;
