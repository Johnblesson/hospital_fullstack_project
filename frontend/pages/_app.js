import "tailwindcss/tailwind.css";
import { Provider } from "react-redux";
import { store } from "../store";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<link rel="icon" type="image/x-icon" href="#" />
			</Head>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</>
	);
}

export default MyApp;
