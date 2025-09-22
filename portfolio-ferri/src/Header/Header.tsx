import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function refreshPage() {
  window.location.reload();
}

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        <div className="leftSide">
          <a className="davide-me" onClick={refreshPage}>
            <span>d</span><span>a</span><span>v</span><span>i</span><span>d</span><span>e</span><span className='dot'>.</span><span>m</span><span>e</span>
          </a>
        </div>
        <div className="rightSide">
          <nav className='sections'>
            <ul className='links'>
              <li>
                <Link
                  to="/welcome"
                  className={`welcome-link${location.pathname === '/welcome' ? ' active-link' : ''}`}
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  to="/progetti"
                  className={`projects-link${location.pathname === '/progetti' ? ' active-link' : ''}`}
                >
                  PROJECTS
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`contact-link${location.pathname === '/contact' ? ' active-link' : ''}`}
                >
                  CONTACT
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`about-link${location.pathname === '/about' ? ' active-link' : ''}`}
                >
                  ABOUT
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;