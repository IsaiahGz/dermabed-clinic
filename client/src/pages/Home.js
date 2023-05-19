import React from "react";
import charlotte from "../assets/images/charlotte.jpg";
// import { useQuery } from '@apollo/client';

// import { QUERY } from '../utils/queries';

const Home = () => {
  // const { loading, data } = useQuery(QUERY);

  return (
    <div>
      <div className="flex h-screen">
        <img
          className="object-cover w-full h-full"
          src={charlotte}
          alt="charlotte"
        ></img>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 p-10 rounded-lg">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome to DermAbed Clinic
          </h1>
          <p className="text-lg text-white">
            Your go-to dermatology service provider in Charlotte. Offering
            state-of-the-art treatments and products for a healthier, more
            radiant skin.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
