import { config } from "@config";
import  app from "app-config";

const start = async () => {
	// Start 'er up
	app
		.listen(config.PORT, () => {
			console.log(`Civitas running on port ${config.PORT}`);
		})
		.on('error', (err) => {
			console.error(err);
			process.exit();
		});
};

start();
