import {
  Box,
  Button,
  Divider,
  Image,
  Input,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import BackendURL from "../BackendURL";
import "./Payment.css";
const Payment = () => {
  const [cart, setCart] = useState([]);
  let userid = localStorage.getItem("uproid");
  useEffect(() => {
    fetch(`${BackendURL}/cart/fetchcartItem`, {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setCart(res[0].products);
      })
      .catch((err) => console.log(err));
  }, []);

  const removeItemFromCart = () => {
    fetch(`${BackendURL}/cart/changecartactive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ cartId: localStorage.getItem("cartItem") }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleOrder = () => {
    fetch(`${BackendURL}/order/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        priceTotal: 20,
        paymentMethod: "cash",
        DeliveryAdress: "abcd",
        cartId: localStorage.getItem("cartItem"),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        removeItemFromCart();
        console.log(res);
      })
      .catch((err) => console.log(err));

    fetch(`${BackendURL}/cart/delete/${userid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => console.log("Order Placed"))
      .catch((err) => console.log(err));
    alert("Successfully placed order");
    return (window.location.href = "/");
  };

  let total = Math.round(
    cart.reduce((a, c) => (a + c.productId.price) * c.quantity, 0)
  );
  // total = total;
  var date = new Date();
  var month = date.toLocaleString("default", { month: "short" });
  var day = date.toLocaleString("default", { day: "2-digit" });
  return (
    <Box className="Payment-container">
      <Box className="payment-left-container">
        <Box className="creditcard-container">
          <Box className="Creditecard">Credit/Debit Card</Box>
          <Box className="creditcard-form">
            <Input className="inputbox" placeholder="Enter Name on Card" />
            <Box display={"flex"} justifyContent="space-between">
              <Input
                className="inputbox"
                placeholder="Card Number"
                width={["200px", "230px", "250px"]}
              />
              <Box
                display={"flex"}
                alignItems="center"
                justifyContent={"center"}
                border={"1px solid #d0d0d0"}
              >
                <input style={{ width: "60px" }} placeholder="CVV" />
                <Image
                  src="https://media6.ppl-media.com/mediafiles/ecomm/misc/1516175146_cvv.jpg"
                  alt="cvv"
                  width={"30px"}
                  height="20px"
                />
              </Box>
            </Box>
            <Box display={"flex"} justifyContent="space-between">
              <Input width={"45%"} placeholder="Expiry MM" />
              <Input width={"45%"} placeholder="Expiry YY" />
            </Box>
            <Box>
              <Button
                bg={"#e40980"}
                width="40%"
                borderRadius="0px"
                _hover={{ bg: "#e40980" }}
                color="white"
                mb={5}
                onClick={handleOrder}
              >
                PAY ₹{total}
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className="creditcard-container">
          <Box className="Creditecard">Net Banking</Box>
          <Box className="banklogo-cont">
            <Box>
              <Image
                className="banklogo"
                src="https://png.pngitem.com/pimgs/s/23-238440_axis-bank-png-logo-of-axis-bank-transparent.png"
                alt="Axis"
              />
              <Text>AXIS</Text>
            </Box>
            <Box>
              <Image
                className="banklogo"
                src="https://companieslogo.com/img/orig/HDB-bb6241fe.png?t=1633497370"
                alt="hdfc"
              />
              <Text>HDFC</Text>
            </Box>
            <Box>
              <Image
                className="banklogo"
                src="https://i.pinimg.com/originals/ff/d5/31/ffd531a6a78464512a97848e14506738.png"
                alt="ICICI"
              />
              <Text>ICICI</Text>
            </Box>
            <Box>
              <Image
                className="banklogo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/240px-SBI-logo.svg.png"
                alt="SBI"
              />
              <Text>SBI</Text>
            </Box>
            <Box>
              <Image
                className="banklogo"
                src="https://companieslogo.com/img/orig/KOTAKBANK.NS-36440c5e.png?t=1593960269"
                alt="KOTAK"
              />
              <Text>KOTAK</Text>
            </Box>
          </Box>
          <Select
            placeholder="Select a Bank"
            width={"50%"}
            h="30px"
            mb="10px"
            ml="3"
          >

            