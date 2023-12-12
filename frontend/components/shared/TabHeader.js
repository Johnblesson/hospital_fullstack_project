import { UsersIcon, ViewGridIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function TabHeader(props) {
	const router = useRouter();
	const { pathname } = router;
	var tabs;

	if (
		pathname === "/admin/dashboard/ebl-2012/sample-receipt" ||
		pathname === "/admin/dashboard/ebl-2012/sample-storage"
	) {
		tabs = [
			{
				name: "Sample Receipt",
				href: "/admin/dashboard/ebl-2012/sample-receipt",
				icon: ViewGridIcon,
				current:
					pathname === "/admin/dashboard/ebl-2012/sample-receipt"
						? true
						: false,
			},
			{
				name: "Sample Storage",
				href: "/admin/dashboard/ebl-2012/sample-storage",
				icon: UsersIcon,
				current:
					pathname === "/admin/dashboard/ebl-2012/sample-storage"
						? true
						: false,
			},
		];
	}
	if (
		pathname === "/user/dashboard/ebl-2012/sample-receipt" ||
		pathname === "/user/dashboard/ebl-2012/sample-storage"
	) {
		tabs = [
			{
				name: "Sample Receipt",
				href: "/user/dashboard/ebl-2012/sample-receipt",
				icon: ViewGridIcon,
				current:
					pathname === "/user/dashboard/ebl-2012/sample-receipt" ? true : false,
			},
			{
				name: "Sample Storage",
				href: "/user/dashboard/ebl-2012/sample-storage",
				icon: UsersIcon,
				current:
					pathname === "/user/dashboard/ebl-2012/sample-storage" ? true : false,
			},
		];
	}

	return (
		<>
			<div className="sm:hidden">
				<label htmlFor="tabs" className="sr-only">
					Select a tab
				</label>
				<div className="border-b border-gray-200">
					<nav className="-mb-px flex space-x-8" aria-label="Tabs">
						{tabs?.map((tab, i) => (
							<Link href={tab.href} key={i}>
								<a
									className={classNames(
										tab?.current
											? "border-blue-900 text-blue-900"
											: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
										"group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
									)}
									aria-current={tab.current ? "page" : undefined}
								>
									<tab.icon
										className={classNames(
											tab?.current
												? "text-blue-900"
												: "text-gray-400 group-hover:text-gray-500",
											"-ml-0.5 mr-2 h-5 w-5"
										)}
										aria-hidden="true"
									/>
									<span>{tab.name}</span>
								</a>
							</Link>
						))}
					</nav>
				</div>
			</div>
			<div className="hidden sm:block">
				<div className="border-b border-gray-200">
					<nav className="-mb-px flex space-x-8" aria-label="Tabs">
						{tabs?.map((tab, index) => (
							<Link href={tab.href} key={index}>
								<a
									className={classNames(
										tab?.current
											? "border-blue-900 text-blue-900"
											: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
										"group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
									)}
									aria-current={tab.current ? "page" : undefined}
								>
									<tab.icon
										className={classNames(
											tab?.current
												? "text-blue-900"
												: "text-gray-400 group-hover:text-gray-500",
											"-ml-0.5 mr-2 h-5 w-5"
										)}
										aria-hidden="true"
									/>
									<span>{tab.name}</span>
								</a>
							</Link>
						))}
					</nav>
				</div>
			</div>
		</>
	);
}
