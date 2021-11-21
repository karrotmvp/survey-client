import styled from '@emotion/styled';
import { useSetRecoilState } from 'recoil';

import { responseIndividualAtom } from '@src/atom/responseAtom';

import { answersTextType } from './AggregationBrief';

export default function AggregationBriefTextList({
  answers,
  setTabKey,
}: {
  answers: answersTextType[];
  setTabKey?: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const setResponseId = useSetRecoilState(responseIndividualAtom);
  return (
    <TextList>
      {answers.map(({ answer, surveyResponseId }, idx) => (
        <TextItem
          key={surveyResponseId}
          onClick={() => {
            setResponseId(idx);
            if (setTabKey) {
              setTabKey('개별보기');
            }
          }}
        >
          <span className="answers_text_title">{`익명 ${idx + 1}`}</span>
          <span className="answers_text_subtitle">{answer}</span>
        </TextItem>
      ))}
    </TextList>
  );
}
const TextList = styled.ul`
  display: grid;
  grid-gap: 0.8rem;
  grid-template-columns: auto;
  max-height: 38rem;
  overflow-y: scroll;
`;

const TextItem = styled.li`
  padding: 1.6rem 1.2rem;
  background-color: #f8f8f8;
  font-size: 1.3rem;
  span {
    display: block;
  }
  .answers_text_subtitle {
    font-weight: ${({ theme }) => theme.fontWeight.regular};
  }

  .answers_text_title {
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    margin-bottom: 1.2rem;
  }
`;