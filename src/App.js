import 'swiper/css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './App.scss';

import { BrowserRouter as Router } from 'react-router-dom';

import SideBar from './components/sidebar/SideBar';
// import Footer from './components/footer/Footer';
import RouterConfig from './config/RouterConfig';

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
