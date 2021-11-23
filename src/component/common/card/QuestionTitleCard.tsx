import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import {
  FieldArrayMethodProps,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';

import { questionCardType, submitType } from '@src/page/QuestionPage';

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
};

export default function QuestionTitleCard({
  append,
  register,
  watch,
}: QuestionTitleCardType): JSX.Element {
  const [isPopupOpen, setPopup] = useState(false);
  const [isPopupClose, setPopupClose] = useState(false);
  const [isOpen, setOpen] = useState(false);
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

    setPopupClose(true);
  };
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

  const ExampleBizImg = styled.img`
    position: absolute;
    right: 0rem;
    top: 100px;
    width: 21rem;
  `;
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
      {isOpen && (
        <ModalPortals>
          <Modal setPopup={setOpen} transparent close>
            <ExampleModalWrapper>
              <h1 className="example_title">이웃에게는 이렇게 보여져요</h1>
              <ExampleBizImg src="./../../img/examplebizimg.png" />
              <CompleteImg src="./../../img/exampleImg.png" />
            </ExampleModalWrapper>
          </Modal>
        </ModalPortals>
      )}
      {isPopupOpen && (
        <UpDownModal setPopup={setPopup} isClose={isPopupClose} rect close>
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
              <h3 className="example_title_name">예시</h3>
              {example.map(text => (
                <ExampleText {...text} />
              ))}
            </section>
            <section className="title_modal_section_button">
              <TitleCover>
                <span>설문 제목이 이웃에게 이렇게 보여져요</span>
                <ExampleButton type="button" onClick={() => setOpen(true)}>
                  설문 커버 보기
                </ExampleButton>
              </TitleCover>
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
  { title: '의견 조사', subtitle: '밀키트 구입에 대한 의견을 듣고 싶어요' },
  { title: '신메뉴/서비스 추천', subtitle: 'OO떡볶이 신메뉴를 추천받아요' },
  { title: '후기/피드백', subtitle: 'OO 헤어샵 서비스 후기가 궁금해요' },
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
