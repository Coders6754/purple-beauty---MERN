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

const handleFilter = (e) => {
  const { value } = e.target;
  getUser(page, value, "");
};
const handleFilter1 = (e) => {
  const { value } = e.target;
  getUser(page, "", value);
};

const handlePage = (val) => {
  let value = val + page;
  setPage(value);
};

const handleChange = (e) => {
  const { value, name } = e.target;
  setState({ ...state, [name]: value });
}
const handleSubmit = async (e) => {
  e.preventDefault();
  let res = await fetch(`${BackendURL}/user/update/${id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          "email": localStorage.getItem("email")
      },
      body: JSON.stringify(state)
  }).then((res) => res.json()).then((res) => {
      console.log(res);
      alert(`${res.msg}`);
      getUser(page);
  }).catch((err) => {
      console.log(err)
  });
  setState({ name: "", email: "", address: "" });
};


const getUser = async (page, qu = "", qa = "") => {
  setLoading(true);
  setTimeout(() => {
      setLoading(false)
  }, 5000);
  let res = await fetch(`${BackendURL}/user/?page=${page}&limit=5&name=${qu}&address=${qa}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "email": localStorage.getItem("email")
      }
  }).then((res) => res.json()).then((res) => {
      setLoading(false);
      SetError(false);
      if (res.status === "NO") {
          alert("You are not Admin");
          navigate("/");
      }
      if (res.message === "OK") {
          setUsers(res.user)
      }
  }).catch((err) => {
      setLoading(false);
      SetError(true);
      console.log(err)
  });
};


const handleUpdate = (id) => {
  setID(id);
  onOpen();
};

const handleRemove = async (_id) => {
  let res = await fetch(`${BackendURL}/user/delete/${_id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          "email": localStorage.getItem("email")
      },
  }).then((res) => res.json()).then((res) => {
      console.log(res);
      getUser(page);
      alert(`${res.msg}`)
  }).catch((err) => {
      console.log(err)
  });
};

// const handleUploadInCloudinary = () => {
//     const data = new FormData();
//     data.append("file", Cloudinary);
//     data.append("upload_preset", "ml_default");
//     data.append("cloud_name", "djib5oxng");

//     // cloudinary setup
//     fetch("https://api.cloudinary.com/v1_1/dd9cmhunr/image/upload", {
//         method: "POST",
//         body: data,
//     })
//         .then((res) => res.json())
//         .then((data) => {
//             localStorage.setItem('cloudinary', data.url);
//         })
//         .catch((err) => {
//             console.log(err);
//         });

// };

const handleProdChange = (e) => {
  let { type, name, value, files } = e.target;
  value = type === 'file' ? files[0] : value;
  setFormData({ ...formData, [name]: value });
};

// post request for add a poduct
const handleSubmitProd = async (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("file", formData.image_link);
  data.append("upload_preset", "ml_default");
  data.append("cloud_name", "djib5oxng");

  // cloudinary setup
  fetch("https://api.cloudinary.com/v1_1/dd9cmhunr/image/upload", {
      method: "POST",
      body: data,
  })
      .then((res) => res.json())
      .then((data) => {
          localStorage.setItem('cloudinary', data.url);
      })
      .catch((err) => {
          console.log(err);
      });

  setLoading(true);
  setTimeout(() => {
      setLoading(false);
      addProductFunc();
  }, 4000);
};
