import 'animate.css';
import './Header.css';


function refreshPage() {
  window.location.reload();
}

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="leftSide">
          <a className="davide-me" onClick={refreshPage}>
            <span>d</span><span>a</span><span>v</span><span>i</span><span>d</span><span>e</span><span className='dot'>.</span><span>m</span><span>e</span>
          </a>
        </div>
        <div className="rightSide">lista delle pagine</div>
      </div>
    </header>
  );
}   

export default Header;