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
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
const path_1 = __importDefault(require("path"));
// type ProjectTypes = "typescript-express";
const projectTypeChoices = ["typescript-express"];
// let type: ProjectTypes = projectTypeChoices[0];
class InPyjamasGenerator extends yeoman_generator_1.default {
    constructor(args, options) {
        super(args, options);
        this.sourceRoot(path_1.default.resolve(__dirname, "../../templates"));
    }
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            const questions = [
                {
                    type: "input",
                    name: "name",
                    message: "What is your projects name (no special characters please)?",
                    default: this.appname // Default to current folder name
                },
                {
                    type: "list",
                    name: "type",
                    message: "Select your setup type",
                    choices: projectTypeChoices,
                    filter: function (val) {
                        return val.toLowerCase();
                    }
                },
                {
                    type: "list",
                    name: "upgrade",
                    choices: [
                        { name: "No", value: false },
                        { name: "Yes", value: true }
                    ],
                    message: "Should I force upgrade all packages?",
                    default: 0
                }
            ];
            this.answers = yield this.prompt(questions);
            this.answers.name = this.answers.name.replace(/[^a-zA-Z]/g, "");
            this.answers.name = this.answers.name.replace(/ /g, "-");
            this.log(JSON.stringify(this.answers));
        });
    }
    writing() {
        if (this.answers === undefined) {
            throw new Error("answers not defined");
        }
        // let pgkTemplateName = "";
        // switch (this.answers.type as ProjectTypes) {
        //   case "typescript-express": {
        //     pgkTemplateName = `${this.answers.type}/package.json`;
        //     break;
        //   }
        //   default: {
        //     throw new Error("No default case defiend");
        //   }
        // }
        /**
         * Copy all the files from the commons directory
         *
         */
        this.fs.copy(`${path_1.default.resolve(__dirname, "../../common")}/**/*`, this.destinationPath(), {
            globOptions: { dot: true }
        });
        /**
         * Copy all files from the selected templates directory
         * and replace all the ejs template strings
         * uses https://github.com/SBoudrias/mem-fs-editor under the hood
         */
        this.fs.copyTpl(`${path_1.default.resolve(this.templatePath(), this.answers.type)}/**/*`, this.destinationPath(), 
        // this.templatePath(pgkTemplateName),
        // this.destinationPath("package.json"),
        {
            name: this.answers.name
        });
    }
    install() {
        this.installDependencies({
            npm: true,
            bower: false
        });
    }
    end() {
        if (this.answers && this.answers.upgrade === true) {
            this.spawnCommand("npx", ["npm-check-updates", "-u"]);
            this.spawnCommand("npm", ["i"]);
        }
    }
}
exports.InPyjamasGenerator = InPyjamasGenerator;
