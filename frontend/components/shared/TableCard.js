// import React, { useCallback, useMemo, useState } from "react";
// import { MaterialReactTable } from "material-react-table";
// import {
// 	Box,
// 	Button,
// 	Dialog,
// 	DialogActions,
// 	DialogContent,
// 	DialogTitle,
// 	IconButton,
// 	Visibility,
// 	Stack,
// 	TextField,
// 	Tooltip,
// } from "@mui/material";

// import { useRouter } from "next/router";
// import { YesNoOption, data } from "../../utils/customValues";

// const TableCard = () => {
// 	const [createModalOpen, setCreateModalOpen] = useState(false);
// 	const [tableData, setTableData] = useState(() => data);
// 	const [validationErrors, setValidationErrors] = useState({});
// 	const router = useRouter();

// 	const handleCreateNewRow = (values) => {
// 		tableData.unshift(values);

// 		setTableData([...tableData]);
// 		console.log("tableData =>", values);
// 	};

// 	const handleCancelRowEdits = () => {
// 		setValidationErrors({});
// 	};

// 	const handleRoutes = (row) => {
// 		const { id } = row;
// 		const path = router.pathname;
// 		if (path === "/user/dashboard/ebl-2012/sample-receipt") {
// 			return router.push(`/user/dashboard/ebl-2012/receipt/${id}`);
// 		} else {
// 			return null;
// 		}
// 	};

// 	const getCommonEditTextFieldProps = useCallback(
// 		(cell) => {
// 			return {
// 				error: !!validationErrors[cell.id],
// 				helperText: validationErrors[cell.id],
// 				onBlur: (event) => {
// 					console.log("cell ==>", cell);
// 					const isValid =
// 						cell.column.id === "email"
// 							? validateEmail(event.target.value)
// 							: cell.column.id === "age"
// 							? validateAge(+event.target.value)
// 							: validateRequired(event.target.value);
// 					if (!isValid) {
// 						//set validation error for cell if invalid
// 						setValidationErrors({
// 							...validationErrors,
// 							[cell.id]: `${cell.column.columnDef.header} is required`,
// 						});
// 					} else {
// 						//remove validation error for cell if valid
// 						delete validationErrors[cell.id];
// 						setValidationErrors({
// 							...validationErrors,
// 						});
// 					}
// 				},
// 			};
// 		},
// 		[validationErrors]
// 	);

// 	const columns = useMemo(
// 		() => [
// 			{
// 				accessorKey: "id",
// 				header: "ID",
// 				size: 140,
// 				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
// 					...getCommonEditTextFieldProps(cell),
// 				}),
// 			},
// 			{
// 				accessorKey: "studyName",
// 				header: "Study Name",
// 				size: 140,
// 				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
// 					...getCommonEditTextFieldProps(cell),
// 				}),
// 			},
// 			{
// 				accessorKey: "vistName",
// 				header: "Visit Name",
// 				size: 140,
// 				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
// 					...getCommonEditTextFieldProps(cell),
// 				}),
// 			},
// 			{
// 				accessorKey: "visitDate",
// 				header: "Visit Date",
// 				size: 140,
// 				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
// 					...getCommonEditTextFieldProps(cell),
// 				}),
// 			},
// 			{
// 				accessorKey: "collectionDate",
// 				header: "Collection Date",
// 				size: 140,
// 				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
// 					...getCommonEditTextFieldProps(cell),
// 				}),
// 			},
// 			{
// 				accessorKey: "subject",
// 				header: "Subject",
// 				size: 140,
// 				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
// 					...getCommonEditTextFieldProps(cell),
// 				}),
// 			},
// 			{
// 				accessorKey: "visitAge",
// 				header: "Visit Age",
// 				size: 140,
// 				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
// 					...getCommonEditTextFieldProps(cell),
// 				}),
// 			},
// 			{
// 				accessorKey: "bloodDrawTime",
// 				header: "Blood Draw Time",
// 				size: 140,
// 				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
// 					...getCommonEditTextFieldProps(cell),
// 				}),
// 			},
// 			{
// 				accessorKey: "receiptDate",
// 				header: "Receipt Date",
// 				size: 140,
// 				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
// 					...getCommonEditTextFieldProps(cell),
// 				}),
// 			},
// 			{
// 				accessorKey: "receiptTime",
// 				header: "Receipt Time",
// 				size: 140,
// 				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
// 					...getCommonEditTextFieldProps(cell),
// 				}),
// 			},
// 			{
// 				accessorKey: "hematologySample",
// 				header: "Hematology Sample",
// 				size: 140,
// 				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
// 					...getCommonEditTextFieldProps(cell),
// 				}),
// 			},
// 			{
// 				accessorKey: "chemistrySample",
// 				header: "Chemistry Sample",
// 				size: 140,
// 				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
// 					...getCommonEditTextFieldProps(cell),
// 				}),
// 			},
// 			{
// 				accessorKey: "humoralSample",
// 				header: "Humoral Sample",
// 				size: 140,
// 				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
// 					...getCommonEditTextFieldProps(cell),
// 				}),
// 			},
// 			{
// 				accessorKey: "cellularSample",
// 				header: "Cellular Sample",
// 				size: 140,
// 				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
// 					...getCommonEditTextFieldProps(cell),
// 				}),
// 			},
// 			{
// 				accessorKey: "comments",
// 				header: "Comments",
// 				size: 140,
// 				muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
// 					...getCommonEditTextFieldProps(cell),
// 				}),
// 			},
// 		],
// 		[getCommonEditTextFieldProps]
// 	);

