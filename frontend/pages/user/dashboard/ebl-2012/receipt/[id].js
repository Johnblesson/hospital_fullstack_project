import dynamic from "next/dynamic";
import TabHeader from "../../../../../components/shared/TabHeader";
import { useRouter } from "next/router";

const DashboardFrame = dynamic(() =>
	import("../../../../../components/user/USERDashboardFrame")
);

const ReceiptDetails = () => {
	const router = useRouter();
	const { id } = router?.query;

	return (
		<DashboardFrame>
			<TabHeader />
			<h4 className="underline text-center my-5 text-2xl">
				Receipt Details with {id}
			</h4>
		</DashboardFrame>
	);
};

export default ReceiptDetails;
