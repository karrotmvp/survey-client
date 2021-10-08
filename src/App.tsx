import './App.css';
import Mini from '@karrotmarket/mini';


function App() {
  const mini = new Mini();
  mini.startPreset({
    preset: process.env.REACT_APP_PRESET!,
    params: {
      appId: process.env.REACT_APP_APP_ID!,
    },
    async onSuccess(result) {
      if (result && result.code) {
        console.log(result);
      }
    },
  });

  return <div className="App"></div>;
}

export default App;
