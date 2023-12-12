import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const DashboardFrame = dynamic(() =>
	import("../../../components/admin/ADMINDashboardFrame")
);

const EBL2012 = () => {
	return (
		<DashboardFrame>
			<h4 className="underline text-center my-5 text-2xl">ADMIN EBL2012</h4>
		</DashboardFrame>
	);
};

export default EBL2012;
