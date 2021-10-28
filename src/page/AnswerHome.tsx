import useMiniAuth from '@src/hook/useAuth';

export default function AnswerHome(): JSX.Element {
  const getCode = useMiniAuth(
    false,
    process.env.REACT_APP_PRESET || '',
    process.env.REACT_APP_APP_ID || '',
  );

  // eslint-disable-next-line no-console
  getCode().then(console.log);
  return <div></div>;
}
