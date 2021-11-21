import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { auth } from "../../utils/firebaseConfig";
import styles from "./Navbar.module.css";
import logo from "../../images/logo.svg";
import homelogo from "../../icons/home_logo.svg";
import loginLogo from "../../icons/login_logo.svg";
import especialisLogo from "../../icons/especialist_logo.svg";
import pacientLogo from "../../icons/paciente_logo.svg";
import logOut from "../../icons/logout.svg";
