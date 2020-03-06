import Generator from "yeoman-generator";
import path from "path";
type ProjectTypes = "typescript-express";
const projectTypeChoices: ProjectTypes[] = ["typescript-express"];

// let type: ProjectTypes = projectTypeChoices[0];

export class InPyjamasGenerator extends Generator {
  public answers: Generator.Answers | undefined;

  public async prompting(): Promise<void> {
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
        filter: function(val: string): string {
          return val.toLowerCase();
        }
      }
    ];
    this.answers = await this.prompt(questions);
    this.answers.name = this.answers.name.replace(/[^a-zA-Z]/g, "");
    this.answers.name = this.answers.name.replace(/ /g, "-");
  }

  public writing(): void {
    if (this.answers === undefined) {
      throw new Error("answers not defined");
    }
    let pgkTemplateName = "";
    switch (this.answers.type as ProjectTypes) {
      case "typescript-express": {
        pgkTemplateName = `_package-${this.answers.type}.json`;
        break;
      }
      default: {
        throw new Error("No default case defiend");
      }
    }
    this.fs.copyTpl(
      this.templatePath(pgkTemplateName),
      this.destinationPath("package.json"),
      {
        name: this.answers.name
      }
    );

    this.fs.copy(
      `${path.resolve(__dirname, this.answers.type)}/**/*`,
      this.destinationPath(),
      {
        globOptions: { dot: true }
      }
    );
    this.fs.copy(
      `${path.resolve(__dirname, "common")}/**/*`,
      this.destinationPath(),
      {
        globOptions: { dot: true }
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
    this.spawnCommand("npm", ["run", "upgrade"]);
  }
}
