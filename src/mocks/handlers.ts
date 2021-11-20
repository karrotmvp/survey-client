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

  rest.get(`http://dev.daangn-survey.com/api/v1/members/me`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        data: {
          daangnId: 'string',
          name: 'string',
          imageUrl:
            'https://s3.ap-northeast-2.amazonaws.com/elasticbeanstalk-ap-northeast-2-176213403491/media/magazine_img/magazine_280/5-3-%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg',
          role: 'string',
          region: 'string',
          profileUrl: 'string',
        },
      }),
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

  rest.get(
    `http://dev.daangn-survey.com/api/v1/surveys/brief/:surveysId`,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          status: 200,
          message: '설문 요약 정보를 조회합니다.',
          data: {
            estimatedTime: 30,
            questionCount: 3,
            title: '제목입니다',
            description: null,
            bizProfile: {
              name: '베타무따',
              imageUrl:
                'https://dnvefa72aowie.cloudfront.net/origin/profile/business_profile_placeholder_market_type.png?q=95&s=256x256&t=inside',
              region: '서울특별시 서초구 반포동',
              profileUrl:
                'karrot.alpha://minikarrot/router?app=https%3A%2F%2Fwebview.alpha.kr.karrotmarket.com%2Fbusiness-platform%2Fhome&path=%2Fbiz_accounts%2F4210%2Fviewer%2Fhome&navbar=false&scrollable=false',
              bizCategory: '기타',
            },
            target: '모든 이웃',
            createdAt: '2021-11-02T15:23:53.253851',
          },
          timestamp: 1635835228494,
        }),
      ),
  ),
];

export default handlers;
