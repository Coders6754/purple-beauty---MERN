import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiFillHome } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Shop from "../NavItem/Shop";
import { useDispatch } from "react-redux";
import { GetToQueryProduct } from "../../../redux/prod/prod.action";

let shop = [
  "Cream",
  "bb_cc",
  "Powder",
  "Foundation",
  "Concealer",
  "Bronzer",
  "Contour",
  "Blush",
  "Highlighter",
  "nail_polish",
  "gel",
  "Lipstick",
  "Liquid",
  "Lip Liner",
  "Lip Gloss",
  "Pencil",
  "Palette",
  "Eye Liner",
  "Eye Shadow",
];
