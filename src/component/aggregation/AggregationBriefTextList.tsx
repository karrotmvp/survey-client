import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import { useSetRecoilState } from 'recoil';

import { responseIndividualAtom } from '@src/atom/responseAtom';

import { answersTextType } from './AggregationBrief';

export default function AggregationBriefTextList({
  answers,
  showAll,
  setTabKey,
}: {
  answers: answersTextType[];
  showAll?: boolean;
  setTabKey?: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const setResponseId = useSetRecoilState(responseIndividualAtom);
  const { pop } = useNavigator();
  return (
    <TextList showAll={showAll}>
      {answers.map(({ answer, surveyResponseId }, idx) => (
        <TextItem
          key={surveyResponseId}
          onClick={() => {
            setResponseId(idx);
            if (setTabKey) {
              setTabKey('개별보기');
            }
            if (showAll) {
              pop().send(idx);
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

const TextList = styled.ul<{ showAll: boolean | undefined }>`
  display: grid;
  grid-gap: 0.8rem;
  grid-template-columns: auto;
  ${({ showAll }) => (showAll ? '' : 'max-height: 28rem')};
  overflow-y: scroll;
  margin-top: 2rem;
`;

const TextItem = styled.li`
  padding: 1.6rem 1.2rem;
  background-color: #f8f8f8;
  font-size: 1.3rem;
  border-radius: 4px;
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
