import styled from '@emotion/styled';

const StyledPageModal = styled.section<StyledPageModalType>`
  background-color: #ffff;
  width: 100%;
  min-height: 100vh;
  background-color: #ffff;
  top: 3.5rem;
  position: absolute;
  border-radius: 19px;
  z-index: 10;
  padding: ${({ rowPaddingNone }) => (rowPaddingNone ? '24px 0' : '24px 16px')};
`;

type PageModalType = {
  children: React.ReactNode;
  rowPaddingNone?: boolean;
};

type StyledPageModalType = Pick<PageModalType, 'rowPaddingNone'>;

export default function PageModal({
  children,
  rowPaddingNone,
}: PageModalType): JSX.Element {
  return <StyledPageModal {...{ rowPaddingNone }}>{children}</StyledPageModal>;
}
