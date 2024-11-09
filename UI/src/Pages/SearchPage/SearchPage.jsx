import React, { useEffect, useState } from 'react'
import "./SearchPage.css"
import Footer from '../../components/Footer/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../components/NavBar/NavBar';
import { GET_SEARCH_DATA } from '../../redux/user/userActions';
import { getDefaultLogo, getPlayerLink } from '../../utils/baseUrl';
import PlayersComp from '../../components/SearchComponent/PlayersComp/PlayersComp';
import TeamsComp from '../../components/SearchComponent/TeamsComp/TeamsComp';
import CompetsComp from '../../components/SearchComponent/CompetsComp/CompetsComp';
import SearchFilter from '../../components/SearchComponent/SearchFilter/SearchFilter';
export default function SearchPage() {
    let { searchText } = useParams();
    let { searchType } = useParams();
    let loading=useSelector(state=>state.users.loading) 
    let results=useSelector(state=>state.users.dataFounded) 
    let searchedQuery=useSelector(state=>state.users.searchedQuery) 
    
    let [queryText,setQueryText]=useState(searchText)
  

    let dispatch=useDispatch()
    const navigate=useNavigate();
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleSearch(); // Call your desired function on Enter key press
      }
    };

    const handleSearch = () => {
      dispatch(GET_SEARCH_DATA(queryText))
      navigate("/search/_/q/"+queryText)
      // Add your search function logic here
    };
    useEffect(()=>{
      let currentData=JSON.parse(sessionStorage.getItem("currentCompetData"))
      if(searchText !==""){
        if(currentData != null){
          if(searchText !== searchedQuery){
              dispatch(GET_SEARCH_DATA(searchText))
          }
      }else{
          dispatch(GET_SEARCH_DATA(searchText))
      }
      }

      
      let loadingHeight=window.innerHeight - 95 - document.querySelector(".footer").offsetHeight  - document.querySelector(".SearchBlock").offsetHeight 
          if(document.querySelector(".loadingBlock")){
            document.querySelector(".loadingBlock").style.height=`${loadingHeight}px`
          }
          if(document.querySelector(".pageHeader")){
            document.querySelector(".pageHeader").style.height=`fit-content`
          }
          if(document.querySelector(".wrapper")){
            document.querySelector(".wrapper").style.minHeight=`${loadingHeight}px`
          }
          if(searchText !== queryText){
            setQueryText(searchText)
          }
    },[searchText])
    return (
      <>
          <NavBar />
          <div className="searchPage">
            <div className="container">
              <div className="wrapper">
                
                      <div className="SearchBlock">
                        <div className="searchLogo" onClick={()=>document.querySelector(".options .moreOpt .search input").classList.toggle("activeInp")}>
                            <svg className="Header_headerNavLinkIcon__90yzK"  viewBox="0 0 24 24"><path  fillRule="evenodd" d="M16.6342 17.6949C15.1119 18.9773 13.1462 19.75 11 19.75c-4.8325 0-8.75-3.9175-8.75-8.75S6.1675 2.25 11 2.25s8.75 3.9175 8.75 8.75c0 2.1463-.7727 4.112-2.0552 5.6343l3.8354 3.8354a.75.75 0 0 1-1.0606 1.0607l-3.8354-3.8355ZM3.75 11c0-4.004 3.246-7.25 7.25-7.25 4.0041 0 7.25 3.246 7.25 7.25 0 1.9605-.7782 3.7393-2.0425 5.0443a.7492.7492 0 0 0-.1633.1633C14.7392 17.4719 12.9605 18.25 11 18.25c-4.004 0-7.25-3.2459-7.25-7.25Z" clipRule="evenodd"></path></svg>
                        </div>
                        <div className="searchContent">
                            <input type="text" value={queryText} onChange={(e)=>setQueryText(e.target.value)} onKeyDown={handleKeyDown} />
                          </div>
                      </div>
                  {loading ? (
                     <div className="loadingBlock">
                     <span className="ouro ouro3">
                       <span className="left"><span className="anim"></span></span>
                       <span className="right"><span className="anim"></span></span>
                     </span>
                   </div>
                  ) :(
                    <>
                      <SearchFilter  results={results} word={queryText}/>
                      {
                         searchType == null ?(
                          <div className="searchResults">
                            {
                              results?.compets?.length === 0 && results?.players?.length === 0 && results?.teams?.length === 0  && (
                                <h1 className='noDataFound' >No Data Found!</h1>
                              )
                            }
                            {
                              results?.players?.length > 0 && (<PlayersComp players={results?.players} comType={null} word={queryText}/>)
                            }
                            {
                              results?.teams?.length > 0 && (<TeamsComp teams={results?.teams} comType={null} word={queryText}/>)
                            }
                            {
                              results?.compets?.length > 0 && (<CompetsComp compets={results?.compets} comType={null} word={queryText}/>)
                            }
                          </div>
                         ) : (
                          <div className="searchResults">
                            {searchType=== "players" ?(
                              <PlayersComp players={results?.players} comType={"specificPage"} word={queryText}/>
                            ) :searchType=== "teams" ? (
                              <TeamsComp teams={results?.teams} comType={"specificPage"} word={queryText}/>
                            ): (
                              <CompetsComp compets={results?.compets} comType={"specificPage"} word={queryText}/>
                            )}
                          </div>
                         )
                      }
                      
                    </>
                  )}
              </div>
            </div>
          </div>
          <Footer />
      </>
    )
}
