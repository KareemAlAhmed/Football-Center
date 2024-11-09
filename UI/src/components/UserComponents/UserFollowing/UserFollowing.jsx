import React, { useState } from 'react'
import "./UserFollowing.css"
import { Link } from 'react-router-dom';
import { getEmptySlutLogo } from '../../../utils/baseUrl';
import EmptySlut from '../../Icons/EmptySlut/EmptySlut';
import UserListDisplayer from '../UserListDisplayer/UserListDisplayer';
export default function UserFollowing({userData}) {
  const [editMode,setEditMode]=useState(false)
  return (
    <section className='Card userFollowing'>
      <header className="cardHeader">
          <div className="cardTitle">
              <p>My Interest</p>
              <button onClick={()=>setEditMode(!editMode)}>{editMode ? "DONE" : "EDIT"}</button>
          </div>   
      </header>
      <div className="Wrapper">
        <div className="followingLists">
          <UserListDisplayer type={"MY TEAMS"} list={userData?.followedTeams} favTeam={userData?.favTeam} favNationalTeam={userData?.favNationalTeam} editMode={editMode}/>
          <UserListDisplayer type={"MY COMPETITIONS"} list={userData?.followedCompetetions} favTeam={null} favNationalTeam={null} editMode={editMode}/>
          <UserListDisplayer type={"MY PLAYERS"} list={userData?.followedPlayers} favTeam={null} favNationalTeam={null} editMode={editMode}/>
        </div>
      </div>  
    </section>
  )
}


