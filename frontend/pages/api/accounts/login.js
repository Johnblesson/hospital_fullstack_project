import cookie from "cookie";

export default async (req, res) => {
	const server = process.env.NEXT_PUBLIC_BASE_URL;
	console.log("server: " + server);

	if (req.method === "POST") {
		const { email, password } = req.body;

		const body = JSON.stringify({
			email,
			password,
		});

		try {
			const apiRes = await fetch(`${server}/api/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: body,
			});

			console.log("apiRes: " + apiRes);

			const data = await apiRes.json();

			console.log("data: " + data);

			if (apiRes.status === 200) {
				res.setHeader("Set-Cookie", [
					cookie.serialize("access", data.accessToken, {
						httpOnly: true,
						secure: process.env.NODE_ENV !== "development",
						maxAge: 60 * 60 * 24 * 90,
						sameSite: "strict",
						path: "/api/",
					}),
				]);
				return res
					.status(200)
					.json({ success: "login successful", token: data.accessToken });
			} else {
				return res.status(apiRes.status).json({ error: "login failed" });
			}
		} catch (err) {
			return res.status(500).json({
				error: "Something Went Wrong",
			});
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		return res.status(405).json({
			error: `Method ${req.method} not allowed`,
		});
	}
};
