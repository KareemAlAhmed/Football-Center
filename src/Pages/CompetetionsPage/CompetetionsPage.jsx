import React, { useEffect } from 'react'
import "./CompetetionsPage.css"
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { GET_TOURNS_BY_CAT } from '../../redux/tourns/tournsActions';
import { Link } from 'react-router-dom';
import { getDefaultTeamOrCompetLogo } from '../../utils/baseUrl';
export default function CompetetionsPage() {
  const allCompetetionByCat=useSelector(state=>state.tourns.allCompetetionByCat);
  const dispatch=useDispatch();
    useEffect(()=>{
        sessionStorage.getItem("allTeams") == null && dispatch(GET_TOURNS_BY_CAT())
    },[])

  return (
    <>
        <NavBar />
        <div className="competetions">
            <div className="container">
                <h1>Leagues and Competitions</h1>
                <div className="competetionsWrapper">
                    {allCompetetionByCat.map((league,index)=>{
                        return <div className="competetionBlock" key={index}>
                                    <h2 className='comptCateg'>{league.name}</h2>
                                    <div className="competetionsList">
                                        {league.leagues.map((compt,ind)=>{
                                            return <div className="competetion" key={ind}>
                                            <div className="competetionImg">
                                              <img src={compt.id != null ? compt.leagueLogo : "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=80&h=80&scale=crop&cquality=40&location=origin"} alt="" onError={(e) => { e.target.src = getDefaultTeamOrCompetLogo(); }}/>
                                            </div>
                                            <div className="competetionInfo">
                                                <div className="comptNameAndOpt">
                                                 <Link className='competLink' to={`/competetion/_/id/${compt.id}/${compt.slug}`}><p>{compt.leagueName.length > 31 ? compt.leagueName.slice(0,28)+"..." : compt.leagueName}</p></Link>
                                                    
                                                    <ul className='optionsList'>
                                                        <li><Link >Squads</Link></li>
                                                        <li><Link >Stats</Link></li>
                                                        <li><Link >Fixtures</Link></li>
                                                    </ul>
                                                </div>
                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                                            </div>
                                        </div>
                                        })}
                                    </div>
                                </div>
                    })}
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}
