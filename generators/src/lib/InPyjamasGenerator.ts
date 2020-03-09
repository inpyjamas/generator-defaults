import Generator from "yeoman-generator";
import path from "path";
import { toLowerCase } from "./util";
// type ProjectTypes = "typescript-express";
const projectTypeChoices: string[] = ["typescript-express"];

// let type: ProjectTypes = projectTypeChoices[0];

export class InPyjamasGenerator extends Generator {
  public answers: Generator.Answers | undefined;
  constructor(args: string | string[], options: {}) {
    super(args, options);
    this.sourceRoot(path.resolve(__dirname, "../../templates"));
  }
  public async prompting(): Promise<void> {
    const questions: Generator.Question[] = [
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
        filter: toLowerCase
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
    this.answers = await this.prompt(questions);
    this.answers.name = this.answers.name.replace(/[^a-zA-Z]/g, "");
    this.answers.name = this.answers.name.replace(/ /g, "-");
    this.log(JSON.stringify(this.answers));
  }

  public writing(): void {
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
    this.fs.copy(
      `${path.resolve(__dirname, "../../common")}/**/*`,
      this.destinationPath(),
      {
        globOptions: { dot: true }
      }
    );

    /**
     * Copy all files from the selected templates directory
     * and replace all the ejs template strings
     * uses https://github.com/SBoudrias/mem-fs-editor under the hood
     */
    this.fs.copyTpl(
      `${path.resolve(this.templatePath(), this.answers.type)}/**/*`,
      this.destinationPath(),

      // this.templatePath(pgkTemplateName),
      // this.destinationPath("package.json"),
      {
        name: this.answers.name
      }
    );
  }

  public install(): void {
    this.installDependencies({
      npm: true,
      bower: false
    });
  }
  public end(): void {
    if (this.answers && this.answers.upgrade === true) {
      this.spawnCommand("npx", ["npm-check-updates", "-u"]);
      this.spawnCommand("npm", ["i"]);
    }
  }
}
