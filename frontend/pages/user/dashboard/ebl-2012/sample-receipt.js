import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import TabHeader from "../../../../components/shared/TabHeader";
import TableData from "../../../../components/shared/TableData";
import useSWR from "swr";
import axios from "axios";
import moment from "moment";
import { Add } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Box, MenuItem, TextField } from "@material-ui/core";
import { selectOpt, visitName, EBLYEAR } from "../../../../utils/customValues";
import Swal from "sweetalert2";
import Loader from "../../../../loader/Loader";
import { sampleReceiptColumns } from "../../../../utils/columns";
import { useRouter } from "next/router";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 650,
	height: 730,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 10,
	p: 2,
};

const DashboardFrame = dynamic(() =>
	import("../../../../components/user/USERDashboardFrame")
);
const TabHeaderMemoized = React.memo(TabHeader);
const TableDataMemoized = React.memo(TableData);
const fetcher = async (url) =>
	await axios.get(url).then((res) => res.data.data);

const SampleReceipt = () => {
	const [formatData, setFormattedData] = useState([]);
	const [open, setOpen] = useState(false);
	const { register, reset, handleSubmit } = useForm();
	const [loading, setLoading] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	const { data, error } = useSWR(`/api/ebl2012/getSampleReceipts`, fetcher);
	const today = new Date().toISOString().split("T")[0]; // Get today's date in the format "YYYY-MM-DD"

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

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		console.log("Close");
		setOpen(false);
	};

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
				router.push(router.pathname);
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
			<div
				style={{
					display: "flex",
					marginBottom: "20px",
					padding: "20px",
					justifyContent: "flex-end",
				}}
			>
				<button
					onClick={handleClickOpen}
					className="bg-blue-500 hover:bg-blue-800 text-white p-2"
				>
					<Add style={{ marginRight: "8px" }} variant="outlined" />
					Add {title}
				</button>
				<Modal
					keepMounted
					open={open}
					onClose={handleClose}
					aria-labelledby="keep-mounted-modal-title"
					aria-describedby="keep-mounted-modal-description"
				>
					<Box sx={style}>
						<Typography
							id="keep-mounted-modal-title"
							variant="h6"
							component="h2"
							className="justify-center pt-2 pb-3 leading-5 text-center"
						>
							Add Sample Receipt
						</Typography>
						<form className="w-full h-64" onSubmit={handleSubmit(onSubmit)}>
							<div className="grid grid-cols-2 gap-4">
								<TextField
									select
									required
									label="Study Name"
									defaultValue="EBL2012"
									variant="outlined"
									helperText="Please select Study Name"
									{...register("studyname")}
									disabled
								>
									{EBLYEAR.map((option, ind) => (
										<MenuItem key={ind} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>

								<TextField
									required
									label="Subject"
									{...register("subject")}
									variant="outlined"
									InputLabelProps={{
										shrink: true,
									}}
								/>

								<TextField
									select
									required
									label="Visit Name"
									defaultValue="N/A"
									variant="outlined"
									helperText="Please select Visit Name"
									{...register("visitname")}
								>
									{visitName.map((option, ind) => (
										<MenuItem key={ind} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>

								<TextField
									required
									label="Visit Date"
									type="date"
									{...register("visitdate")}
									variant="outlined"
									InputLabelProps={{
										shrink: true,
									}}
								/>

								<TextField
									required
									label="Age at Visit"
									type="number"
									{...register("ageatvisit")}
									InputLabelProps={{
										shrink: true,
									}}
									variant="outlined"
								/>

								<TextField
									required
									label="Sample Collection Date"
									type="date"
									{...register("samplecollectiondate")}
									variant="outlined"
									InputLabelProps={{
										shrink: true,
									}}
									inputProps={{
										max: today, // Set the max date to today
									}}
								/>

								<TextField
									required
									label="Blood Draw Time"
									type="time"
									{...register("blooddrawtime")}
									InputLabelProps={{
										shrink: true,
									}}
									variant="outlined"
								/>

								<TextField
									required
									label="Sample Receipt Date"
									type="date"
									{...register("samplereceiptdate")}
									InputLabelProps={{
										shrink: true,
									}}
									variant="outlined"
								/>

								<TextField
									required
									label="Sample Receipt Time"
									type="time"
									{...register("samplereceipttime")}
									InputLabelProps={{
										shrink: true,
									}}
									variant="outlined"
								/>

								<TextField
									select
									required
									label="Hematology Sample"
									defaultValue="N/A"
									variant="outlined"
									helperText="Please select Hematology Sample"
									{...register("hematologysample")}
								>
									{selectOpt.map((option, ind) => (
										<MenuItem key={ind} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
								<TextField
									select
									required
									label="Chemistry Sample"
									defaultValue="N/A"
									variant="outlined"
									helperText="Please select Chemistry Sample"
									{...register("chemistrysample")}
								>
									{selectOpt.map((option, ind) => (
										<MenuItem key={ind} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>

								<TextField
									select
									required
									label="Humoral Sample"
									defaultValue="N/A"
									variant="outlined"
									helperText="Please select Humoral Sample"
									{...register("humoralsample")}
								>
									{selectOpt.map((option, ind) => (
										<MenuItem key={ind} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>

								<TextField
									select
									required
									label="Cellular Sample"
									defaultValue="N/A"
									variant="outlined"
									helperText="Please select Cellular Sample"
									{...register("cellularsample")}
								>
									{selectOpt.map((option, ind) => (
										<MenuItem key={ind} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>

								<TextField
									required
									label="Comments"
									multiline
									minRows={4}
									{...register("comments")}
									InputLabelProps={{
										shrink: true,
									}}
									variant="outlined"
								/>
							</div>

							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									gap: "10px",
									marginTop: "20px",
									marginBottom: "10px",
								}}
							>
								<button
									className="bg-green-500 shadow hover:bg-green-800 text-white p-2"
									type="submit"
								>
									Submit
								</button>
								<button
									className="bg-blue-500 shadow hover:bg-blue-800 text-white p-2"
									onClick={handleClose}
								>
									Cancel
								</button>
							</Box>
						</form>
					</Box>
				</Modal>
			</div>
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
