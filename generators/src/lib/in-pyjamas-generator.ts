import { ProjectTypes } from "./common/types";
import { devDependencies } from "./dev-dependencies";
import { dependencies } from "./dependencies";
import Generator from "yeoman-generator";
import path from "path";
import { toLowerCase } from "./util";

const projectTypeChoices: ProjectTypes[] = [
  "typescript-express",
  "typescript-jekyll-webpack",
  "basiljs"
];
export class InPyjamasGenerator extends Generator {
  public answers: Generator.Answers = {};
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
    // this.log(JSON.stringify(this.answers));
  }

  public writing(): void {
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
      {
        name: this.answers.name
      }
    );
  }

  public install(): void {
    switch (this.answers.type) {
      case "typescript-express":
      case "typescript-jekyll-webpack": {
        this.npmInstall(dependencies[this.answers.type], {
          "save-exact": true
        });
        this.npmInstall(
          [...devDependencies[this.answers.type], ...devDependencies["shared"]],
          {
            "save-exact": true,
            "save-dev": true
          }
        );
        break;
      }
      case "basiljs": {
        this.npmInstall(dependencies[this.answers.type], {
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
  public end(): void {
    if (this.answers.upgrade === true) {
      this.spawnCommand("npx", ["npm-check-updates", "-u"]);
      this.spawnCommand("npm", ["i"]);
    }
    if (this.answers.type === "typescript-jekyll-webpack") {
      this.log("Run `npm run dev` to start webpack and jekyll");
    }
  }
}
