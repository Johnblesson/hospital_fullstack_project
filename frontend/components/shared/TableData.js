import { forwardRef, useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { useRouter } from "next/router";
import { CSVLink } from "react-csv";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import { Button } from "@material-ui/core";
// import { CsvBuilder } from "filefy";
const tableIcons = {
	Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => (
		<ChevronRight {...props} ref={ref} />
	)),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAltIcon {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => (
		<ChevronLeft {...props} ref={ref} />
	)),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function TableData({ tableData, title, columns }) {
	const router = useRouter();
	const { pathname } = router;

	useEffect(() => {}, [tableData]);

	if (tableData?.length > 0) {
		const ExportButton = ({ columns, data }) => {
			const csvHeaders = columns.map((column) => column.title);
			const csvData = data.map((item) =>
				columns.map((column) => item[column.field])
			);

			return (
				<button className="bg-blue-500 text-white p-2">
					<CSVLink data={csvData} headers={csvHeaders} filename="data.csv">
						<SaveAltIcon style={{ marginRight: "8px" }} />
						Export to CSV
					</CSVLink>
				</button>
			);
		};

		return (
			<>
				<MaterialTable
					icons={tableIcons}
					title={title}
					columns={columns}
					data={tableData}
					options={{
						actionsColumnIndex: -1,
						rowStyle: {
							padding: "200px",
						},
						filtering: true,
						exportButton: true, //
						grouping: true,
					}}
					components={{
						Toolbar: (props) => (
							<div className="p-2">
								<ExportButton
									className="justify-end "
									columns={columns}
									data={tableData}
								/>
								<MTableToolbar
									className="pr-20 hover:bg-blue-800 shadow-md"
									{...props}
								/>
							</div>
						),
					}}
					onRowClick={(event, rowData) => {
						if (pathname) {
							router.push({
								pathname:
									(pathname.includes("/user/dashboard/ebl-2012") &&
										`/user/dashboard/ebl-2012/receipt/${rowData.id}`) ||
									(pathname.includes("/dhmt/dashboard/maternal-death") &&
										"/dhmt/maternal-death/detail/") ||
									(pathname.includes("/national/dashboard/tracker") &&
										"/pregnant_woman/details") ||
									(pathname.includes("/national/dashboard/referrals") &&
										"/national/referral/detail/"),

								query:
									(pathname.includes("/user/dashboard/ebl-2012") && {
										id: rowData.id,
									}) ||
									(pathname.includes("/national/dashboard/tracker") && {
										slug: rowData.slug,
									}) ||
									(pathname.includes("/national/dashboard/referrals") && {
										form_name: rowData.referral_form,
										form_id: rowData.form_id,
										id: rowData.id,
									}),
							});
						}
					}}
				/>
			</>
		);
	} else
		return (
			<div>
				<dl className="mt-5 grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
					<div className="px-4 py-5 w-full bg-white shadow rounded-lg overflow-hidden sm:p-6">
						<dt className="text-sm font-medium text-gray-500 truncate">
							No Data found
						</dt>
					</div>
				</dl>
			</div>
		);
}
