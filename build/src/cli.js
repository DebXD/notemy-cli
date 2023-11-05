#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
const chalk_1 = __importDefault(require("chalk"));
const prompts_1 = require("@inquirer/prompts");
const api_1 = require("./api/api");
const tiny_spinner_1 = __importDefault(require("tiny-spinner"));
const spinner = new tiny_spinner_1.default();
const cyan = chalk_1.default.hex("#32a88f");
const cli = (token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    if (token) {
        const task = yield (0, prompts_1.select)({
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
            const notes = yield (0, api_1.getNotes)(token);
            spinner.success("Fetching Done!");
            notes === null || notes === void 0 ? void 0 : notes.map((note) => {
                if (note !== null) {
                    console.log(chalk_1.default.gray("-").repeat(process.stdout.columns));
                    console.log(cyan("id: "), note.id);
                    console.log(cyan("Title: "), note.title);
                    console.log(cyan("Desc: "), note.desc);
                    console.log(chalk_1.default.gray("-").repeat(process.stdout.columns));
                }
            });
            console.log("You have total", notes === null || notes === void 0 ? void 0 : notes.length, "notes");
        }
        if (task === "addNotes") {
            const title = yield (0, prompts_1.input)({ message: "Enter your title :" });
            const desc = yield (0, prompts_1.input)({ message: "Enter your desc :" });
            spinner.start("Adding note...");
            const data = yield (0, api_1.addNotes)(token, title, desc);
            spinner.success(chalk_1.default.green("Successfully added Note"));
            if (data.data) {
                console.log(chalk_1.default.gray("-").repeat(process.stdout.columns));
                console.log(cyan("id: "), (_a = data.data) === null || _a === void 0 ? void 0 : _a.id);
                console.log(cyan("Title: "), (_b = data.data) === null || _b === void 0 ? void 0 : _b.title);
                console.log(cyan("Desc: "), (_c = data.data) === null || _c === void 0 ? void 0 : _c.desc);
                console.log(cyan("createdAt: "), (_d = data.data) === null || _d === void 0 ? void 0 : _d.createdAt);
                console.log(cyan("updatedAt: "), (_e = data.data) === null || _e === void 0 ? void 0 : _e.updatedAt);
                console.log(chalk_1.default.gray("-").repeat(process.stdout.columns));
            }
        }
        if (task === "getSingleNote") {
            const id = yield (0, prompts_1.input)({ message: "Enter Note ID : " });
            spinner.start("Loading note...");
            const data = yield (0, api_1.getSingleNote)(token, id);
            // console.log(data);
            spinner.success("Fetching Done!");
            if (data === null || data === void 0 ? void 0 : data.data) {
                console.log(chalk_1.default.gray("-").repeat(process.stdout.columns));
                console.log(cyan("id : "), (_f = data.data) === null || _f === void 0 ? void 0 : _f.id);
                console.log(cyan("title : "), (_g = data.data) === null || _g === void 0 ? void 0 : _g.title);
                console.log(cyan("desc : "), (_h = data.data) === null || _h === void 0 ? void 0 : _h.desc);
                console.log(chalk_1.default.gray("-").repeat(process.stdout.columns));
            }
        }
        if (task === "editNotes") {
            const id = yield (0, prompts_1.input)({ message: "Enter Note ID : " });
            spinner.start("Loading note...");
            const data = yield (0, api_1.getSingleNote)(token, id);
            spinner.success("Fetching Done!");
            if (data.data) {
                console.log(chalk_1.default.gray("-").repeat(process.stdout.columns));
                console.log(cyan("id : "), (_j = data.data) === null || _j === void 0 ? void 0 : _j.id);
                console.log(cyan("title : "), (_k = data.data) === null || _k === void 0 ? void 0 : _k.title);
                console.log(cyan("desc : "), (_l = data.data) === null || _l === void 0 ? void 0 : _l.desc);
                console.log(chalk_1.default.gray("-").repeat(process.stdout.columns));
            }
            const askContinue = yield (0, prompts_1.confirm)({
                message: "Are you sure, you want to edit this?",
            });
            if (askContinue) {
                const title = yield (0, prompts_1.input)({ message: "Enter New Note Title : " });
                const desc = yield (0, prompts_1.input)({ message: "Enter New Note Desc : " });
                spinner.start("Updating note...");
                const data = yield (0, api_1.editNotes)(token, id, title, desc);
                spinner.success(chalk_1.default.green("Note is Updated!"));
                if (data === null || data === void 0 ? void 0 : data.data) {
                    console.log(chalk_1.default.gray("-").repeat(process.stdout.columns));
                    console.log(cyan("id : "), (_m = data.data) === null || _m === void 0 ? void 0 : _m.id);
                    console.log(cyan("title : "), (_o = data.data) === null || _o === void 0 ? void 0 : _o.title);
                    console.log(cyan("desc : "), (_p = data.data) === null || _p === void 0 ? void 0 : _p.desc);
                    console.log(chalk_1.default.gray("-").repeat(process.stdout.columns));
                }
            }
        }
        if (task === "deleteNotes") {
            const id = yield (0, prompts_1.input)({ message: "Enter Note ID : " });
            spinner.start("Loading Note...");
            const data = yield (0, api_1.getSingleNote)(token, id);
            spinner.success("Fetching Done!");
            if (data === null || data === void 0 ? void 0 : data.data) {
                console.log(chalk_1.default.gray("-").repeat(process.stdout.columns));
                console.log(cyan("id : "), (_q = data.data) === null || _q === void 0 ? void 0 : _q.id);
                console.log(cyan("title : "), (_r = data.data) === null || _r === void 0 ? void 0 : _r.title);
                console.log(cyan("desc : "), (_s = data.data) === null || _s === void 0 ? void 0 : _s.desc);
                console.log(chalk_1.default.gray("-").repeat(process.stdout.columns));
                const askContinue = yield (0, prompts_1.confirm)({
                    message: "Are you sure, you want to Delete this?",
                });
                if (askContinue) {
                    spinner.start("Deleting note...");
                    const data = yield (0, api_1.deleteNotes)(token, id);
                    if (data) {
                        spinner.success(chalk_1.default.red("Note is Deleted"));
                    }
                }
            }
        }
        if (task === "quit") {
            console.log(chalk_1.default.gray("OK Quitting!"));
            process.exit();
        }
    }
    console.log("");
    (0, exports.cli)(token);
});
exports.cli = cli;
