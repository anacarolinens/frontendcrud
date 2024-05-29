import { Toaster } from 'sonner';
import './App.css';
import UserList from './components/UserList';

function App() {
  return (
    <div className="App">
      <Toaster richColors />
      <UserList />
    </div>
  );
}

export default App;
