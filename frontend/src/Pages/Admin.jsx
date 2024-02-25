import React, { useEffect } from "react";
import BackendURL from "../BackendURL";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Heading,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Th,
  TableContainer,
} from "@chakra-ui/react";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";

let init = {
  prod_name: "",
  price: "",
  image_link: "",
  description: "",
};

const Admin = () => {
  const [formData, setFormData] = useState(init);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, SetError] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setID] = useState("");
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('');
  const [state, setState] = useState({
      name: "",
      email: "",
      address: ""
  });

  useEffect(() => {
      getUser(page);
      getOrders();
  }, [page]);

  const getOrders = async () => {
    let res = await fetch(`${BackendURL}/order/getall`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "email": localStorage.getItem("email"),
            "token": localStorage.getItem("token")
        }
    }).then((res) => res.json())
        .then((res) => {
            setOrders(res.delivered);
        }).catch((err) => {
            console.log(err)
        })
};

const handleChangeStatus = async (id) => {
    if (!status) {
        return alert("Please fill correct Status");
    };
    let res = await fetch(`${BackendURL}/order/changestatus`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "email": localStorage.getItem("email"),
            "token": localStorage.getItem("token")
        },
        body: JSON.stringify({ status, orderId: id })
    }).then((res) => res.json()).then((res) => {
        console.log(res);
        getOrders();
        alert(`${res.msg}`);
    }).catch((err) => {
        console.log(err)
    });
    setStatus("");
};

// console.log(orders);