import { RingLoader } from "react-spinners";
import useNetworkStatus from "../utils/useNetworkStatus";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Loader = () => {
	const style = {
		position: "absolute",
		alignItems: "center",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	};

	if (typeof window !== "undefined") {
		const status = useNetworkStatus();
		if (status) {
			toast.success("Network connected");
		} else {
			toast.error("Please Connect to Working Network");
		}
	}

	return (
		<>
			<div style={style}>
				<RingLoader type="Puff" color="#00BFFF" height={100} width={100} />
				<h2 className="text-center text-1xl pt-20">Loading....</h2>
			</div>
			<ToastContainer
				position="bottom-left"
				autoClose={1000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				onClose={() => alert("ok")}
			/>
		</>
	);
};

export default Loader;
