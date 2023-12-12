import React, { useState, useEffect, useCallback } from "react";

import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Box, MenuItem, TextField } from "@material-ui/core";
import {
	selectOpt,
	visitName,
	roomLocation,
	SampleType,
	AliqoutType,
} from "../../utils/customValues";

import axios from "axios";
import { Add } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 650,
	height: 700,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 10,
	p: 2,
};

const PBMCSampleStorageForm = () => {
	const [open, setOpen] = useState(false);
	const { register, reset, handleSubmit } = useForm();
	const [loading, setLoading] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
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
			const resp = await axios.post(
				"/api/ebl2012/postPBMCSampleStorage",
				data,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
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

	return (
		<div
			style={{
				display: "flex",
				marginBottom: "20px",
				justifyContent: "flex-end",
			}}
		>
			<button
				onClick={handleClickOpen}
				className="bg-blue-500 hover:bg-blue-800 text-white p-2"
			>
				<Add style={{ marginRight: "8px" }} variant="outlined" />
				Add PBMC Sample Storage
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
						Add PBMC Sample Storage
					</Typography>
					<form className="w-full h-full" onSubmit={handleSubmit(onSubmit)}>
						<div className="grid grid-cols-2 gap-4">
							<TextField
								label="Subject"
								{...register("subject")}
								variant="outlined"
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								select
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
								select
								label="Sample Type"
								defaultValue="PBMC"
								variant="outlined"
								helperText="Please select Sample Type"
								{...register("sampletype")}
							>
								{SampleType.map((option, ind) => (
									<MenuItem key={ind} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>

							<TextField
								select
								label="Aliquot"
								defaultValue="PBMC"
								variant="outlined"
								helperText="Please select Aliquot"
								{...register("aliquot")}
							>
								{AliqoutType.map((option, ind) => (
									<MenuItem key={ind} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<TextField
								select
								label="Room Location"
								defaultValue="Room 1"
								variant="outlined"
								helperText="Please select Room Location"
								{...register("roomlocation")}
							>
								{roomLocation.map((option, ind) => (
									<MenuItem key={ind} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>

							<TextField
								label="Freezer Number"
								type="number"
								{...register("freezernumber")}
								variant="outlined"
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								label="Box Number"
								type="number"
								{...register("boxnumber")}
								variant="outlined"
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								label="Row Number"
								type="number"
								{...register("rownumber")}
								variant="outlined"
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								label="Column Number"
								type="number"
								{...register("columnnumber")}
								variant="outlined"
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								select
								label="Shipped"
								defaultValue="Room 1"
								variant="outlined"
								helperText="Please select Shipped"
								{...register("shipped")}
							>
								{selectOpt.map((option, ind) => (
									<MenuItem key={ind} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<TextField
								required
								label="Shipped Date"
								type="date"
								{...register("shippeddate")}
								variant="outlined"
								InputLabelProps={{
									shrink: true,
								}}
							/>

							<TextField
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
	);
};

export default PBMCSampleStorageForm;
