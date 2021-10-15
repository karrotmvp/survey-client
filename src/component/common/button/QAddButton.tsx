import styled from '@emotion/styled';

const StyledAddButton = styled.button`
  padding: 14px 0;
  width: 100%;
  background-color: #ffff;
  background: rgba(254, 126, 53, 0.2);
  border-radius: 8px;
  font-size: 16px;
  line-height: 120%;
  font-weight: 700;
  color: ${({ theme }) => theme.color.primaryOrange};
`;

type AddButtonType = {
  text: string;
};

export default function AddButton({ text }: AddButtonType): JSX.Element {
  return <StyledAddButton>{text}</StyledAddButton>;
}
