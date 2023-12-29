import React, { useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
const Home = () => {
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "/api/v1/user/get-user-info",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if(res.data.success){
        console.log(res.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout />
  );
};

export default Home;