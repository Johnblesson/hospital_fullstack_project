import cookie from "cookie";

export default async (req, res) => {
	const server = process.env.NEXT_PUBLIC_BASE_URL;
	const data = req.body;

	if (req.method === "POST") {
		const cookies = cookie.parse(req.headers.cookie ?? "");
		const accessToken = cookies.access ?? false;

		if (accessToken === false) {
			return res.status(401).json({
				error: "User unauthorized to make this request",
			});
		}

		try {
			const apiRes = await fetch(`${server}/api/ebl2012/sample-receipt`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify(data),
			});

			if (!apiRes.ok) {
				throw new Error("Request failed with status " + apiRes.status);
			}

			const responseData = await apiRes.json();

			return res.status(201).json({
				success: "Add Sample Receipt Successful",
			});
		} catch (err) {
			console.error(err);
			return res.status(500).json({
				error: "Something went wrong when trying to fulfill the request",
			});
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		return res.status(405).json({
			error: `Method ${req.method} not Allowed`,
		});
	}
};
