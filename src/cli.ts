#!/usr/bin/env node
import chalk from "chalk";
import { confirm, input, select } from "@inquirer/prompts";
import {
	addNotes,
	deleteNotes,
	editNotes,
	getNotes,
	getSingleNote,
} from "./api/api";
import Spinner from "tiny-spinner";
const spinner = new Spinner();

const cyan = chalk.hex("#32a88f");

export const cli = async (token: string) => {
	interface noteType {
		id?: string;
		title?: string;
		desc?: string;
		createdAt?: string;
		updatedAt?: string;
	}

	if (token) {
		const task = await select({
			message: "Select your action :",
			choices: [
				{ name: "Get Notes", value: "getNotes" },
				{ name: "Get a Single Note", value: "getSingleNote" },
				{ name: "Add Notes", value: "addNotes" },
				{ name: "Edit Notes", value: "editNotes" },
				{ name: "Delete Notes", value: "deleteNotes" },
				{ name: "Quit", value: "quit" },
			],
		});

		if (task === "getNotes") {
			spinner.start("Loading Notes...");
			const notes = await getNotes(token);
			spinner.success("Fetching Done!");
			notes?.map((note: noteType) => {
				if (note !== null) {
					console.log(chalk.gray("-").repeat(process.stdout.columns));
					console.log(cyan("id: "), note.id);
					console.log(cyan("Title: "), note.title);
					console.log(cyan("Desc: "), note.desc);
					console.log(chalk.gray("-").repeat(process.stdout.columns));
				}
			});
			console.log("You have total", notes?.length, "notes");
		}

		if (task === "addNotes") {
			const title = await input({ message: "Enter your title :" });
			const desc = await input({ message: "Enter your desc :" });
			spinner.start("Adding note...");
			const data = await addNotes(token, title, desc);
			spinner.success(chalk.green("Successfully added Note"));
			if (data.data) {
				console.log(chalk.gray("-").repeat(process.stdout.columns));
				console.log(cyan("id: "), data.data?.id);
				console.log(cyan("Title: "), data.data?.title);
				console.log(cyan("Desc: "), data.data?.desc);
				console.log(cyan("createdAt: "), data.data?.createdAt);
				console.log(cyan("updatedAt: "), data.data?.updatedAt);
				console.log(chalk.gray("-").repeat(process.stdout.columns));
			}
		}

		if (task === "getSingleNote") {
			const id = await input({ message: "Enter Note ID : " });
			spinner.start("Loading note...");
			const data = await getSingleNote(token, id);
			// console.log(data);
			spinner.success("Fetching Done!");
			if (data?.data) {
				console.log(chalk.gray("-").repeat(process.stdout.columns));
				console.log(cyan("id : "), data.data?.id);
				console.log(cyan("title : "), data.data?.title);
				console.log(cyan("desc : "), data.data?.desc);
				console.log(chalk.gray("-").repeat(process.stdout.columns));
			}
		}
		if (task === "editNotes") {
			const id = await input({ message: "Enter Note ID : " });
			spinner.start("Loading note...");
			const data = await getSingleNote(token, id);
			spinner.success("Fetching Done!");
			if (data.data) {
				console.log(chalk.gray("-").repeat(process.stdout.columns));
				console.log(cyan("id : "), data.data?.id);
				console.log(cyan("title : "), data.data?.title);
				console.log(cyan("desc : "), data.data?.desc);
				console.log(chalk.gray("-").repeat(process.stdout.columns));
			}
			const askContinue = await confirm({
				message: "Are you sure, you want to edit this?",
			});
			if (askContinue) {
				const title = await input({ message: "Enter New Note Title : " });
				const desc = await input({ message: "Enter New Note Desc : " });
				spinner.start("Updating note...");
				const data = await editNotes(token, id, title, desc);
				spinner.success(chalk.green("Note is Updated!"));
				if (data?.data) {
					console.log(chalk.gray("-").repeat(process.stdout.columns));
					console.log(cyan("id : "), data.data?.id);
					console.log(cyan("title : "), data.data?.title);
					console.log(cyan("desc : "), data.data?.desc);
					console.log(chalk.gray("-").repeat(process.stdout.columns));
				}
			}
		}
		if (task === "deleteNotes") {
			const id = await input({ message: "Enter Note ID : " });
			spinner.start("Loading Note...");
			const data = await getSingleNote(token, id);
			spinner.success("Fetching Done!");
			if (data?.data) {
				console.log(chalk.gray("-").repeat(process.stdout.columns));
				console.log(cyan("id : "), data.data?.id);
				console.log(cyan("title : "), data.data?.title);
				console.log(cyan("desc : "), data.data?.desc);
				console.log(chalk.gray("-").repeat(process.stdout.columns));
				const askContinue = await confirm({
					message: "Are you sure, you want to Delete this?",
				});
				if (askContinue) {
					spinner.start("Deleting note...");
					const data = await deleteNotes(token, id);
					if (data) {
						spinner.success(chalk.red("Note is Deleted"));
					}
				}
			}
		}
		if (task === "quit") {
			console.log(chalk.gray("OK Quitting!"));
			process.exit();
		}
	}
	console.log("");
	cli(token);
};
