import DashboardFrame from "../../../components/admin/ADMINDashboardFrame";
import Head from "next/head";
import { useRouter } from "next/router";

const HWI = () => {
	const router = useRouter();
	const qry = router.pathname;

	return (
		<DashboardFrame>
			<Head>
				<title>Dashboard | HWI</title>
			</Head>
			<main className="flex-1 relative overflow-y-auto focus:outline-none">
				<div className="py-6">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
						<h1 className="text-2xl font-semibold text-gray-900">HWI</h1>
					</div>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
						<h4>No HWI</h4>
					</div>
				</div>
			</main>
		</DashboardFrame>
	);
};

export default HWI;
