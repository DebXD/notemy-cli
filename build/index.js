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
const prompts_1 = require("@inquirer/prompts");
const fs_1 = __importDefault(require("fs"));
const cli_1 = require("./src/cli");
const api_1 = require("./src/api/api");
const tiny_spinner_1 = __importDefault(require("tiny-spinner"));
const spinner = new tiny_spinner_1.default();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = fs_1.default.readFileSync("./.tmp", "utf8");
        spinner.start("Processsing...");
        const res = yield (0, api_1.getMe)(token);
        spinner.success("Done!");
        if (res.success === true) {
            (0, cli_1.cli)(token);
        }
    }
    catch (err) {
        const username = yield (0, prompts_1.input)({ message: "Enter your Username :" });
        const pass = yield (0, prompts_1.password)({
            message: "Enter your Password :",
            mask: true,
        });
        spinner.start("Processsing...");
        const token = yield (0, api_1.getAccessToken)(username, pass);
        spinner.success("Done!");
        if (token) {
            fs_1.default.writeFileSync(".tmp", token, "utf8");
            (0, cli_1.cli)(token);
        }
    }
});
main();
