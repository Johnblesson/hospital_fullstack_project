import React, { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { UsersIcon, ViewGridIcon } from "@heroicons/react/solid";

const Loader = dynamic(() => import("../../../loader/Loader"));
const DashboardFrame = dynamic(() =>
	import("../../../components/admin/ADMINDashboardFrame")
);

const Overview = () => {
	const router = useRouter();
	const { pathname } = router;

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

	const tabs = [
		{
			name: "Overview",
			href: "/national/dashboard/overview",
			icon: ViewGridIcon,
			current: pathname === "/national/dashboard/overview" ? true : false,
		},
		{
			name: "Success Metrics",
			href: "/national/dashboard/tabs/success-metrics",
			icon: UsersIcon,
			current:
				pathname === "/national/dashboard/tabs/success-metrics" ? true : false,
		},
	];

	return (
		<DashboardFrame>
			<Head>
				<title>Dashboard | Welcome</title>
			</Head>
			<h4>ADMIN</h4>
		</DashboardFrame>
	);
};

export default Overview;
