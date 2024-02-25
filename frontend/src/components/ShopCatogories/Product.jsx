import React, { useEffect, useState } from "react";
// import axios from "axios";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import {
  GetToProduct,
  GetToQueryProduct,
  GetToSearchQueryProduct,
} from "../../redux/prod/prod.action";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import ProductFunctionality from "./ProductFunctionality";
// The default icon size is 1em (16px)

const Product = () => {
  const [productData, setProductData] = useState([]);
  // const [length, setLength] = useState(20);
  const [mapData, setMapData] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const { prod } = useSelector((store) => store);

  const setLengthFunction = () => {
    // console.log("bjabxh");
    setMapData(prod.data);
  };