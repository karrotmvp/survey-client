/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */

const dotenv = require('dotenv');
const fs = require('fs');
const readline = require('readline');

const { exec } = require('child_process');

async function generateQR(surveyId, questionType) {
  try {
    exec(
      `karrot-mini open --url "https://d174a7300nswcc.cloudfront.net/#/survey/${surveyId}?questionCategory=${questionType}&_si=0" --appId e82e6f0250714b29832b6c00fa07cd05 --production `,
      (error, stdout, stderr) => {
        // eslint-disable-next-line no-console
        console.log('========================================================');
        console.log('surveyId :', surveyId, 'questionCategory :', questionType);
        console.log(stdout);
        console.log('========================================================');
      },
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  // eslint-disable-next-line no-restricted-syntax
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    const [surveyId, questionType] = line.split(' ');
    generateQR(surveyId, questionType);
  }
}
processLineByLine();

dotenv.config();
