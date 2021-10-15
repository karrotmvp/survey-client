import styled from '@emotion/styled';

type SquareButtonType = {
  type: 'LEFT' | 'RIGHT';
};

const StyledSquareButton = styled.button``;

export default function SquareButton({ type }: SquareButtonType): JSX.Element {
  return <StyledSquareButton></StyledSquareButton>;
}
