import DashboardFrame from "../../../components/user/USERDashboardFrame";
import Head from "next/head";
import { useRouter } from "next/router";

const EBL2015 = () => {
	const router = useRouter();
	const qry = router.pathname;

	return (
		<DashboardFrame>
			<Head>
				<title>Dashboard | EBL 2015</title>
			</Head>
			<main className="flex-1 relative overflow-y-auto focus:outline-none">
				<div className="py-6">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
						<h1 className="text-2xl font-semibold text-gray-900">EBL 2011</h1>
					</div>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
						<h4> EBL 2015</h4>
					</div>
				</div>
			</main>
		</DashboardFrame>
	);
};

export default EBL2015;
