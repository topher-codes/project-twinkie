import React from 'react';
import Image from 'next/image';

const ThankYou = () => {
	return (
		<div>
			{/* create a 10 second timer to route back to the index.tsx file */}
			<h1>Thank you! </h1>
			<Image src="/nikeicon.png" alt="nikeicon" width={200} height={200} />
		</div>
	);
};

export default ThankYou;
