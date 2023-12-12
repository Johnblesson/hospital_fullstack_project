<form onSubmit={handleSubmit(onSubmit)}>
<TextField
	label="Sample Receipt ID"
	{...register("samplereceiptid")}
/>

<TextField label="Study Name" {...register("studyname")} />

<TextField label="Subject" {...register("subject")} />

<TextField label="Visit Name" {...register("visitname")} />

<TextField
	label="Visit Date"
	type="date"
	{...register("visitdate")}
/>

<TextField
	label="Age at Visit"
	type="number"
	{...register("ageatvisit")}
/>

<TextField
	label="Sample Collection Date"
	type="date"
	{...register("samplecollectiondate")}
/>

<TextField
	label="Blood Draw Time"
	type="time"
	{...register("blooddrawtime")}
/>

<TextField
	label="Sample Receipt Date"
	type="date"
	{...register("samplereceiptdate")}
/>

<TextField
	label="Sample Receipt Time"
	type="time"
	{...register("samplereceipttime")}
/>

<TextField
	label="Hematology Sample"
	{...register("hematologysample")}
/>

<TextField
	label="Chemistry Sample"
	{...register("chemistrysample")}
/>

<TextField
	label="Humoral Sample"
	{...register("humoralsample")}
/>

<TextField
	label="Cellular Sample"
	{...register("cellularsample")}
/>

<TextField
	label="Comments"
	multiline
	minRows={8}
	{...register("comments")}
/>

<TextField
	label="User First Name"
	{...register("tbl_user.firstName")}
/>

<DialogActions>
	<Button className="bg-blue-500 text-white p-2" type="submit">
		Submit
	</Button>
	<Button onClick={handleClose}>Cancel</Button>
</DialogActions>
</form>
