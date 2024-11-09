import React from 'react'

export default function EmptySlut() {
  let style;
  if(document.body.classList.contains("light-theme")){
    style={
      fill:"#ccccccc4"
    }
  }else{
    style={
      fill:"#1A1A1A"
    }
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none">
        <path d="M48 24a24 24 0 1 0-48 0 24 24 0 0 0 48 0Z" style={style}/>
        <path fillRule="evenodd" clipRule="evenodd" d="M24 15c.6 0 1 .4 1 1v7h7a1 1 0 1 1 0 2h-7v7a1 1 0 1 1-2 0v-7h-7a1 1 0 1 1 0-2h7v-7c0-.6.4-1 1-1Z" fill="#025959"/>
    </svg>
  )
}
