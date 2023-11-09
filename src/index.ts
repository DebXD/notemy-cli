#!/usr/bin/env node

import { input, password } from "@inquirer/prompts";
import fs from "fs";
import { cli } from "./cli";
import { getAccessToken, getMe } from "./api/api";
import ora from "ora";
import os from "os";

const main = async () => {
	const homeDirectory = os.homedir();
	try {
		const token = fs.readFileSync(`${homeDirectory}/.token`, "utf8");

		const spinner = ora("Processsing...").start();
		const res = await getMe(token);
		spinner.stop();
		if (res.success === true) {
			spinner.succeed("Done!");
			cli(token);
		} else {
		}
	} catch (err) {
		const username = await input({ message: "Enter your Username :" });
		const pass = await password({
			message: "Enter your Password :",
			mask: true,
		});

		const spinner = ora("Processsing...").start();
		const token = await getAccessToken(username, pass);
		spinner.succeed("Done!");
		if (token) {
			fs.writeFileSync(`${homeDirectory}/.token`, token, "utf8");
			cli(token);
		}
	}
};

main();
