// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

const handlers = [
  rest.get('/api/v1/surveys', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        title: '신제품 설문',
        time: '2021-09-10',
        answer: 2,
      }),
    ),
  ),
];

export default handlers;
