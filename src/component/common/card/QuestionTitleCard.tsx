import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import {
  FieldArrayMethodProps,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { useRecoilState } from 'recoil';

import AlertToastModal from '@component/common/modal/TostModal';
import { useAnalytics } from '@src/analytics/faContext';
import { questionTitleModalOpen } from '@src/atom/questionAtom';
import {
  errorsType,
  questionCardType,
  submitType,
} from '@src/page/QuestionPage';

import InputForm from '../input/InputForm';
import Modal from '../modal/Modal';
import ModalPortals from '../modal/ModalPotal';
import UpDownModal from '../modal/UpDownModal';

type QuestionTitleCardType = {
  append: (
    value: Partial<questionCardType> | Partial<questionCardType>[],
    options?: FieldArrayMethodProps | undefined,
  ) => void;
  register: UseFormRegister<submitType>;
  watch: UseFormWatch<submitType>;
  errors: errorsType;
};

export default function QuestionTitleCard({
  append,
  register,
  watch,
  errors,
}: QuestionTitleCardType): JSX.Element {
  const [isPopupOpen, setPopup] = useRecoilState(questionTitleModalOpen);
  const [isPopupClose, setPopupClose] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [isContentToastOpen, setContentToastOpen] = useState(false);
  const title = watch('title');
  const questions = watch('questions');
  const fa = useAnalytics();
  const handleNextButton = () => {
    fa.logEvent('question_title_complete_button_click');
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

    setPopupClose(true);
  };

  useEffect(() => {
    if (errors.title) {
      setPopup(true);
      setContentToastOpen(true);
    }
  }, [errors]);
  const CompleteImg = styled.img`
    width: 100%;
  `;

  const ExampleModalWrapper = styled.div`
    padding: 2rem 3rem 3rem 3rem;
    width: 100%;
    position: relative;
    .example_title {
      color: white;
      text-align: center;
      margin-bottom: 2rem;
      font-size: 2rem;
    }
  `;
  useEffect(() => {
    if (isPopupOpen === false && isPopupClose) {
      setPopupClose(false);
    }
  }, [isPopupClose, isPopupOpen]);

  return (
    <>
      <StyledQuestionTitleCard>
        <h1 className="title_card__title">
          ?????? ????????? ????????? ?????? ????????? ???????????????
        </h1>
        <TitleFormButton
          type="button"
          isValue={Boolean(title)}
          onClick={() => {
            fa.logEvent('question_title_button_click');
            setPopup(true);
          }}
        >
          {title || '???????????? ?????? ????????? ??? ??? ????????? ?????? ????????? ???????????????'}
        </TitleFormButton>
        <h3 className="title_card__subtitle">
          (ex. ????????? ????????? ?????? ????????? ?????? ?????????)
        </h3>
      </StyledQuestionTitleCard>
      {isOpen && (
        <ModalPortals>
          <Modal setPopup={setOpen} transparent close>
            <ExampleModalWrapper>
              <h1 className="example_title">??????????????? ????????? ????????????</h1>
              <ExampleBizImg src="./../../img/examplebizimg.png" />
              <CompleteImg src="./../../img/exampleImg.png" />
            </ExampleModalWrapper>
          </Modal>
        </ModalPortals>
      )}
      {isPopupOpen && (
        <UpDownModal setPopup={setPopup} isClose={isPopupClose} rect close>
          <AlertToastModal
            text={'????????? ??????????????????'}
            time={4000}
            bottom="3rem"
            isToastOpen={isContentToastOpen}
            setToastOpen={setContentToastOpen}
          />
          <TitleModal>
            <section className="title_modal_section">
              <h1>?????? ?????? ??????</h1>
              <InputForm
                register={register}
                path={`title`}
                key={'title'}
                placeholder={
                  '???????????? ?????? ????????? ??? ??? ????????? ?????? ????????? ???????????????'
                }
                row={2}
                backgroundColor={'#F4F5F6'}
                maxLength={30}
                config={{ required: true, maxLength: 30 }}
              />
              <h3 className="example_title_name">??????</h3>
              {example.map((text, idx) => (
                <ExampleText key={idx} {...text} />
              ))}
            </section>
            <section className="title_modal_section_button">
              <TitleCover>
                <span>?????? ????????? ???????????? ????????? ????????????</span>
                <ExampleButton
                  type="button"
                  onClick={() => {
                    fa.logEvent('question_coverExample_button_click');
                    setOpen(true);
                  }}
                >
                  ?????? ?????? ??????
                </ExampleButton>
              </TitleCover>
              <NextButton type="button" onClick={handleNextButton}>
                ?????? ??????
              </NextButton>
            </section>
          </TitleModal>
        </UpDownModal>
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

const ExampleDot = styled.div`
  width: 0.6rem;
  height: 0.6rem;
  margin-right: 0.8rem;
  background-color: #c4c4c4;
  border-radius: 50%;
`;

const ExampleBizImg = styled.img`
  position: absolute;
  right: 0rem;
  top: 100px;
  width: 21rem;
`;

const StyledExampleText = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  .example_text_title {
    display: flex;
    align-items: center;
    line-height: 140%;
    color: #8b8b8b;
    margin-bottom: 0.6rem;
  }
  .example_text_subtitle {
    display: block;
    margin-left: 1.6rem;
    line-height: 120%;
  }
  margin: 1rem 0;
`;

const example = [
  { title: '?????? ??????', subtitle: '????????? ????????? ?????? ????????? ?????? ?????????' },
  { title: '?????????/????????? ??????', subtitle: 'OO????????? ???????????? ???????????????' },
  { title: '??????/?????????', subtitle: 'OO ????????? ????????? ????????? ????????????' },
];

function ExampleText({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}): JSX.Element {
  return (
    <StyledExampleText>
      <div className="example_text_title">
        <ExampleDot /> {title}
      </div>
      <span className="example_text_subtitle">{subtitle}</span>
    </StyledExampleText>
  );
}

const NextButton = styled.button`
  height: 5.6rem;
  width: 100%;
  font-size: 1.7rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
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

  .title_modal_section_button {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .title_modal_section {
    padding: 2rem 1.6rem 0 1.6rem;
    h1 {
      font-size: 16px;
      line-height: 100%;
      font-weight: ${({ theme }) => theme.fontWeight.regular};
      text-align: center;
      margin-bottom: 3.6rem;
    }
    .example_title_name {
      font-size: 1.6rem;
      font-weight: ${({ theme }) => theme.fontWeight.medium};
      margin-top: 2.8rem;
    }
  }
`;

const TitleCover = styled.div`
  width: 100%;
  padding: 0.9rem 1.6rem;
  height: 4.7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fedecc;
  span {
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    color: #707070;
  }
`;

const StyledQuestionTitleCard = styled.div`
  width: 100%;
  margin-top: 8rem;
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
