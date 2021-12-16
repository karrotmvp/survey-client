import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import { useSetRecoilState } from 'recoil';

import { useAnalytics } from '@src/analytics/faContext';
import { responseIndividualAtom } from '@src/atom/responseAtom';

import { answerTextType } from './AggregationBriefCard';

export default function AggregationBriefTextList({
  answers,
  showAll,
  setTabKey,
}: {
  answers: answerTextType[];
  showAll?: boolean;
  setTabKey?: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const setResponseId = useSetRecoilState(responseIndividualAtom);
  const { pop } = useNavigator();
  const fa = useAnalytics();
  return (
    <TextList showAll={showAll}>
      {answers.map(({ responseId, value }, idx) => {
        const resValue = value === '' ? '답변 없음' : value;
        return (
          <TextItem
            key={responseId}
            onClick={() => {
              setResponseId(idx);
              if (setTabKey) {
                fa.logEvent('surveybreif_textList_click');
                setTabKey('individual');
              }
              if (showAll) {
                fa.logEvent('showall_textList_click');
                pop().send(idx);
              }
            }}
          >
            <span className="answers_text_title">{`익명 ${idx + 1}`}</span>
            <span className="answers_text_subtitle">{resValue}</span>
          </TextItem>
        );
      })}
    </TextList>
  );
}

const TextList = styled.ul<{ showAll: boolean | undefined }>`
  display: grid;
  grid-gap: 0.8rem;
  grid-template-columns: auto;
  ${({ showAll }) => (showAll ? '' : 'max-height: 28rem')};
  overflow-y: overlay;
  margin-top: 2rem;

  ::-webkit-scrollbar {
    position: absolute;
    left: 0;
    width: 6px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    height: 5%;
    background-color: #c9c9c9;
    border-radius: 13px;
  }
`;

const TextItem = styled.li`
  padding: 1.6rem 1.2rem;
  background-color: #f8f8f8;
  font-size: 1.3rem;
  border-radius: 4px;
  :hover {
    background-color: #d8d8d8;
  }
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
