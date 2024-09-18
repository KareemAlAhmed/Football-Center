import React, { useEffect } from 'react'
import "./NavBar.css"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./dropDownMenu.css"
export default function NavBar() {
  let currentUser=useSelector(state=>state.users.currentUser)
  let userToken=useSelector(state=>state.users.userToken)
  var prevScrollpos = window.pageYOffset;
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Add leading 0 if necessary
  const day = today.getDate().toString().padStart(2, '0');
  
  const formattedDate = `${year}${month}${day}`;
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
  const navigate=useNavigate();
  useEffect(()=>{
    let navContainer=document.querySelector(".navBar .container")
    let list=navContainer.querySelector(".navList")
    list.style.height=`${navContainer.offsetHeight}px`
    list.style.lineHeight=`${navContainer.offsetHeight}px`


  
      //add active class on menu

      //drop down menu
      document.querySelectorAll('.drop-down').forEach(dropdown => {
          dropdown.addEventListener('mouseover', () => {
              document.querySelector('.mega-menu').classList.add('display-on');
          });
          dropdown.addEventListener('mouseleave', () => {
              document.querySelector('.mega-menu').classList.remove('display-on');
          });
     if(sessionStorage.getItem("activeNav") != null){
      const liaElements = document.querySelectorAll('.navList li.active');

      liaElements.forEach(li => {
        li.classList.remove('active');
      });
      document.querySelector(`.${sessionStorage.getItem("activeNav")}`).classList.add("active")
     }
  });
  },[userToken])








  return (
    <div className='navBar' id='navBar'>
      <div className="container">
        <div className="logo" onClick={()=>{sessionStorage.setItem('activeNav',"homeNav");navigate("/")}}>
            <svg className="css-ze2te4 css-qd6ojx" viewBox="0 0 116.66666666666669 63.56873907577836"><g transform="translate(-0.3611275301898653, -28.082826376114106) scale(1.1763069052491293)" className="css-1e98oqk" fill="#ffffff"><g xmlns="http://www.w3.org/2000/svg"><path d="M60.325,48.954l-5.994-1.76l-15.125,17.66l6.593,1.059L60.325,48.954L60.325,48.954z M50.695,46.129l-5.998-1.754   L28.616,63.15l6.593,1.061L50.695,46.129L50.695,46.129z M69.94,51.794c-1.859-0.552-3.876-1.149-5.984-1.771L49.797,66.556   l6.594,1.061L69.94,51.794L69.94,51.794z M62.22,77.912c-1.062,0.057-1.975-0.806-2.049-1.932   c-0.048-0.934-0.101-1.968-0.122-2.256c-0.046-0.598-0.528-1.045-0.528-1.045l-1.776-1.818c-4.501-0.072-8.75-0.348-12.319-0.833   c-14.343-1.948-18.632-0.78-30.551-1.005L14.68,69.02l-0.761,0.865c0,0-0.457,0.473-0.471,1.072   c-0.008,0.287-0.007,1.323-0.005,2.257c-0.023,1.13-0.889,2.04-1.953,2.04s-1.93-0.91-1.945-2.04   c0.001-0.934,0.003-1.97-0.004-2.257c-0.015-0.6-0.471-1.072-0.471-1.072l-1.352-1.533c-5.227-1.045-5.807-2.91-5.807-2.91   c-1.023-3.277-1.604-7.014-1.604-10.981c0-3.789,0.526-7.367,1.463-10.534c1.822,1.418,4.059,2.672,6.802,3.568   c4.096,1.337,10.339,2.165,11.566,0.249c0.214-0.335,0.746-1.448-0.181-1.563c-5.301-0.459-13.764-1.535-12.925-10.188   c0.057-0.589-0.048-1.039-0.294-1.365c0.274-0.294,0.556-0.574,0.843-0.836c0,0,0.684-0.54,1.169-0.533   c0.692,0.009,1.6,0.091,1.686,1.387c0,0,0.09,7.046,11.648,7.227c3.614,0.057,5.856-0.792,7.442-1.934l-8.646-6.281   c-1.3-0.945-1.589-2.766-0.644-4.066l3.283-4.518c0.945-1.301,2.765-1.589,4.065-0.644l14.8,10.753   c0.098-0.003,0.195-0.004,0.294-0.004c2.962,0,5.435,1.273,6.017,2.968c2.593,0.021,4.798,1.017,5.668,2.413   c0.234-0.017,0.474-0.025,0.715-0.025c2.121,0,3.993,0.653,5.1,1.646c2.436,0.065,4.505,0.993,5.399,2.292l0.233,0.071   c0.285-0.025,0.58-0.039,0.877-0.039c2.272,0,4.258,0.75,5.321,1.864c0.132-0.005,0.265-0.008,0.4-0.008   c2.169,0,4.078,0.683,5.171,1.715c4.729,1.399,8.99,2.628,11.984,3.433c12.254,3.287,12.618,10.082,4.068,14.565   c-1.459,0.764-3.404,1.44-5.701,2.024l-1.123,1.844c0,0-0.368,0.545-0.278,1.139c0.044,0.283,0.222,1.305,0.389,2.223   c0.172,1.116-0.522,2.162-1.571,2.347c-1.048,0.187-2.059-0.561-2.27-1.669c-0.158-0.921-0.338-1.941-0.396-2.223   c-0.118-0.59-0.651-0.975-0.651-0.975l-1.565-1.25c-4.562,0.656-9.688,1.076-14.807,1.252l-1.298,1.641   c0,0-0.431,0.494-0.414,1.096c0.006,0.288,0.062,1.322,0.113,2.254C64.1,76.903,63.282,77.858,62.22,77.912L62.22,77.912z"></path></g></g></svg>
            <h1>FootBall <span>Center</span></h1>
        </div>

        <ul className="navList">
          <li><Link to='/' className='homeNav'>Home</Link></li>
          <li><Link to={'/schedule/_/date/'+formattedDate} className='ScheduleNav'>Schedule</Link></li>
          <li><Link to={'/scoreboard/_/date/'+formattedDate}  className='ScoresNav'>Scores</Link></li>
          <li><Link to={'/competetions'} className='LeaguesNav'>Leagues & Cups</Link></li>
          <li><Link to={'/teams'} className='TeamsNav'>Teams</Link></li>
          <li className='drop-down'> 
            <Link to={'/transfer/news'} className='TransfersNav dropM'>
            <span>Transfers</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
            </Link>
            <div className="mega-menu fadeIn animated">
                <ul>
                  <li><Link to='/transfer/news'> Transfer News</Link></li>
                  <li><Link to='/transfer/majorTransfers'>Major Transfers</Link></li>
                </ul>
            </div>
          </li>
          {/* <li className='Bottomline'></li> */}
        </ul>

        

        <div className="options">
          <div className="moreOpt">
            <div className="search">
              <svg className="Header_headerNavLinkIcon__90yzK"  viewBox="0 0 24 24"><path  fill-rule="evenodd" d="M16.6342 17.6949C15.1119 18.9773 13.1462 19.75 11 19.75c-4.8325 0-8.75-3.9175-8.75-8.75S6.1675 2.25 11 2.25s8.75 3.9175 8.75 8.75c0 2.1463-.7727 4.112-2.0552 5.6343l3.8354 3.8354a.75.75 0 0 1-1.0606 1.0607l-3.8354-3.8355ZM3.75 11c0-4.004 3.246-7.25 7.25-7.25 4.0041 0 7.25 3.246 7.25 7.25 0 1.9605-.7782 3.7393-2.0425 5.0443a.7492.7492 0 0 0-.1633.1633C14.7392 17.4719 12.9605 18.25 11 18.25c-4.004 0-7.25-3.2459-7.25-7.25Z" clip-rule="evenodd"></path></svg>
            </div>
            <div className="line"></div>
            <div className="settings">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
              </svg>
            </div>
          </div>
          {userToken == null ? (
            <div className="auth">
              {/* <img src="http://res.cloudinary.com/dgo3fuaxg/image/upload/v1721929948/bhucqryzr7yrlr3lzuh2.jpg" alt="" /> */}
              <a href='/auth/signin' >Sign in</a>
              <a href='/auth/register'>Join</a>
            </div>
          ):(
            <div className='userProfilePic'>
              <Link to="/profile">
                <img src={currentUser.image_url} alt="" />
              </Link>
            </div>
          )}
          
        </div>

      </div>      
    </div>
  )
}
