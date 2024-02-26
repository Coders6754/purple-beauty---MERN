import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import NavItem from "./NavbarItem/NavItem";
import logo from "../../image/P.png";
import { CiFaceSmile, CiHeart, CiSearch, CiShoppingCart } from "react-icons/ci";
import { AuthContext } from "../../Utilis/Auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
   // GetToQueryProduct,
   GetToSearchQueryProduct,
  } from "../../redux/prod/prod.action";
  import Navmenu from "./NavbarItem/Navmenu";
  
  const Navbar = () => {
    let user;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { logout } = useContext(AuthContext);
    let users = JSON.parse(localStorage.getItem("userName")) || null;
  
    if (users) {
      user = users.user;
    }
    const btnRef = React.useRef();
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    let [query, setQuery] = useState();
    const handleSearch = () => {
      if (!query) {
        return alert("Your Query is empty");
      }
      dispatch(GetToSearchQueryProduct(query));

      Navigate("/productmain", { state: { q: "S", query } });
      // console.log(query);
    };

    return (
      <Flex
        m="auto"
        // ml="12px"
        pl="18px"
        pr="18px"
        position={"sticky"}
        top="0px"
        zIndex={999}
        bg="white"
        mb="5px"
      >