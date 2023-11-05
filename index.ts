#!/usr/bin/env node

import { input, password } from "@inquirer/prompts";
import fs from "fs";
import { cli } from "./src/cli";
import { getAccessToken, getMe } from "./src/api/api";
import Spinner from "tiny-spinner";

const spinner = new Spinner();

const main = async () => {
	try {
		const token = fs.readFileSync("./.tmp", "utf8");

		spinner.start("Processsing...");
		const res = await getMe(token);
		spinner.success("Done!");
		if (res.success === true) {
			cli(token);
		}
	} catch (err) {
		const username = await input({ message: "Enter your Username :" });
		const pass = await password({
			message: "Enter your Password :",
			mask: true,
		});

		spinner.start("Processsing...");
		const token = await getAccessToken(username, pass);
		spinner.success("Done!");
		if (token) {
			fs.writeFileSync(".tmp", token, "utf8");
			cli(token);
		}
	}
};

main();
