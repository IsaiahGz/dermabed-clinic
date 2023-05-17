import React from 'react';
import charlotte from '../assets/images/charlotte.jpg';
// import { useQuery } from '@apollo/client';

// import { QUERY } from '../utils/queries';

const Home = () => {
	// const { loading, data } = useQuery(QUERY);

	return <div>
		<div  className= "flex h-screen w-screen"> <img className="object-cover w-full h-full" src={charlotte} alt="charlotte"></img> </div>
	</div>;
};

export default Home;
