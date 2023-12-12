import { PuffLoader } from "react-spinners";

export default function CardStats({ stats }) {
	if (stats) {
		return (
			<>
				<dl className="my-20 grid grid-cols-1 gap-5 sm:grid-cols-3">
					{stats?.map((item, index) => {
						return (
							<div
								key={index}
								className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6 h-55"
							>
								<p className="text-m text-center font-medium text-gray-500 wrap">
									{item?.name}
								</p>

								<div className="py-6 text-2xl text-gray-900 text-center">
									{item?.stat === undefined ? (
										<PuffLoader
											type="Puff"
											color="#00BFFF"
											className="center"
											height={200}
											width={200}
										/>
									) : (
										item?.stat
									)}
								</div>
							</div>
						);
					})}
				</dl>
			</>
		);
	} else
		return (
			<div>
				<dl className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
					<div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
						<p className="text-sm font-medium text-gray-500 truncate">
							No stats found
						</p>
					</div>
				</dl>
			</div>
		);
}
