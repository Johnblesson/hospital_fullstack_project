import { useState } from "react";

const Accordion = ({ title, content }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<button
				onClick={toggleAccordion}
				className="w-full text-left p-4 focus:outline-none bg-gray-200 hover:bg-gray-300"
			>
				<span>{title}</span>
				<span
					className={`ml-auto transform ${isOpen ? "rotate-180" : "rotate-0"}`}
				>
					&#8595;
				</span>
			</button>
			{isOpen && (
				<div className="p-4 bg-white">
					<p>{content}</p>
				</div>
			)}
		</>
	);
};

export default Accordion;
