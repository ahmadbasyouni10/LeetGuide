import logo from './logo.svg';
import './App.css';
import Card from './components/Card';

function App() {
  return (
    <div className="App h-screen">
      <h1 className='mt-5 text-2xl text-left ml-3 font-la logo'>LeetGuide</h1>
      <header className="App-header">
        <Card />
      </header>
    </div>
  );
}

export default App;
