import styled from '@emotion/styled';

const StyledPageModal = styled.section<StyledPageModalType>`
  background-color: #ffff;
  width: 100%;
  min-height: calc(100vh - 3.5rem);
  background-color: #ffff;
  top: 0rem;
  position: relative;
  border-radius: 19px 19px 0 0;
  z-index: 10;
  padding: ${({ rowPaddingNone }) => (rowPaddingNone ? '24px 0' : '24px 1rem')};
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
