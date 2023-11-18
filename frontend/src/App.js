import { ToastContainer, Zoom } from 'react-toastify';
import AppRouter from './router/AppRouter';
import ContextProvider from './context/Context';

function App() {
  return (
    <ContextProvider>
      <AppRouter />
      <ToastContainer transition={Zoom} />
    </ContextProvider>
  );
}

export default App;
