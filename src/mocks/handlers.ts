// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

const handlers = [
  rest.get('https://dev.daangn-survey.com/api/v1/surveys', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        {
          title: 'aaa',
          responseCount: 0,
          createdAt: '2021-10-11T01:03:04.04879',
        },
        {
          title: 'aaa',
          responseCount: 0,
          createdAt: '2021-10-11T00:59:15.19403',
        },
      ]),
    ),
  ),

  rest.get(
    `http://dev.daangn-survey.com/api/v1/surveys/:surveysId`,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          surveyId: 10,
          title: '제목입니다',
          description: '설명입니다',
          target: 1,
          questions: [
            {
              questionId: 23,
              questionType: 1,
              text: '첫 번째질문입니다',
            },
            {
              questionId: 24,
              questionType: 2,
              text: 'question',
              choices: [
                {
                  choiceId: 20,
                  value: '1',
                },
                {
                  choiceId: 21,
                  value: '2',
                },
              ],
            },
          ],
        }),
      ),
  ),
];

export default handlers;
