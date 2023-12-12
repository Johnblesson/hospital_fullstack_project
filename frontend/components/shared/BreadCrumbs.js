import Link from "next/link";

function Breadcrumb({ links }) {
	return (
		<nav className="text-sm font-medium" aria-label="Breadcrumb">
			<ol className="list-none p-0 inline-flex">
				{links.map((link, index) => (
					<li key={index} className="flex items-center">
						{index > 0 && <span className="mx-2">&gt;</span>}
						{link.href ? (
							<Link href={link.href}>
								<a className="text-gray-500 hover:text-gray-700">
									{link.label}
								</a>
							</Link>
						) : (
							<span className="text-gray-700">{link.label}</span>
						)}
					</li>
				))}
			</ol>
			<br />
		</nav>
	);
}

export default Breadcrumb;
