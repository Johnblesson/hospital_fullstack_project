import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import avatar from "../../public/images/avatar.png";
import Image from "next/image";
import {
	BellIcon,
	FolderIcon,
	HomeIcon,
	MenuAlt2Icon,
	UsersIcon,
	XIcon,
	LogoutIcon,
} from "@heroicons/react/outline";
import { ArrowDownIcon } from "@heroicons/react/solid";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { decryptData } from "../../utils/secure";

const userNavigation = [
	{ name: "Sign out", icon: LogoutIcon, href: "#", onclick: true },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function userDashboardFrame(props) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const router = useRouter();
	const [username, setUsername] = useState(null);
	const salt = process.env.ENCRIPT_SECRET;

	const { pathname } = router;

	const handleLogout = (e) => {
		e.preventDefault();
		axios.post("/api/logout/").then((response) => {
			if (response.status === 200) {
				router.push("/");
				localStorage.clear();
			}
		});
	};

	useEffect(() => {
		let unmounted = false;
		if (!unmounted) {
			const user_name = localStorage.getItem("name");
			// const originalData = decryptData(user_name, salt);
			setUsername(user_name);
		}
		return () => {
			unmounted = true;
		};
	}, []);

	const navigation = [
		{
			name: "Dashboard",
			href: "/user/dashboard/overview/",
			icon: HomeIcon,
			current: pathname === "/user/dashboard/overview" ? true : false,
		},
		{
			name: "EBL 3005",
			href: "/user/dashboard/ebl-3005/",
			icon: FolderIcon,
			current: pathname === "/user/dashboard/ebl-3005" ? true : false,
		},
		{
			name: "EBL 2005 Ext",
			href: "/user/dashboard/ebl-2005-ext/",
			icon: FolderIcon,
			current: pathname === "/user/dashboard/ebl-2005-ext" ? true : false,
		},
		{
			name: "Parasitology Survey",
			href: "/user/dashboard/parasitology-survey/",
			icon: FolderIcon,
			current:
				pathname === "/user/dashboard/parasitology-survey" ? true : false,
		},
		{
			name: "EBL 2012",
			href: "/user/dashboard/ebl-2012/sample-receipt/",
			icon: FolderIcon,
			current:
				pathname === "/user/dashboard/ebl-2012/sample-receipt" ||
				pathname === "/user/dashboard/ebl-2012/sample-storage" ||
				pathname.includes("/user/dashboard/ebl-2012/receipt/")
					? true
					: false,
		},
		{
			name: "EBL 2011",
			href: "/user/dashboard/ebl-2011/",
			icon: FolderIcon,
			current: pathname === "/user/dashboard/ebl-2011" ? true : false,
		},
		{
			name: "PREVAC",
			href: "/user/dashboard/prevac/",
			icon: FolderIcon,
			current: pathname === "/user/dashboard/prevac" ? true : false,
		},
		{
			name: "HWI",
			href: "/user/dashboard/hwi/",
			icon: FolderIcon,
			current: pathname === "/user/dashboard/hwi" ? true : false,
		},
		{
			name: "WHO STV",
			href: "/user/dashboard/who-stv/",
			icon: FolderIcon,
			current: pathname === "/user/dashboard/who-stv" ? true : false,
		},
		{
			name: "EBL 2015",
			href: "/user/dashboard/ebl-2015/",
			icon: FolderIcon,
			current: pathname === "/user/dashboard/ebl-2015" ? true : false,
		},
	];

	return (
		<div className="h-screen flex overflow-hidden bg-gray-100">
			<Transition.Root show={sidebarOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 flex z-40 md:hidden"
					onClose={setSidebarOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
					</Transition.Child>
					<Transition.Child
						as={Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="-translate-x-full"
						enterTo="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="translate-x-0"
						leaveTo="-translate-x-full"
					>
						<div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
							<Transition.Child
								as={Fragment}
								enter="ease-in-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in-out duration-300"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<div className="absolute top-0 right-0 -mr-12 pt-2">
									<button
										type="button"
										className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
										onClick={() => setSidebarOpen(false)}
									>
										<span className="sr-only">Close sidebar</span>
										<XIcon className="h-6 w-6 text-white" aria-hidden="true" />
									</button>
								</div>
							</Transition.Child>
							<div className="flex-shrink-0 flex items-center px-4">
								<h3 className="h-8 w-auto text-gray-50">KHRC</h3>
							</div>
							<div className="mt-5 flex-1 h-0 overflow-y-auto">
								<nav className="px-2 space-y-1">
									{navigation.map((item) => (
										<Link href={item.href} key={item.name}>
											<a
												className={classNames(
													item.current
														? "bg-gray-900 text-white"
														: "text-gray-300 hover:bg-gray-700 hover:text-white",
													"group flex items-center px-2 py-2 text-base font-medium rounded-md"
												)}
											>
												<item.icon
													className={classNames(
														item.current
															? "text-gray-300"
															: "text-gray-400 group-hover:text-gray-300",
														"mr-4 flex-shrink-0 h-6 w-6"
													)}
													aria-hidden="true"
												/>
												{item.name}
											</a>
										</Link>
									))}
								</nav>
							</div>
						</div>
					</Transition.Child>
					<div className="flex-shrink-0 w-14" aria-hidden="true">
						{/* Dummy element to force sidebar to shrink to fit close icon */}
					</div>
				</Dialog>
			</Transition.Root>

			{/* Static sidebar for desktop */}
			<div className="hidden md:flex md:flex-shrink-0">
				<div className="flex flex-col w-64">
					{/* Sidebar component, swap this element with another sidebar if you like */}
					<div className="flex-1 flex flex-col min-h-0">
						<div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
							<h1 className="text-3xl text-gray-50">KHRC</h1>
						</div>
						<div className="flex-1 flex flex-col overflow-y-auto">
							<nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1">
								{navigation.map((item) => (
									<a
										key={item.name}
										href={item.href}
										className={classNames(
											item.current
												? "bg-gray-900 text-white"
												: "text-gray-300 hover:bg-gray-700 hover:text-white",
											"group flex items-center px-2 py-2 text-sm font-medium rounded-md"
										)}
									>
										<item.icon
											className={classNames(
												item.current
													? "text-gray-300"
													: "text-gray-400 group-hover:text-gray-300",
												"mr-3 flex-shrink-0 h-6 w-6"
											)}
											aria-hidden="true"
										/>
										{item.name}
									</a>
								))}
							</nav>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col w-0 flex-1 overflow-hidden">
				<div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
					<button
						type="button"
						className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
						onClick={() => setSidebarOpen(true)}
					>
						<span className="sr-only">Open sidebar</span>
						<MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
					</button>
					<div className="flex-1 px-4 flex justify-between">
						<div className="flex-1 flex"></div>
						<div className="ml-4 flex items-center md:ml-6">
							<button
								type="button"
								className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								<span className="sr-only">View notifications</span>
								<BellIcon className="h-6 w-6" aria-hidden="true" />
							</button>

							{/* Profile dropdown */}
							<Menu as="div" className="ml-3 relative">
								<div>
									<Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2">
										<span className="sr-only">Open user menu</span>
										<Image src={avatar} className="h-8 w-8 rounded-full" />
										&nbsp;Welcome, {`${username}`}
										<ArrowDownIcon className="h-5 w-5"></ArrowDownIcon>
									</Menu.Button>
								</div>
								<Transition
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
										{userNavigation.map((item) => (
											<Menu.Item key={item.name}>
												{({ active }) => (
													<a
														href={item.href}
														onClick={item.onclick ? handleLogout : undefined}
														className={classNames(
															active ? "bg-gray-100" : "",
															"flex px-4 py-2 text-sm text-gray-700"
														)}
													>
														<item.icon
															className={classNames(
																item.current
																	? "text-gray-300"
																	: "text-gray-400 group-hover:text-gray-300",
																"mr-4 flex-shrink-0 h-6 w-6"
															)}
															aria-hidden="true"
														/>
														{item.name}
													</a>
												)}
											</Menu.Item>
										))}
									</Menu.Items>
								</Transition>
							</Menu>
						</div>
					</div>
				</div>

				<main className="flex-1 relative overflow-y-auto focus:outline-none">
					<div className="py-6">
						<div className="max-w-full mx-auto px-4 sm:px-6 md:px-8">
							{/* Replace with your content */}
							{props.children}
							{/* /End replace */}
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
