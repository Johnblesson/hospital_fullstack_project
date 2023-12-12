import cookie from "cookie";

export default async (req, res) => {
	const server = process.env.NEXT_PUBLIC_BASE_URL;

	if (req.method === "GET") {
		const cookies = cookie.parse(req.headers.cookie ?? "");
		const accessToken = cookies.access ?? false;
		console.log("GET apiRes", accessToken);
		if (accessToken === false) {
			return res.status(401).json({
				error: "User unauthorized to make this request",
			});
		}

		try {
			const apiRes = await fetch(
				`${server}/api/ebl2012/humoral-sample-storage`,
				{
					method: "GET",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			const data = await apiRes.json();

			return res.status(200).json({
				success: "successful",
				data: data?.data,
			});
		} catch (err) {
			return res.status(500).json({
				error: "Something went wrong when trying to fulfill refresh request",
			});
		}
	} else {
		res.setHeader("Allow", ["GET"]);
		return res.status(405).json({
			error: `Method ${req.method} not Allowed`,
		});
	}
};
