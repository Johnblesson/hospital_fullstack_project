import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../package.json";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "REST API Docs",
			version,
		},
		components: {
			securitySchemas: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
	// Swagger page
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

	// Docs in JSON format
	app.get("/docs.json", (req, res) => {
		res.setHeader("Content-Type", "application/json");
		res.send(swaggerSpec);
	});

	console.info(`Docs available at http://localhost:${port}/api-docs`);
}

export default swaggerDocs;
