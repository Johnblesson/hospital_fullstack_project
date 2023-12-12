import DashboardFrame from "../../../components/admin/ADMINDashboardFrame";
import Head from "next/head";
import { useRouter } from "next/router";

const PREVAC = () => {
	const router = useRouter();
	const qry = router.pathname;

	return (
		<DashboardFrame>
			<Head>
				<title>Dashboard | PREVAC</title>
			</Head>
			<main className="flex-1 relative overflow-y-auto focus:outline-none">
				<div className="py-6">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
						<h1 className="text-2xl font-semibold text-gray-900">PREVAC</h1>
					</div>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
						<h4>No PREVAC</h4>
					</div>
				</div>
			</main>
		</DashboardFrame>
	);
};

export default PREVAC;
