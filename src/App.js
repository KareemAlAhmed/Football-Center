import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Homepage from './Pages/Homepage/Homepage';

function App() {
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    let nav=document.getElementById("navBar");
    if(currentScrollPos < 92){
      if(nav.classList.contains("navToBottom")){
        nav.classList.remove("navToBottom")
      }
    }
    if (prevScrollpos > currentScrollPos) {
      nav.style.top = "0";
    } else {
      nav.style.top = `-${nav.offsetHeight +2}px`;
      nav.classList.add("navToBottom")
      
    }
    prevScrollpos = currentScrollPos;
  }
  return (
    <div className="App">
        {/* https://looka.com/s/192368739 */}
          {/* <NavBar /> */}
          <Homepage />

    </div>
  );
}

export default App;
