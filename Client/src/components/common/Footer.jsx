import React from "react";
import { useLocation } from "react-router-dom";
import { Container, PrimaryButton, ProfileCard, Title } from "./Design";
import { FiPhoneOutgoing } from "react-icons/fi";
import { MdOutlineAttachEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { CiTwitter } from "react-icons/ci";

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <footer className="relative py-16 mt-16 bg-primary">
      {isHomePage && (
        <div className="bg-white w-full py-20 -mt-10 rounded-b-[40px] z-10 absolute top-0"></div>
      )}

      <Container
        className={`${
          isHomePage ? "mt-32" : "mt-0"
        } flex flex-col md:flex-row  justify-between gap-12 mb-5`}
      >
        <div className="w-full md:w-1/3">
          <img src="../../../images/common/header-logo.png" alt="" />
          <br />
          <p className="text-gray-300">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            aperiam delectus.
          </p>
          <div className="bg-gray-300 h-[1px] my-8" />
          <Title className="font-normal text-gray-100">
            Contact Through Email
          </Title>

          <div className="max-w-md mx-auto mt-6">
            <div className="relative">
              <input
                type="email"
                // value={email}
                // onChange={handleEmailChange}
                placeholder="Enter your email"
                className="w-full pl-4 pr-16 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Enter your email"
              />
              <PrimaryButton
                  // onClick={handleEmailSubmit}
                className="mt-0 w-auto flex items-center justify-center absolute right-1 top-1 bottom-1 bg-primary text-white rounded-full px-5 font-semibold transition-colors duration-300 hover:bg-primary-dark"
                aria-label="Start free trial"
              >
                Submit
              </PrimaryButton>
            </div>
          </div>

          <p className="text-gray-100 text-sm mt-1">
            Email is safe, We don't spam
          </p>
        </div>

          <div>
            <Title level={5} className="font-normal text-white">
               Categories
            </Title>
            <ul className="flex flex-col gap-5 mt-8 text-gray-200">
              <li>Ending Now</li>
              <li>Vehicles</li>
              <li>Watches</li>
              <li>Electronics</li>
              <li>Real Estate</li>
              <li>Jewelry</li>
              <li>Arts</li>
              <li>Sports and Outdoors</li>
            </ul>
          </div>

          <div>
            <Title level={5} className="font-normal text-white">
              About Us
            </Title>
            <ul className="flex flex-col gap-5 mt-8 text-gray-200">
              <li>About Bid</li>
              <li>Help</li>
              <li>Affiliate</li>
              <li>Jobs</li>
              <li>Press</li>
              <li>Our Blog</li>
            </ul>
          </div>

          <div>
            <Title level={5} className="font-normal text-white">
              Need Help?
            </Title>
            <ul className="flex flex-col gap-5 mt-8 text-gray-200">
              <li>Your Account</li>
              <li>Safe & Secure</li>
              <li>Shipping Information</li>
              <li>Contact Us</li>
              <li>Help & FAQs</li>
            </ul>
          </div>

          <div>
            <Title level={5} className="font-normal text-white">
              Follow Us
            </Title>
            <ul className="flex flex-col gap-5 mt-8 text-gray-200">
              <li className="flex items-center gap-2">
                <FiPhoneOutgoing size={19} />
                <span>+92300-000000</span>
              </li>
              <li className="flex items-center gap-2">
                <MdOutlineAttachEmail size={19} />
                <span>admin@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <IoLocationOutline size={19} />
                <span>Islamia University Bahawalpur</span>
              </li>
            </ul>

            <div className="flex items-center md:justify-between gap-5 text-white mt-5">
                <FaLinkedin size={26} />
             
                <CiTwitter size={26} />
             
                <FaFacebook size={26} />
             
                <FaInstagram size={26} />
             
            </div>
          </div>
      </Container>
    </footer>
  );
};

export default Footer;
