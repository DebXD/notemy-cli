#!/usr/bin/env node

import axios from "axios";
import chalk from "chalk";
axios.defaults.baseURL = "https://notemy.dustbin.me/api/auth";

interface noteType {
	id: string;
	title: string;
	desc: string;
	createdAt: string;
	updatedAt: string;
	userId: string;
}

export const getAccessToken = async (username: string, pass: string) => {
	const cred = { username: username, password: pass };
	try {
		const res = await axios.post("/login", cred);
		const accessToken = res.data.data.accessToken;
		// console.log(accessToken);
		return accessToken;
	} catch (err) {
		console.log(chalk.red("Error :"), "Invalid Credentials");
	}
};

export const getNotes = async (token: string) => {
	try {
		const headers = {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		};
		const response = await axios.get("/notes", {
			headers: headers,
		});
		const data = response.data.data;
		const newDataArray: object[] = [];
		data.map((item: noteType) => {
			const { createdAt, updatedAt, userId, ...newObject } = item;
			newDataArray.push(newObject);
		});
		return newDataArray;
	} catch (err) {
		console.log(err);
	}
};

export const addNotes = async (token: string, title: string, desc: string) => {
	try {
		const headers = {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		};
		const body = {
			title: title,
			desc: desc,
		};

		const response = await axios.post("/notes", body, {
			headers: headers,
		});
		// console.log(response);
		if (response.status === 201) {
			return response.data;
		}
	} catch (err) {
		console.log(err);
	}
};

export const getSingleNote = async (token: string, id: string) => {
	try {
		const headers = {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		};
		const response = await axios.get(`/notes/${id}`, {
			headers: headers,
		});
		if (response.status === 200) {
			const data = response.data;
			return data;
		}
	} catch (err: any) {
		if (err?.response.status === 404) {
			console.log(chalk.red("Error : Invalid ID provided."));
		} else {
			console.log(err);
		}
	}
};

export const editNotes = async (
	token: string,
	id: string,
	title: string,
	desc: string,
) => {
	try {
		const headers = {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		};
		const body = {
			title: title,
			desc: desc,
		};
		const response = await axios.patch(`/notes/${id}`, body, {
			headers: headers,
		});
		if (response.status === 200) {
			const data = response.data;
			return data;
		}
	} catch (err: any) {
		if (err?.response.status === 404) {
			console.log(chalk.red("Invalid ID provided."));
		} else {
			console.log(err);
		}
	}
};

export const deleteNotes = async (token: string, id: string) => {
	try {
		const headers = {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		};
		const response = await axios.delete(`/notes/${id}`, {
			headers: headers,
		});
		if (response.status === 200) {
			const data = response.data;
			return data;
		}
	} catch (err: any) {
		if (err?.response.status === 404) {
			console.log(chalk.red("Invalid ID provided."));
		} else {
			console.log(err);
		}
	}
};

export const getMe = async (token: string) => {
	try {
		const headers = {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		};
		const response = await axios.get("/me", {
			headers: headers,
		});
		if (response.status === 200) {
			const data = response.data;
			return data;
		}
	} catch (err) {
		console.log(err);
	}
};
