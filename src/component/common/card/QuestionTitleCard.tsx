import { useState } from 'react';

import styled from '@emotion/styled';
import {
  FieldArrayMethodProps,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';

import { questionCardType, submitType } from '@src/page/QuestionPage';

import InputForm from '../input/InputForm';
import UpDownModal from '../modal/UpDownModal';

type QuestionTitleCardType = {
  append: (
    value: Partial<questionCardType> | Partial<questionCardType>[],
    options?: FieldArrayMethodProps | undefined,
  ) => void;
  register: UseFormRegister<submitType>;
  watch: UseFormWatch<submitType>;
};

export default function QuestionTitleCard({
  append,
  register,
  watch,
}: QuestionTitleCardType): JSX.Element {
  const [isPopupOpen, setPopup] = useState(false);
  const title = watch('title');
  const questions = watch('questions');

  const handleNextButton = () => {
    if (questions.length === 0 && title !== '') {
      append(
        {
          text: '',
          questionType: 3,
          choices: [{ value: '' }, { value: '' }],
        },
        // { shouldFocus: false },
      );
    }

    setPopup(false);
  };
  return (
    <>
      <StyledQuestionTitleCard>
        <h1 className="title_card__title">
          설문 커버에 들어갈 설문 제목을 적어주세요
        </h1>
        <TitleFormButton
          type="button"
          isValue={Boolean(title)}
          onClick={() => setPopup(true)}
        >
          {title || '이웃들이 설문 목적을 알 수 있도록 설문 제목을 적어주세요'}
        </TitleFormButton>
        <h3 className="title_card__subtitle">
          (ex. 밀키트 구입에 대한 의견을 듣고 싶어요)
        </h3>
      </StyledQuestionTitleCard>
      {isPopupOpen && (
        <UpDownModal setPopup={setPopup} rect>
          <TitleModal>
            <section className="title_modal_section">
              <h1>설문 제목 작성</h1>
              <InputForm
                register={register}
                path={`title`}
                placeholder={
                  '이웃들이 설문 목적을 알 수 있도록 설문 제목을 적어주세요'
                }
                row={1}
                backgroundColor={'#F4F5F6'}
                maxLength={30}
                config={{ required: true, maxLength: 30 }}
              />
            </section>
            <section className="title_modal_section_button">
              <NextButton type="button" onClick={handleNextButton}>
                작성 완료
              </NextButton>
            </section>
          </TitleModal>
        </UpDownModal>
      )}
    </>
  );
}

const NextButton = styled.button`
  height: 5.6rem;
  width: 100%;
  font-size: 1.7rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.primaryOrange};
  color: #ffff;
`;

const TitleFormButton = styled.button<{ isValue: boolean }>`
  width: 100%;
  overflow: hidden;
  border-style: solid;
  color: ${({ isValue }) => (isValue ? '#141414' : '#8b8b8b')};
  caret-color: ${({ theme }) => theme.color.primaryOrange};
  font-size: 1.5rem;
  line-height: 140%;
  letter-spacing: -2%;
  padding: 1.6rem;
  font-weight: 400;
  border: 1px solid #c9c9c9;
  border-radius: 8px;
  background: #f4f5f6;
  text-align: start;
`;

const TitleModal = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title_modal_section {
    padding: 2rem 1.6rem 0 1.6rem;
    h1 {
      font-size: 16px;
      line-height: 100%;
      font-weight: ${({ theme }) => theme.fontWeight.regular};
      text-align: center;
      margin-bottom: 3.6rem;
    }
  }
`;

const StyledQuestionTitleCard = styled.div`
  width: 100%;
  background-color: #ffff;
  display: flex;
  flex-direction: column;
  padding: 2.4rem 1.6rem 2.8rem 1.6rem;
  border-bottom: 1px solid #f4f4f4;
  .title_card__title {
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    line-height: 100%;
    margin-bottom: 2rem;
  }
  .title_card__subtitle {
    margin-top: 1.2rem;
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    line-height: 140%;
    color: ${({ theme }) => theme.color.neutralBlack.text};
  }
`;
