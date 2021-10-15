import { ReactNode } from 'react';

import styled from '@emotion/styled';

import TextButton from '@component/common/button/TextButton';

const NavRight = styled.nav`
  display: flex;
  align-items: center;
  position: relative;
`;

type QuestionNavRightType = {
  rightIcon: ReactNode;
};

export default function QuestionNavRight({
  rightIcon,
}: QuestionNavRightType): JSX.Element {
  return (
    <NavRight>
      <TextButton
        text="작성완료"
        buttonColor="#FE7E35"
        buttonSize="SMALL"
        buttonBgColor="#ffff"
      />
      {rightIcon}
    </NavRight>
  );
}
