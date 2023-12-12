import DashboardFrame from "../../../components/user/USERDashboardFrame";
import Head from "next/head";
import { useRouter } from "next/router";

const EBL2005EXT = () => {
	const router = useRouter();
	const qry = router.pathname;

	return (
		<DashboardFrame>
			<Head>
				<title>Dashboard | EBL 2005 EXT</title>
			</Head>
			<main className="flex-1 relative overflow-y-auto focus:outline-none">
				<div className="py-6">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
						<h1 className="text-2xl font-semibold text-gray-900">
							EBL 2005 EXT
						</h1>
					</div>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
						<h4>No EBL 2005 EXT</h4>
					</div>
				</div>
			</main>
		</DashboardFrame>
	);
};

export default EBL2005EXT;
