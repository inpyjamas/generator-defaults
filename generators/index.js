const Generator = require("yeoman-generator");
const path = require("path");
const glob = require("glob");
let type = "typescript";
module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
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
        choices: ["typescript"],
        filter: function(val) {
          return val.toLowerCase();
        }
      }
    ]);
    this.answers.name = this.answers.name.replace(/[^a-zA-Z ]/g, "");
    this.answers.name = this.answers.name.replace(/ /g, "-");
    type = this.answers.type;
  }

  writing() {
    if (this.answers === undefined) {
      throw new Error("Ansers not defined");
    }
    let pgkTemplateName = "";
    switch (this.answers.type) {
      case "typescript": {
        pgkTemplateName = "_package.json";
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
      `${path.resolve(__dirname, type)}/**/*`,
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

  install() {
    this.installDependencies({
      npm: true,
      bower: false
    });
  }
  end() {
    this.spawnCommand("npm", ["run", "upgrade"]);
  }
};
