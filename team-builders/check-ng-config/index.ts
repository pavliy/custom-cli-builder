import { createBuilder, BuilderContext, BuilderOutput } from '@angular-devkit/architect'
import { JsonObject } from '@angular-devkit/core';
import * as readline from "readline";
import * as fs from "fs";

interface Options extends JsonObject {
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const question = function(q: string) {
  var response: any;
  rl.setPrompt(q);
  rl.prompt();
  return new Promise(( resolve , reject) => {
      rl.on('line', (userInput) => {
          response = userInput;
          rl.close();
      });
      rl.on('close', () => {
         resolve(response);
      });
  });
};

export default createBuilder(createCheckerBuilder);

async function createCheckerBuilder(
  options: Options,
  context: BuilderContext,
  ): Promise<BuilderOutput> {
    const data = fs.readFileSync('./package.json', 'utf8');
    const jsonData = JSON.parse(data);
    const buildIsOk = jsonData.scripts?.build == 'ng build';
    if (!buildIsOk) {
      context.reportProgress(10, 100, 'Not good');
      const shouldUpdateContent = await question("Would you like to set corporate content (y/n)? ");
      // NEXT CODE TO UPDATE package.json
    }
    return { success: true };
}
