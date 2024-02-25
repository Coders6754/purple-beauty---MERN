import React, { useEffect, useState } from "react";
import "./Cart.css";
import BackendURL from "../BackendURL";
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Divider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  // CardFooter,
  Stack,
  CardBody,
  Heading,
  Card,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [pin, setPin] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [cartId, setCartId] = useState("");