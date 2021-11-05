/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */

const dotenv = require('dotenv');

dotenv.config();
const { exec } = require('child_process');

async function generateQR() {
  const surveyId = 41;
  const questionType = 0;
  try {
    exec(
      `karrot-mini open --url "https://d174a7300nswcc.cloudfront.net/#/responses/${surveyId}?questionCategory=${questionType}&_si=0" --appId e82e6f0250714b29832b6c00fa07cd05 --production `,
      (error, stdout, stderr) => {
        // eslint-disable-next-line no-console
        console.log(stdout);
      },
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}
generateQR();
