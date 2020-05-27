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
const dev_dependencies_1 = require("./dev-dependencies");
const dependencies_1 = require("./dependencies");
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
const path_1 = __importDefault(require("path"));
const util_1 = require("./util");
const projectTypeChoices = [
    "typescript-express",
    "typescript-jekyll-webpack",
    "basiljs"
];
class InPyjamasGenerator extends yeoman_generator_1.default {
    constructor(args, options) {
        super(args, options);
        this.answers = {};
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
                    filter: util_1.toLowerCase
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
            // this.log(JSON.stringify(this.answers));
        });
    }
    writing() {
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
        this.fs.copyTpl(`${path_1.default.resolve(this.templatePath(), this.answers.type)}/**/*`, this.destinationPath(), {
            name: this.answers.name
        });
    }
    install() {
        switch (this.answers.type) {
            case "typescript-express":
            case "typescript-jekyll-webpack": {
                this.npmInstall(dependencies_1.dependencies[this.answers.type], {
                    "save-exact": true
                });
                this.npmInstall([...dev_dependencies_1.devDependencies[this.answers.type], ...dev_dependencies_1.devDependencies["shared"]], {
                    "save-exact": true,
                    "save-dev": true
                });
                break;
            }
            case "basiljs": {
                this.npmInstall(dependencies_1.dependencies[this.answers.type], {
                    "save-exact": true
                });
                break;
            }
        }
        // this.npmInstall();
        // this.installDependencies({
        //   npm: true,
        //   bower: false
        // });
    }
    end() {
        if (this.answers.upgrade === true) {
            this.spawnCommand("npx", ["npm-check-updates", "-u"]);
            this.spawnCommand("npm", ["i"]);
        }
        if (this.answers.type === "typescript-jekyll-webpack") {
            this.log("Run `npm run dev` to start webpack and jekyll");
        }
    }
}
exports.InPyjamasGenerator = InPyjamasGenerator;
