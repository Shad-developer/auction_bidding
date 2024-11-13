import axios from "axios";
import { BACKEND_URL } from "../../utils/url";

export const BIDDING_URL = `${BACKEND_URL}/bidding/`;

const placeBid = async (formData) => {
  const response = await axios.post(BIDDING_URL, formData);
  return response.data;
};

const fetchBiddingHistory = async (id) => {
  const response = await axios.get(`${BIDDING_URL}${id}`);
  return response.data;
};

// buyer own bids
const getMyBidsHistory = async () => {
  const response = await axios.get(BIDDING_URL);
  return response.data;
};

// delelte bid by buyer own 

const deleteBid = async (id) => {
  const response = await axios.delete(`${BIDDING_URL}${id}`);
  return response.data;
};

const sellProduct = async (productId) => {
  const response = await axios.post(BIDDING_URL + "sell", productId);
  return response.data;
};

const biddingService = {
  placeBid,
  fetchBiddingHistory,
  getMyBidsHistory,
  deleteBid,
  sellProduct,
};

export default biddingService;
