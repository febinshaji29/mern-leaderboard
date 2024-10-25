// src/App.jsx
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Leaderboard from './components/Leaderboard';
import Login from './components/Login';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <h1>Leaderboard System</h1>
        </header>
        <main>
        <Router>
           <Routes>
               <Route path="/login" element={<Login/>} />
               <Route path="/leaderboard" element={<Leaderboard/>} />
           </Routes>
       </Router>
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
