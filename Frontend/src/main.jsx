import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { PokemonProvider } from './context/PokemonContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <PokemonProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PokemonProvider>,
);
