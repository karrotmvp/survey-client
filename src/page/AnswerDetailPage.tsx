import styled from '@emotion/styled';
import { useNavigator, useParams } from '@karrotframe/navigator';
import { useRecoilState, useRecoilValue } from 'recoil';

import { questionListAtom } from '@src/atom/questionAtom';
import responseListAtom from '@src/atom/responseAtom';
import NavBar from '@src/component/common/navbar/NavBar';
import ResponseChoiceInput from '@src/component/response/ResponseChoiceInput';
import ResponseTextInput from '@src/component/response/ResponseTextInput';

const StyledResponsePage = styled.section`
  background: #ffff;
  width: 100%;
  height: 100vh;
  padding: 4rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledQuestionDetailTitle = styled.h3`
  color: ${({ theme }) => theme.color.primaryOrange};
  font-weight: 700;
  font-size: 1rem;
  line-height: 120%;
  margin-right: 5px;
  font-family: ${({ theme }) => theme.fontFamily.title};
  margin-bottom: 0.5rem;
`;

const StyledAnswerTitle = styled.h3`
  color: #141414;
  font-weight: 500;
  margin-right: 5px;
  font-size: 18px;
  line-height: 140%;
  margin-bottom: 3.8rem;
`;

export type InputType = {
  isLast: boolean;
  setResponse: (
    responseInput: { choiceId: number } | { answer: string },
  ) => void;
};

export default function AnswerDetailPage(): JSX.Element {
  const questions = useRecoilValue(questionListAtom);
  const { questionNumber, responsesId } =
    useParams<{ responsesId?: string; questionNumber?: string }>();
  if (!questionNumber || !responsesId)
    throw new Error('questionNumber or responsesId none');

  const { questionType } = questions[+questionNumber - 1];
  const questionLength = questions.length;
  const questionChoice = questions[+questionNumber - 1].choices || [];
  const isLast = questionLength === +questionNumber;
  const [response, setResponseState] = useRecoilState(responseListAtom);
  // 주관식 / 객관식 나눠짐 // 주관식 객관식에 따라서 set 하는 객체가 다름
  // hoc 의 위치가 어디여야하는가? // 주관식 객관식답변페이지는 아예 다르게 구성할건가.
  // 훅을 써야되나?
  const { push } = useNavigator();

  const setResponse = (
    responseInput: { choiceId: number } | { answer: string },
  ) => {
    const newRes = [
      ...response.slice(0, +questionNumber - 1),
      responseInput,
      ...response.slice(+questionNumber),
    ];
    setResponseState(newRes);

    if (!isLast) {
      push(`/responses/${responsesId}/${+questionNumber + 1}`);
    }
  };

  return (
    <>
      <NavBar type="BACK" />
      <StyledResponsePage>
        <StyledQuestionDetailTitle>
          질문 {questionNumber}
        </StyledQuestionDetailTitle>
        <StyledAnswerTitle>
          미용실 방문시에 가장 불편했던건 어떤건가요?
        </StyledAnswerTitle>
        {questionType === 2 ? (
          <ResponseTextInput
            {...{
              isLast,
              setResponse,
            }}
          />
        ) : (
          <ResponseChoiceInput
            {...{
              questionChoice,
              isLast,
              setResponse,
            }}
          />
        )}
      </StyledResponsePage>
    </>
  );
}
