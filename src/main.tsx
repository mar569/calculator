import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App /> {/* App is wrapped in BrowserRouter here */}
    </BrowserRouter>
  </Provider>
);
