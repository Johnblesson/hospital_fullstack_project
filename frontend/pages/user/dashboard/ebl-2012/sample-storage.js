import React, { useState, useEffect, useCallback } from "react";
import { humoralSampleColumns, PBMCSample } from "../../../../utils/columns";
import dynamic from "next/dynamic";
import { Accordion } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useSWR from "swr";
import axios from "axios";
import HumoralSampleStorageForm from "../../../../components/forms/HumoralSampleStorageForm";
import PBMCSampleStorageForm from "../../../../components/forms/PBMCSampleStorageForm";

const DashboardFrame = dynamic(() =>
	import("../../../../components/user/USERDashboardFrame")
);
const TabHeader = dynamic(() =>
	import("../../../../components/shared/TabHeader")
);
const TableData = dynamic(() =>
	import("../../../../components/shared/TableData")
);

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const fetcher = async (url) => {
	const response = await axios.get(url);
	return response.data.data;
};

const SampleStorage = () => {
	const [active, setActive] = useState("HSS");
	const [content, setContent] = useState("");
	const [formPopUp, setFormPopUp] = useState("");

	const { data: humoralSampleData } = useSWR(
		"/api/ebl2012/getHumoralSampleStorage",
		fetcher
	);
	const { data: PBMCData, error } = useSWR(
		"/api/ebl2012/getPBMCSampleStorage",
		fetcher
	);

	useEffect(() => {
		const ac = new AbortController();
		return () => {
			ac.abort();
		};
	}, [humoralSampleData]);

	console.log("humoralSampleReceiptsData  =>", humoralSampleData);
	console.log("PBMCData  =>", PBMCData);

	const handleClick = useCallback(
		(tab) => {
			setActive(tab);
			switch (tab) {
				case "HSS":
					setContent(
						<TableData
							columns={humoralSampleColumns}
							tableData={humoralSampleData}
							title="Humoral Sample Storage"
						/>
					);
					setFormPopUp(<HumoralSampleStorageForm />);
					break;
				case "PBMC":
					setContent(
						<TableData
							columns={PBMCSample}
							tableData={PBMCData}
							title="PBMC Sample"
						/>
					);
					setFormPopUp(<PBMCSampleStorageForm />);
					break;
				case "PLASMA":
					break;
				case "SUPER":
					setContent("SUPERNATANT Sample");
					break;
				default:
					setContent("");
			}
		},
		[humoralSampleData, PBMCData]
	);

	const SampleLink = ({ label, code, active, onClick }) => (
		<a
			className={classNames(
				"group",
				"cursor-pointer",
				"text-white",
				"flex",
				"bg-blue-400",
				"items-center",
				"pl-2",
				"py-2",
				"text-base",
				"font-medium",
				"rounded-md",
				active === code
					? "bg-blue-700 text-white font-bold py-2 px-4 rounded"
					: "text-white hover:bg-gray-700 hover:text-white"
			)}
			onClick={() => onClick(code)}
		>
			{label}
		</a>
	);

	return (
		<DashboardFrame>
			<TabHeader />
			<h4 className="underline text-center my-5 text-2xl">Sample Storage</h4>
			<div className="flex justify-evenly mt-2 gap-6">
				<div className="w-1/4 md:w-1/4 lg:w-1/4 bg-white rounded-lg shadow-lg p-6 xl:w-1/4">
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
							className="text-center"
						>
							<Typography className="text-center pl-4">
								Humoral Sample Storage
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<SampleLink
								label="Sample Storage"
								active={active}
								code="HSS"
								onClick={handleClick}
							/>
						</AccordionDetails>
					</Accordion>
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography className="text-center pl-4">
								Cellular Sample Storage
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<SampleLink
								label="PBMC Sample Storage"
								active={active}
								code="PBMC"
								onClick={handleClick}
							/>
						</AccordionDetails>
						<AccordionDetails>
							<SampleLink
								label="PLASMA Sample Storage"
								active={active}
								code="PLASMA"
								onClick={handleClick}
							/>
						</AccordionDetails>
						<AccordionDetails>
							<SampleLink
								label="SUPERNATANT Sample"
								active={active}
								code="SUPER"
								onClick={handleClick}
							/>
						</AccordionDetails>
					</Accordion>
				</div>
				<div className="flex justify-between gap-3">
					<div className="w-full sm:w-1/2">
						<div className="bg-white rounded-lg shadow-lg w-64 p-6 h-64">
							<p className="text-gray-600">56</p>
							<span>My Inputs</span>
						</div>
					</div>
					<div className="w-full sm:w-1/2">
						<div className="bg-white rounded-lg shadow-lg w-64 p-6 h-64">
							<p className="text-gray-600">256</p>
							<span>Total</span>
						</div>
					</div>
				</div>
			</div>
			{!humoralSampleData || !PBMCData ? (
				"Please wait..."
			) : (
				<>
					<div className="mt-10">{active === "HSS" && formPopUp}</div>
					<div className="mt-10">{active === "PBMC" && formPopUp}</div>
					<div className="mt-10">{content}</div>
				</>
			)}
		</DashboardFrame>
	);
};

export default SampleStorage;
