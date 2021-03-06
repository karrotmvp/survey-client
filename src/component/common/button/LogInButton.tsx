import { MouseEvent } from 'react';

import styled from '@emotion/styled';

type LoginButtonType = {
  text: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

const CreateQuestionButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.color.primaryOrange};
  border-radius: 0.8rem;
  padding: 1.6rem;
  font-size: 1.6rem;
  color: #ffff;
  font-weight: 700;
`;

export default function LoginButton({
  text,
  onClick,
}: LoginButtonType): JSX.Element {
  return <CreateQuestionButton {...{ onClick }}>{text}</CreateQuestionButton>;
}
