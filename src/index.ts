#!/usr/bin/env node

import { input, password } from "@inquirer/prompts";
import fs from "fs";
import { cli } from "./cli";
import { getAccessToken, getMe } from "./api/api";
import ora from "ora";

const main = async () => {
	try {
		const token = fs.readFileSync("./.tmp", "utf8");

		const spinner = ora("Processsing...").start();
		const res = await getMe(token);
		spinner.succeed("Done!");
		if (res.success === true) {
			cli(token);
		}
	} catch (err) {
		const username = await input({ message: "Enter your Username :" });
		const pass = await password({
			message: "Enter your Password :",
			mask: true,
		});

		// spinner.start("Processsing...");
		const token = await getAccessToken(username, pass);
		// spinner.success("Done!");
		if (token) {
			fs.writeFileSync(".tmp", token, "utf8");
			cli(token);
		}
	}
};

main();
