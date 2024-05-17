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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.deleteNotes = exports.editNotes = exports.getSingleNote = exports.addNotes = exports.getNotes = exports.getAccessToken = void 0;
const axios_1 = __importDefault(require("axios"));
const chalk_1 = __importDefault(require("chalk"));
axios_1.default.defaults.baseURL = "https://notemy-api.dustbin.me/api/auth/";
const getAccessToken = (username, pass) => __awaiter(void 0, void 0, void 0, function* () {
    const cred = { username: username, password: pass };
    try {
        const res = yield axios_1.default.post("/login", cred);
        const accessToken = res.data.data.accessToken;
        console.log(username, pass);
        return accessToken;
    }
    catch (err) {
        console.log(chalk_1.default.red("Error :"), "Invalid Credentials");
    }
});
exports.getAccessToken = getAccessToken;
const getNotes = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
        const response = yield axios_1.default.get("/notes", {
            headers: headers,
        });
        const data = response.data.data;
        const newDataArray = [];
        data.map((item) => {
            const { createdAt, updatedAt, userId } = item, newObject = __rest(item, ["createdAt", "updatedAt", "userId"]);
            newDataArray.push(newObject);
        });
        return newDataArray;
    }
    catch (err) {
        console.log(err);
    }
});
exports.getNotes = getNotes;
const addNotes = (token, title, desc) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
        const body = {
            title: title,
            desc: desc,
        };
        const response = yield axios_1.default.post("/notes", body, {
            headers: headers,
        });
        // console.log(response);
        if (response.status === 201) {
            return response.data;
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.addNotes = addNotes;
const getSingleNote = (token, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
        const response = yield axios_1.default.get(`/notes/${id}`, {
            headers: headers,
        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    }
    catch (err) {
        if ((err === null || err === void 0 ? void 0 : err.response.status) === 404) {
            console.log(chalk_1.default.red("Error : Invalid ID provided."));
        }
        else {
            console.log(err);
        }
    }
});
exports.getSingleNote = getSingleNote;
const editNotes = (token, id, title, desc) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
        const body = {
            title: title,
            desc: desc,
        };
        const response = yield axios_1.default.patch(`/notes/${id}`, body, {
            headers: headers,
        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    }
    catch (err) {
        if ((err === null || err === void 0 ? void 0 : err.response.status) === 404) {
            console.log(chalk_1.default.red("Invalid ID provided."));
        }
        else {
            console.log(err);
        }
    }
});
exports.editNotes = editNotes;
const deleteNotes = (token, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
        const response = yield axios_1.default.delete(`/notes/${id}`, {
            headers: headers,
        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    }
    catch (err) {
        if ((err === null || err === void 0 ? void 0 : err.response.status) === 404) {
            console.log(chalk_1.default.red("Invalid ID provided."));
        }
        else {
            console.log(err);
        }
    }
});
exports.deleteNotes = deleteNotes;
const getMe = (token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
        const response = yield axios_1.default.get("/me", {
            headers: headers,
        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    }
    catch (err) {
        if (((_a = err.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
            console.log(chalk_1.default.red("\nInvalid Token, Enter Your Credentials again."));
        }
        else {
            console.log(err);
        }
    }
});
exports.getMe = getMe;
