import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import TabHeader from "../../../../components/shared/TabHeader";
import TableData from "../../../../components/shared/TableData";
import useSWR from "swr";
import axios from "axios";
import moment from "moment";
// import { Add } from "@material-ui/icons";
// import { useForm } from "react-hook-form";
// import Modal from "@mui/material/Modal";
// import Typography from "@mui/material/Typography";
// import { Box, MenuItem, TextField } from "@material-ui/core";
// import { selectOpt, visitName, EBLYEAR } from "../../../../utils/customValues";
import Swal from "sweetalert2";
import Loader from "../../../../loader/Loader";
import { sampleReceiptColumns } from "../../../../utils/columns";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 800,
	height: 750,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 20,
	p: 2,
};

const DashboardFrame = dynamic(() =>
	import("../../../../components/admin/ADMINDashboardFrame")
);
const TabHeaderMemoized = React.memo(TabHeader);
const TableDataMemoized = React.memo(TableData);
const fetcher = async (url) =>
	await axios.get(url).then((res) => res.data.data);

const SampleReceipt = () => {
	const [formatData, setFormattedData] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { data, error } = useSWR(`/api/ebl2012/getSampleReceipts`, fetcher);

	const formatDates = useMemo(() => {
		const formattedData = data?.map((item) => {
			const formattedItem = { ...item };
			formattedItem.visitdate = moment(item.visitdate).format("YYYY-MM-DD");
			formattedItem.createdAt = moment(item.createdAt).format("YYYY-MM-DD");
			formattedItem.samplecollectiondate = moment(
				item.samplecollectiondate
			).format("YYYY-MM-DD");
			formattedItem.samplereceiptdate = moment(item.samplereceiptdate).format(
				"YYYY-MM-DD"
			);

			return formattedItem;
		});

		return formattedData;
	}, [data]);

	useEffect(() => {
		const ac = new AbortController();
		setFormattedData(formatDates);
		return () => {
			ac.abort();
		};
	}, [formatDates, data]);

	const onSubmit = async (data) => {
		if (isSubmitting) {
			return; // Prevent duplicate submissions
		}
		try {
			setIsSubmitting(true);
			setLoading(true);
			console.log(data);
			const resp = await axios.post("/api/ebl2012/postSampleReceipt", data, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (resp.status === 201) {
				setLoading(false);
				setOpen(false);
				Swal.fire({
					title: "Success!",
					text: "Sample Receipt Added Successfully!",
					icon: "success",
					timer: 2000,
					confirmButtonText: "Ok",
				});
				reset();
			} else {
				setLoading(false);
				Swal.fire({
					title: "Error!",
					text: "Error occurred: " + resp.data.message,
					icon: "error",
					timer: 1000,
					confirmButtonText: "Ok",
				});
			}
		} catch (e) {
			setLoading(false);
		} finally {
			setIsSubmitting(false);
			setOpen(false);
		}
	};

	const title = `Sample Receipt`;

	return (
		<DashboardFrame>
			<TabHeaderMemoized />
			<h4 className="underline text-center my-5 text-2xl">Sample Receipt</h4>

			{!data && (
				<>
					<Loader />
				</>
			)}
			{formatData?.length >= 0 && (
				<TableDataMemoized
					tableData={formatData}
					title={title}
					columns={sampleReceiptColumns}
				/>
			)}
		</DashboardFrame>
	);
};

export default SampleReceipt;
