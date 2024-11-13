import {
  commonClassNameOfInput,
  Caption,
  Container,
  PrimaryButton,
  Title,
} from "../../components/common/Design";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword } from "../../redux/features/authSlice";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const { isLoading, isSuccess } = useSelector((state) => state.auth);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    await dispatch(forgotPassword(email));
    if (isSuccess) {
      navigate("/reset-password");
    }
  };

  return (
    <>
      <section className="regsiter pt-16 relative">
        <div className="bg-green w-96 h-96 rounded-full opacity-20 blur-3xl absolute top-2/3"></div>
        <div className="bg-[#241C37] pt-8 h-[40vh] relative content">
          <Container>
            <div>
              <Title level={3} className="text-white">
                Forgot Password
              </Title>
              <div className="flex items-center gap-3">
                <Title level={5} className="text-green font-normal text-xl">
                  Home
                </Title>
                <Title level={5} className="text-white font-normal text-xl">
                  /
                </Title>
                <Title level={5} className="text-white font-normal text-xl">
                  Forgot Password
                </Title>
              </div>
            </div>
          </Container>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-s3 w-full md:w-1/3 m-auto my-16 p-8 rounded-xl"
        >
          <div className="text-center">
            <Title level={5}> Forgot Your Password?</Title>
            <p className="text-gray-600 mb-6 text-center">
              Enter your email address below and we'll send you a OTP to reset
              your password.
            </p>
          </div>

          <div className="py-5">
            <Caption className="mb-2">Enter Your Email *</Caption>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className={commonClassNameOfInput}
              placeholder="Enter Your Email"
              required
            />
          </div>
          <PrimaryButton className="w-full rounded-none my-5">
             {isLoading ? "Sending" :"Send OTP"}
          </PrimaryButton>
        </form>
        <div className="bg-green w-96 h-96 rounded-full opacity-20 blur-3xl absolute bottom-96 right-0"></div>
      </section>
    </>
  );
};
