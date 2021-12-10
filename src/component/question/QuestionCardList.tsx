import { MouseEvent, useState } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import {
  Control,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
  UseFormUnregister,
  UseFormWatch,
} from 'react-hook-form';
import { useRecoilValue } from 'recoil';

import QuestionCard from '@component/common/card/QuestionCard';
import AlertToastModal from '@component/common/modal/TostModal';
import { ReactComponent as PlusIcon } from '@config/icon/plus.svg';
import { useAnalytics } from '@src/analytics/faContext';
import { focusAtom } from '@src/atom/questionAtom';
import { errorsType, questionCheck, submitType } from '@src/page/QuestionPage';

import QuestionTitleCard from '../common/card/QuestionTitleCard';

type questionCardListType = {
  register: UseFormRegister<submitType>;
  control: Control<submitType>;
  setValue: UseFormSetValue<submitType>;
  watch: UseFormWatch<submitType>;
  unregister: UseFormUnregister<submitType>;
  errors: errorsType;
};

export default function QuestionCardList({
  register,
  control,
  setValue,
  watch,
  unregister,
  errors,
}: questionCardListType): JSX.Element {
  const [isContentToastOpen, setContentToastOpen] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });
  const questionList = watch('questions');
  const fa = useAnalytics();
  const { push } = useNavigator();
  const isFocus = useRecoilValue(focusAtom);
  const handleAddQuestionButton = (e: MouseEvent) => {
    fa.logEvent('question_add_button_click');
    if ((e.currentTarget as HTMLButtonElement).ariaDisabled === 'true') {
      setContentToastOpen(true);
    }
    append(
      {
        text: '',
        questionType: 3,
        choices: [{ value: '' }, { value: '' }],
      },
      // { shouldFocus: false },
    );
  };

  return (
    <>
      <QuestionTitleCard {...{ errors, append, register, watch }} />
      <AlertToastModal
        text={'내용을 모두 입력하세요'}
        time={3000}
        bottom="3rem"
        isToastOpen={isContentToastOpen}
        setToastOpen={setContentToastOpen}
      />
      <StyledQuestionCardList>
        {fields &&
          fields.map(({ id }, questionIndex) => (
            <QuestionCard
              key={id}
              {...{
                register,
                control,
                setValue,
                watch,
                remove,
                unregister,
                errors,
                questionIndex,
              }}
            />
          ))}
      </StyledQuestionCardList>
      <QuestionButtons>
        {fields.length > 0 && (
          <AddQuestionButton
            type="button"
            className="complete"
            aria-disabled={!questionCheck(questionList)}
            onClick={handleAddQuestionButton}
          >
            <PlusIcon /> 질문 추가
          </AddQuestionButton>
        )}
      </QuestionButtons>
      )
      {fields.length > 0 && (
        <QuestionBottomBar isFocus={isFocus}>
          <span>설문 예시가 떠오르지 않나요?</span>
          <ExampleButton
            type="button"
            onClick={() => {
              fa.logEvent('question_example_button_click');
              push('/guide');
            }}
          >
            설문 예시 보기
          </ExampleButton>
        </QuestionBottomBar>
      )}
    </>
  );
}

const ExampleButton = styled.button`
  background-color: #fff;
  color: ${({ theme }) => theme.color.primaryOrange};
  font-size: 1.3rem;
  padding: 0.8rem 1rem;
  border-radius: 18px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const QuestionBottomBar = styled.div<{ isFocus: boolean }>`
  @keyframes up {
    from {
      transform: translateY(+100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes down {
    from {
      transform: translateY(0);
      opacity: 0;
    }
    to {
      transform: translateY(+100%);
      opacity: 0;
    }
  }
  width: 100%;
  padding: 0.9rem 1.6rem;
  height: 4.7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fedecc;
  position: fixed;
  bottom: 0;
  animation: ${({ isFocus }) =>
    isFocus ? `down 0.1s ease-in` : `up 0.4s ease-out`};
  animation-fill-mode: ${({ isFocus }) => (isFocus ? `forwards` : `backwards`)};
  -webkit-transform: translate3d(0, 0, 0);
  span {
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    color: #707070;
  }
`;

const QuestionButtons = styled.div`
  padding: 0 1.6rem 5rem 1.6rem;
`;

const AddQuestionButton = styled.button`
  background-color: ${({ theme }) => theme.color.primaryOrange};
  padding: 0.8rem;
  border-radius: 4px;
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffff;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    margin-right: 8px;
  }
  &[aria-disabled='true'] {
    background-color: #c9c9c9;
  }
  margin-left: auto;
`;

const StyledQuestionCardList = styled.ul`
  display: grid;
  grid-template-columns: auto;
  padding: 0 1.6rem;
`;
