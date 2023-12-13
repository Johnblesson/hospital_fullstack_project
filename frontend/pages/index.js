import React, { useState, useEffect } from "react";
import { VisibilitySharp, VisibilityOff } from "@material-ui/icons";
import Head from "next/head";
import Image from "next/image";
import bg_cover from "../public/images/logo.jpeg";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
// import bg_cover from "../public/images/bg_cover.jpg";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { encryptData } from "../utils/secure";
import { useForm } from "react-hook-form";

import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
const Login = () => {
	const { register, handleSubmit, reset } = useForm();
	const router = useRouter();

	const [loading, setLoading] = useState(false);

	const [passwordVisibility, setPasswordVisibility] = useState(false);

	const salt = process.env.ENCRIPT_SECRET;

	const onSubmit = async (e) => {
		setLoading(true);
		const { email, password } = e;

		if (email === "" || email === null) {
			setLoading(false);
			Swal.fire({
				title: "Error!",
				text: "Please enter your email",
				icon: "error",
				confirmButtonText: "Ok",
			});
		} else if (password === "" || password === null) {
			setLoading(false);
			Swal.fire({
				title: "Error!",
				text: "Please enter your password.",
				icon: "error",
				confirmButtonText: "Ok",
			});
		} else {
			try {
				const response = await axios.post(
					`/api/accounts/login/`,
					JSON.stringify({ email, password }),
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				setLoading(false);

				console.log("response", response);
				let payload = await jwtDecode(response?.data?.token);
				console.log("payload", payload);
				localStorage.setItem("name", payload.user.name);
				localStorage.setItem("role", payload.user.role);
				if (payload.user.role === "USER") {
					router.push("/user/dashboard/overview");
					console.log("response", payload.user);
				}
				if (payload.user.role === "ADMIN") {
					router.push("/admin/dashboard/overview");
				}

				reset();
			} catch (error) {
				setLoading(false);
				Swal.fire({
					title: "Error!",
					text: "email or Password incorrect.",
					icon: "error",
					confirmButtonText: "Ok",
				});
			}
		}
	};

	return (
		<>
			<Head>
				<title>KHRC | Welcome</title>
			</Head>
			<div className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen md:w-screen lg:py-0">
					<a
						href="#"
						className="flex items-center py-5  text-2xl font-semibold text-gray-900 dark:text-white"
					>
						Welcome to KHRC
					</a>
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-lg text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Sign in to your account
							</h1>
							<form
								className="space-y-4 md:space-y-6"
								onSubmit={handleSubmit(onSubmit)}
							>
								<div>
									<label
										htmlFor="tel"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Email
									</label>
									<input
										type="tel"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="Enter your email"
										required
										{...register("email")}
									/>
								</div>
								<div>
									<label
										htmlFor="password"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Password
									</label>

									<div className="flex mt-1 relative">
										<input
											id="password"
											type={passwordVisibility ? "password" : "text"}
											placeholder="Enter your password"
											{...register("password")}
											onChange={() => {
												setPasswordVisibility(passwordVisibility);
											}}
											autoComplete="current-password"
											required
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										/>
										<div className="flex -mr-px">
											<span className="flex items-center leading-normal bg-white rounded rounded-l-none border-0 px-3 whitespace-no-wrap text-gray-600">
												<i
													onClick={() => {
														setPasswordVisibility(!passwordVisibility);
													}}
												>
													{passwordVisibility ? (
														<VisibilityOff className="h-5 w-5 text-blue-500" />
													) : (
														<VisibilitySharp className="h-5 w-5 text-blue-500" />
													)}
												</i>
											</span>
										</div>
									</div>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-start">
										<div className="flex items-center h-5">
											<input
												id="remember"
												aria-describedby="remember"
												type="checkbox"
												className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
											/>
										</div>
										<div className="ml-3 text-sm">
											<label
												htmlFor="remember"
												className="text-gray-500 dark:text-gray-300"
											>
												Remember me
											</label>
										</div>
									</div>
									{/* <a
										href="#"
										className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
									>
										Forgot password?
									</a> */}
								</div>
								<button
									type="submit"
									className="w-full text-white bg-blue-900 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								>
									{loading ? (
										<>
											<svg
												role="status"
												className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
												viewBox="0 0 100 101"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
													fill="currentColor"
												/>
												<path
													d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
													fill="#1C64F2"
												/>
											</svg>
											Loading...
										</>
									) : (
										""
									)}
									{!loading && "Sign in"}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
