import { FaFacebook, FaGoogle } from "react-icons/fa";
import {
  commonClassNameOfInput,
  Caption,
  Container,
  CustomNavLink,
  PrimaryButton,
  Title,
} from "../../components/common/Design";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, RESET } from "../../redux/features/authSlice";
import  Loader  from "../../components/common/Loader";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, confirmPassword } = formData;

  const { isLoading, isSuccess, isLoggedIn, message, isError } =
    useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      return toast.error("All Fields are required");
    }

    if (password.length < 8) {
      return toast.error("Password should be at least 8 characters long");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      name,
      email,
      password,
    };
    dispatch(register(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/login");
    }

    if (isError) {
      toast.error(message || "Registration failed");
    }

    return () => {
      dispatch(RESET());
    };
  }, [dispatch, message, isLoggedIn, isSuccess, isError, navigate]);

  return (
    
    <>
      {isLoading && <Loader />}
      <section className="regsiter pt-16 relative">
        <div className="bg-green w-96 h-96 rounded-full opacity-20 blur-3xl absolute top-2/3"></div>
        <div className="bg-[#241C37] pt-8 h-[40vh] relative content">
          <Container>
            <div>
              <Title level={3} className="text-white">
                Sign Up
              </Title>
              <div className="flex items-center gap-3">
                <Title level={5} className="text-green font-normal text-xl">
                  Home
                </Title>
                <Title level={5} className="text-white font-normal text-xl">
                  /
                </Title>
                <Title level={5} className="text-white font-normal text-xl">
                  Sign Up
                </Title>
              </div>
            </div>
          </Container>
        </div>
        <form
          onSubmit={handleRegister}
          className="bg-white shadow-s3 w-full md:w-1/3 m-auto my-16 p-8 rounded-xl"
        >
          <div className="text-center">
            <Title level={5}>Sign Up</Title>
            <p className="mt-2 text-lg">
              Do you already have an account?{" "}
              <CustomNavLink href="/login">Log In Here</CustomNavLink>
            </p>
          </div>
          <div className="py-5">
            <Caption className="mb-2">Username *</Caption>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              className={commonClassNameOfInput}
              placeholder="First Name"
            />
          </div>
          <div className="py-5">
            <Caption className="mb-2">Enter Your Email *</Caption>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className={commonClassNameOfInput}
              placeholder="Enter Your Email"
            />
          </div>
          <div>
            <Caption className="mb-2">Password *</Caption>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className={commonClassNameOfInput}
              placeholder="Enter Your Password"
            />
          </div>
          <div>
            <Caption className="mb-2">Confirm Password *</Caption>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              className={commonClassNameOfInput}
              placeholder="Confirm password"
            />
          </div>
          <div className="flex items-center gap-2 py-4">
            <input type="checkbox" />
            <Caption>I agree to the Terms & Policy</Caption>
          </div>
          <PrimaryButton className="w-full rounded-none my-5">
            CREATE ACCOUNT
          </PrimaryButton>
          <p className="text-center mt-5">
            By clicking the signup button, you create a account, and you agree
            to <span className="text-green underline">Terms & Conditions</span>{" "}
            &<span className="text-green underline"> Privacy Policy </span> .
          </p>
        </form>
        <div className="bg-green w-96 h-96 rounded-full opacity-20 blur-3xl absolute bottom-96 right-0"></div>
      </section>
    </>
  );
};
