import logo from './logo.svg';
import './App.css';
import vid from './res/trainingVideo.mp4';
import { FaUserAlt } from "react-icons/fa";

function App() {


  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <header>
        <div class="header">
          <nav class="navigation">
            <a href="#" class="navbar-logo">HealthClub</a>
            <div class="navbar-right">
              <a href="#">The Workout</a>
              <a href="#">Locations</a>
              <a href="#">Joining</a>
              <a href="#"><FaUserAlt size={17}/></a>
            </div>
          </nav>
          <div class="video-container">
            <video autoPlay loop muted src={vid} id='myVideo'>
              {/* <source  type='video/mp4'></source> */}
            </video>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