// 	const handleRowClick = (ad) => {
// 		console.log(ad);
// 	};
// 	const renderRowActions = ({ row, table }) => (
// 		<Box sx={{ display: "flex", gap: "1rem" }}>
// 			<Tooltip arrow placement="left" title="View">
// 				<Button onClick={() => handleRoutes(row)}>
// 					<Visibility />
// 				</Button>
// 			</Tooltip>
// 		</Box>
// 	);

// 	return (
// 		<>
// 			<MaterialReactTable
// 				displayColumnDefOptions={{
// 					"mrt-row-actions": {
// 						muiTableHeadCellProps: {
// 							align: "center",
// 						},
// 						size: 120,
// 					},
// 				}}
// 				columns={columns}
// 				data={tableData}
// 				editingMode="modal" //default
// 				enableColumnOrdering
// 				onEditingRowCancel={handleCancelRowEdits}
// 				renderRowActions={({ row, table }) => (
// 					<Box sx={{ display: "flex", gap: "1rem" }}>
// 						<Tooltip arrow placement="left" title="View">
// 							<IconButton onClick={() => handleRoutes(row)}>
// 								<Visibility />
// 							</IconButton>
// 						</Tooltip>
// 					</Box>
// 				)}
// 				renderTopToolbarCustomActions={() => (
// 					<Button
// 						color="secondary"
// 						onClick={() => setCreateModalOpen(true)}
// 						variant="contained"
// 					>
// 						Add Sample Receipt
// 					</Button>
// 				)}
// 			/>
// 			<CreateNewAccountModal
// 				columns={columns}
// 				open={createModalOpen}
// 				onClose={() => setCreateModalOpen(false)}
// 				onSubmit={handleCreateNewRow}
// 			/>
// 		</>
// 	);
// };

// //TableCard of creating a mui dialog modal for creating new rows
// export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
// 	const [values, setValues] = useState(() =>
// 		columns.reduce((acc, column) => {
// 			acc[column.accessorKey ?? ""] = "";
// 			return acc;
// 		}, {})
// 	);

// 	const handleSubmit = () => {
// 		//put your validation logic here
// 		onSubmit(values);
// 		onClose();
// 	};

// 	return (
// 		<Dialog open={open}>
// 			<DialogTitle textAlign="center">Create Sample Receipt</DialogTitle>
// 			<DialogContent>
// 				<form onSubmit={(e) => e.preventDefault()}>
// 					<Stack
// 						sx={{
// 							width: "100%",
// 							minWidth: { xs: "300px", sm: "360px", md: "400px" },
// 							gap: "1.5rem",
// 						}}
// 					>
// 						{columns.map((column) => (
// 							<TextField
// 								key={column.accessorKey}
// 								label={column.header}
// 								name={column.accessorKey}
// 								onChange={(e) =>
// 									setValues({ ...values, [e.target.name]: e.target.value })
// 								}
// 							/>
// 						))}
// 					</Stack>
// 				</form>
// 			</DialogContent>
// 			<DialogActions sx={{ p: "1.25rem" }}>
// 				<Button onClick={onClose}>Cancel</Button>
// 				<Button color="secondary" onClick={handleSubmit} variant="contained">
// 					Add Sample Receipt
// 				</Button>
// 			</DialogActions>
// 		</Dialog>
// 	);
// };

// export default TableCard;
