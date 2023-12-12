import React, { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const USERDashboardFrame = dynamic(() =>
	import("../../../components/user/USERDashboardFrame")
);

const Overview = () => {
	useEffect(() => {
		let unmounted = false;
		// Do not go back to login page
		window.history.pushState(null, null, window.location.href);
		window.onpopstate = function (event) {
			history.go(1);
		};

		return () => {
			unmounted = true;
		};
	}, []);
	return (
		<USERDashboardFrame>
			<Head>
				<title>USER Dashboard | Welcome</title>
			</Head>
			<h4>Overview</h4>
		</USERDashboardFrame>
	);
};

export default Overview;
