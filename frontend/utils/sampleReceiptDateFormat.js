import moment from "moment";
function formatDates(data) {
	const formattedData = data.map((item) => {
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
}

export default formatDates;
