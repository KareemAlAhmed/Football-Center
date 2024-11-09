import React, { useEffect, useState } from 'react'
import "./NavBar.css"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./dropDownMenu.css"
import { GET_SEARCH_DATA } from '../../redux/user/userActions';
export default function NavBar() {
  const [searchText,setSearchText]=useState("")
  let currentUser=useSelector(state=>state.users.currentUser)
  let userToken=useSelector(state=>state.users.userToken)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Call your desired function on Enter key press
    }
  };
  const stopScroll=()=>{
    let body=document.querySelector("body")
    body.classList.toggle("stopScroll")
  }
  const handleSearch = () => {
    
    dispatch(GET_SEARCH_DATA(searchText))
    document.querySelector(".options .moreOpt .search input").classList.toggle("activeInp")
    setSearchText("")
    navigate("/search/_/q/"+searchText)
    // Add your search function logic here
  };
  var prevScrollpos = window.pageYOffset;
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Add leading 0 if necessary
  const day = today.getDate().toString().padStart(2, '0');
  
  const formattedDate = `${year}${month}${day}`;

  useEffect(() => {
    const navContainer = document.querySelector(".navBar .container");
    const list = navContainer.querySelector(".navList");
  
    // Set initial height and lineHeight for the navList
    list.style.height = `${navContainer.offsetHeight}px`;
    list.style.lineHeight = `${navContainer.offsetHeight}px`;
  
    // Function to update the menuItem size dynamically
    const menuItem = document.querySelector(".menuItem");
    const updateMenuItemSize = () => {
      if (menuItem) {
        menuItem.style.width = `${document.body.offsetWidth + 100}px`;
        menuItem.style.height = `${document.body.offsetHeight}px`;
        menuItem.style.left = `-${document.body.offsetWidth}px`;
      }
    };
  
    // Initial size update
    updateMenuItemSize();
  
    // Add resize event listener to update menuItem size dynamically
    window.addEventListener('resize', updateMenuItemSize);
  
    // Handle dropdown mouseover/mouseleave events
    document.querySelectorAll('.drop-down').forEach(dropdown => {
      dropdown.addEventListener('mouseover', () => {
        document.querySelector('.mega-menu').classList.add('display-on');
      });
      dropdown.addEventListener('mouseleave', () => {
        document.querySelector('.mega-menu').classList.remove('display-on');
      });
    });
  
    // Restore active nav item from sessionStorage
    if (sessionStorage.getItem("activeNav") != null) {
      const activeElements = document.querySelectorAll('.navList li.active');
      activeElements.forEach(li => li.classList.remove('active'));
  
      const activeNav = sessionStorage.getItem("activeNav");
      const activeItem = document.querySelector(`.${activeNav}`);
      if (activeItem) {
        activeItem.classList.add("active");
      }
    }
  
    // Navbar scroll functionality
    let prevScrollpos = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const nav = document.getElementById("navBar");
  
      if (currentScrollPos < 92) {
        nav.classList.remove("navToBottom");
      }
      if (prevScrollpos > currentScrollPos) {
        nav.style.top = "0";
      } else {
        nav.style.top = `-${nav.offsetHeight + 2}px`;
        nav.classList.add("navToBottom");
      }
      prevScrollpos = currentScrollPos;
    };
  
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
  
    // Reset navbar on component mount to ensure it’s visible
    const nav = document.getElementById("navBar");
    if (nav) {
      nav.style.top = "0";
      nav.classList.remove("navToBottom");
    }
  
    // Clean up all event listeners on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateMenuItemSize);
    };
  }, [userToken]);


  const goToAccountSetting=()=>{
    if(userToken == null){
      navigate("/auth/signin")
    }else{
      navigate("/profile/setting")
    }
  }





  return (
    <div className='navBar' id='navBar'>
      <div className="container">
        <div className="logo" onClick={()=>{sessionStorage.setItem('activeNav',"homeNav");navigate("/")}}>
            <svg className="css-ze2te4 css-qd6ojx" viewBox="0 0 116.66666666666669 63.56873907577836"><g transform="translate(-0.3611275301898653, -28.082826376114106) scale(1.1763069052491293)" className="css-1e98oqk" fill="#ffffff"><g xmlns="http://www.w3.org/2000/svg"><path d="M60.325,48.954l-5.994-1.76l-15.125,17.66l6.593,1.059L60.325,48.954L60.325,48.954z M50.695,46.129l-5.998-1.754   L28.616,63.15l6.593,1.061L50.695,46.129L50.695,46.129z M69.94,51.794c-1.859-0.552-3.876-1.149-5.984-1.771L49.797,66.556   l6.594,1.061L69.94,51.794L69.94,51.794z M62.22,77.912c-1.062,0.057-1.975-0.806-2.049-1.932   c-0.048-0.934-0.101-1.968-0.122-2.256c-0.046-0.598-0.528-1.045-0.528-1.045l-1.776-1.818c-4.501-0.072-8.75-0.348-12.319-0.833   c-14.343-1.948-18.632-0.78-30.551-1.005L14.68,69.02l-0.761,0.865c0,0-0.457,0.473-0.471,1.072   c-0.008,0.287-0.007,1.323-0.005,2.257c-0.023,1.13-0.889,2.04-1.953,2.04s-1.93-0.91-1.945-2.04   c0.001-0.934,0.003-1.97-0.004-2.257c-0.015-0.6-0.471-1.072-0.471-1.072l-1.352-1.533c-5.227-1.045-5.807-2.91-5.807-2.91   c-1.023-3.277-1.604-7.014-1.604-10.981c0-3.789,0.526-7.367,1.463-10.534c1.822,1.418,4.059,2.672,6.802,3.568   c4.096,1.337,10.339,2.165,11.566,0.249c0.214-0.335,0.746-1.448-0.181-1.563c-5.301-0.459-13.764-1.535-12.925-10.188   c0.057-0.589-0.048-1.039-0.294-1.365c0.274-0.294,0.556-0.574,0.843-0.836c0,0,0.684-0.54,1.169-0.533   c0.692,0.009,1.6,0.091,1.686,1.387c0,0,0.09,7.046,11.648,7.227c3.614,0.057,5.856-0.792,7.442-1.934l-8.646-6.281   c-1.3-0.945-1.589-2.766-0.644-4.066l3.283-4.518c0.945-1.301,2.765-1.589,4.065-0.644l14.8,10.753   c0.098-0.003,0.195-0.004,0.294-0.004c2.962,0,5.435,1.273,6.017,2.968c2.593,0.021,4.798,1.017,5.668,2.413   c0.234-0.017,0.474-0.025,0.715-0.025c2.121,0,3.993,0.653,5.1,1.646c2.436,0.065,4.505,0.993,5.399,2.292l0.233,0.071   c0.285-0.025,0.58-0.039,0.877-0.039c2.272,0,4.258,0.75,5.321,1.864c0.132-0.005,0.265-0.008,0.4-0.008   c2.169,0,4.078,0.683,5.171,1.715c4.729,1.399,8.99,2.628,11.984,3.433c12.254,3.287,12.618,10.082,4.068,14.565   c-1.459,0.764-3.404,1.44-5.701,2.024l-1.123,1.844c0,0-0.368,0.545-0.278,1.139c0.044,0.283,0.222,1.305,0.389,2.223   c0.172,1.116-0.522,2.162-1.571,2.347c-1.048,0.187-2.059-0.561-2.27-1.669c-0.158-0.921-0.338-1.941-0.396-2.223   c-0.118-0.59-0.651-0.975-0.651-0.975l-1.565-1.25c-4.562,0.656-9.688,1.076-14.807,1.252l-1.298,1.641   c0,0-0.431,0.494-0.414,1.096c0.006,0.288,0.062,1.322,0.113,2.254C64.1,76.903,63.282,77.858,62.22,77.912L62.22,77.912z"></path></g></g></svg>
            <h1>FootBall <span>Center</span></h1>
        </div>

        <ul className="navList hideNavComp">
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
        </ul>

        

        <div className="options hideNavComp">
          <div className="moreOpt">
            <div className="search" >
              <div className="searchLogo" onClick={()=>{document.querySelector(".options .moreOpt .search input").classList.toggle("activeInp");document.querySelector(".options .moreOpt .search input").focus()}}>
                <svg className="Header_headerNavLinkIcon__90yzK"  viewBox="0 0 24 24"><path  fillRule="evenodd" d="M16.6342 17.6949C15.1119 18.9773 13.1462 19.75 11 19.75c-4.8325 0-8.75-3.9175-8.75-8.75S6.1675 2.25 11 2.25s8.75 3.9175 8.75 8.75c0 2.1463-.7727 4.112-2.0552 5.6343l3.8354 3.8354a.75.75 0 0 1-1.0606 1.0607l-3.8354-3.8355ZM3.75 11c0-4.004 3.246-7.25 7.25-7.25 4.0041 0 7.25 3.246 7.25 7.25 0 1.9605-.7782 3.7393-2.0425 5.0443a.7492.7492 0 0 0-.1633.1633C14.7392 17.4719 12.9605 18.25 11 18.25c-4.004 0-7.25-3.2459-7.25-7.25Z" clipRule="evenodd"></path></svg>
              </div>
              <div className="searchContent">
                <input type="text" value={searchText} onChange={(e)=>setSearchText(e.target.value)} onKeyDown={handleKeyDown} />
              </div>
            </div>
            <div className="line"></div>
            <div className="settings" onClick={()=>goToAccountSetting()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
              </svg>
            </div>
          </div>
          {userToken == null ? (
            <div className="auth">
              <Link to={'/auth/signin'}>
                <img src="http://res.cloudinary.com/dgo3fuaxg/image/upload/v1721929948/bhucqryzr7yrlr3lzuh2.jpg" alt=""  />
              </Link>
            </div>
          ):(
            <div className='userProfilePic'>
              <Link to="/profile">
                <img src={currentUser.image_url} alt=""  onError={(e) => { e.target.src = "http://res.cloudinary.com/dgo3fuaxg/image/upload/v1721929948/bhucqryzr7yrlr3lzuh2.jpg"; }}/>
              </Link>
            </div>
          )}
          
        </div>


        <nav className="menu--right-nav mobileVisible" role="navigation">
          <div className="menuToggle">
            <input type="checkbox" id="hamburg" onChange={stopScroll}/>
            <span className="hamburg"></span>
            <span className="hamburg"></span>
            <span className="hamburg"></span>
            <ul className="menuItem">
              <li>
                <Link to='/' className='homeNav'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill='#0F8C8C'><path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
                  Home
                </Link>
              </li>
              <li>
                <Link to={'/schedule/_/date/'+formattedDate} className='ScheduleNav'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                  </svg>
                Schedule
                </Link>
              </li>
              <li>
                <Link to={'/scoreboard/_/date/'+formattedDate}  className='ScoresNav'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill='#0F8C8C'><path d="M435.4 361.4l-89.7-6c-5.2-.3-10.3 1.1-14.5 4.2s-7.2 7.4-8.4 12.5l-22 87.2c-14.4 3.2-29.4 4.8-44.8 4.8s-30.3-1.7-44.8-4.8l-22-87.2c-1.3-5-4.3-9.4-8.4-12.5s-9.3-4.5-14.5-4.2l-89.7 6C61.7 335.9 51.9 307 49 276.2L125 228.3c4.4-2.8 7.6-7 9.2-11.9s1.4-10.2-.5-15L100.4 118c19.9-22.4 44.6-40.5 72.4-52.7l69.1 57.6c4 3.3 9 5.1 14.1 5.1s10.2-1.8 14.1-5.1l69.1-57.6c27.8 12.2 52.5 30.3 72.4 52.7l-33.4 83.4c-1.9 4.8-2.1 10.1-.5 15s4.9 9.1 9.2 11.9L463 276.2c-3 30.8-12.7 59.7-27.6 85.2zM256 48l.9 0-1.8 0 .9 0zM56.7 196.2c.9-3 1.9-6.1 2.9-9.1l-2.9 9.1zM132 423l3.8 2.7c-1.3-.9-2.5-1.8-3.8-2.7zm248.1-.1c-1.3 1-2.6 2-4 2.9l4-2.9zm75.2-226.7l-3-9.2c1.1 3 2.1 6.1 3 9.2zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm14.1-325.7c-8.4-6.1-19.8-6.1-28.2 0L194 221c-8.4 6.1-11.9 16.9-8.7 26.8l18.3 56.3c3.2 9.9 12.4 16.6 22.8 16.6l59.2 0c10.4 0 19.6-6.7 22.8-16.6l18.3-56.3c3.2-9.9-.3-20.7-8.7-26.8l-47.9-34.8z"/></svg>
                  Scores
                </Link>
              </li>
              <li>
                <Link to={'/competetions'} className='LeaguesNav'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"  fill='#0F8C8C'><path d="M400 0L176 0c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8L24 64C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9L192 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-26.1 0C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24L446.4 64c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112l84.4 0c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6l84.4 0c-5.1 66.3-31.1 111.2-63 142.3z"/></svg>
                  Leagues & Cups
                </Link>
              </li>
              <li>
                <Link to={'/teams'} className='TeamsNav'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill='#0F8C8C'><path d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3l0-84.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5l0 21.5c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-26.8C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112l32 0c24 0 46.2 7.5 64.4 20.3zM448 416l0-21.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176l32 0c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2l0 26.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3l0-84.7c-10 11.3-16 26.1-16 42.3zm144-42.3l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2l0 42.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-42.8c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112l32 0c61.9 0 112 50.1 112 112z"/></svg>
                  Teams
                </Link>
              </li>
              <li>
                <Link to='/transfer/news'> 
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"  fill='#0F8C8C'><path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM112 256l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>
                  Transfer News
                </Link>
              </li>
              <li>
                <Link to='/transfer/majorTransfers'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill='#0F8C8C'><path d="M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z"/></svg>
                  Major Transfers
                </Link>
              </li>       
              <li>
                <Link to="/search">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#0F8C8C" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  Search
                </Link>
              </li>
            
              {userToken == null ? (
                <li >
                  <Link to={'/auth/signin'}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill='#0F8C8C' viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
                    Register 
                  </Link>
                </li>
                ):(
                  <li className='userProfilePic'>
                    <Link to="/profile">
                      <img src={currentUser?.image_url} alt=""  onError={(e) => { e.target.src = "http://res.cloudinary.com/dgo3fuaxg/image/upload/v1721929948/bhucqryzr7yrlr3lzuh2.jpg"; }}/>
                      <span>{currentUser?.name}</span>
                    </Link>
                  </li>
                )
              }
            </ul>
          </div>
        </nav>





      </div>      
    </div>
  )
}
