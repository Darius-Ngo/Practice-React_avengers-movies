import 'swiper/css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './App.scss';

import { BrowserRouter as Router } from 'react-router-dom';

import Loading from './components/loading/Loading';
import SideBar from './components/sidebar/SideBar';
import RouterConfig from './config/RouterConfig';
// import Footer from './components/footer/Footer';

function App() {
  return (
    <Router>
      <>
        <SideBar />
        <RouterConfig />
        {/* <Footer /> */}
      </>
    </Router>
  );
}

export default App;
