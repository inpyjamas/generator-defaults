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
const projectTypeChoices = ["typescript-express"];
// let type: ProjectTypes = projectTypeChoices[0];
class InPyjamasGenerator extends yeoman_generator_1.default {
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            const questions = [
                {
                    type: "input",
                    name: "name",
                    message: "Your project name (no special characters please)",
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
                }
            ];
            this.answers = yield this.prompt(questions);
            this.answers.name = this.answers.name.replace(/[^a-zA-Z]/g, "");
            this.answers.name = this.answers.name.replace(/ /g, "-");
        });
    }
    writing() {
        if (this.answers === undefined) {
            throw new Error("answers not defined");
        }
        let pgkTemplateName = "";
        switch (this.answers.type) {
            case "typescript-express": {
                pgkTemplateName = `_package-${this.answers.type}.json`;
                break;
            }
            default: {
                throw new Error("No default case defiend");
            }
        }
        this.fs.copyTpl(this.templatePath(pgkTemplateName), this.destinationPath("package.json"), {
            name: this.answers.name
        });
        this.fs.copy(`${path_1.default.resolve(__dirname, this.answers.type)}/**/*`, this.destinationPath(), {
            globOptions: { dot: true }
        });
        this.fs.copy(`${path_1.default.resolve(__dirname, "common")}/**/*`, this.destinationPath(), {
            globOptions: { dot: true }
        });
    }
    install() {
        this.installDependencies({
            npm: true,
            bower: false
        });
    }
    end() {
        this.spawnCommand("npm", ["run", "upgrade"]);
    }
}
exports.InPyjamasGenerator = InPyjamasGenerator;
