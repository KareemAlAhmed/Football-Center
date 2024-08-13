import React from 'react'
import "./Footer.css"
export default function Footer() {
    let social=[
        {
            name:"Instagram",
            // img:"https://image-service.onefootball.com/transform?w=48&dpr=2&image=https://images.onefootball.com/cw/icons/instagram_dark.svg",
            img:"<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'><path d='M14.1 12a2.1 2.1 0 1 0-4.2 0 2.1 2.1 0 0 0 4.2 0Z' fill='#F3F4F5'/><path fill-rule='evenodd' clip-rule='evenodd' d='M11.4 6.8h.6a44.7 44.7 0 0 1 3.8.2l.7.5.5.7.2 1.2a44.6 44.6 0 0 1-.2 6.4 2 2 0 0 1-.5.7 2 2 0 0 1-.7.5l-1.2.2a44.5 44.5 0 0 1-6.4-.2 2 2 0 0 1-.7-.5 2 2 0 0 1-.5-.7l-.2-1.2A44.7 44.7 0 0 1 7 8.2l.5-.7.7-.5 1.2-.2h2Zm4 1a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6ZM8.7 12a3.3 3.3 0 1 1 6.6 0 3.3 3.3 0 0 1-6.6 0Z' fill='#F3F4F5'/><path fill-rule='evenodd' clip-rule='evenodd' d='M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24ZM9.4 5.6H12a45.4 45.4 0 0 1 4.2.3c.4.2.8.4 1.1.8.4.3.6.7.8 1.1l.3 1.6a45.8 45.8 0 0 1-.3 6.8c-.2.4-.4.8-.8 1.1-.3.4-.7.6-1.1.8l-1.6.3a45.4 45.4 0 0 1-6.8-.3c-.4-.2-.8-.4-1.1-.8-.4-.3-.6-.7-.8-1.1l-.3-1.6A45.5 45.5 0 0 1 6 7.8c.2-.4.4-.8.8-1.1.3-.4.7-.6 1.1-.8l1.6-.3Z' fill='#F3F4F5'/></svg>",
            username:"@FootBallCenter"
        },
        {
            name:"Facebook",
            // img:"https://image-service.onefootball.com/transform?w=48&dpr=2&image=https://images.onefootball.com/cw/icons/facebook_dark.svg",
            img:"<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'><path fill-rule='evenodd' clip-rule='evenodd' d='M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm1.3 12.5v6.6h-2.8v-6.6H9.2v-2.2h1.3V8.9c0-1.8.8-2.9 3-2.9h1.8v2.3h-1.1c-.9 0-1 .3-1 .9v1h2l-.1 2.3h-1.8Z' fill='#F3F4F5'/></svg>",
            username:"@FootBallCenter.de"
        },
        {
            name:"Twitter",
            // img:"https://image-service.onefootball.com/transform?w=48&dpr=2&image=https://images.onefootball.com/cw/icons/twitter_dark.svg",
            img:"<svg xmlns='http://www.w3.org/2000/svg' fill='none' height='24' width='24'><path clip-rule='evenodd' d='M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm-.3 10.2v-.4c-.1-1.1.5-2.1 1.6-2.5h1.4l.8.4.4.2.4-.1c.3 0 .6-.2.8-.3.1 0 .2-.1.2 0l-.5.8c-.4.4-.3.4.4.2.5-.2.5-.2.4 0L17 9c-.5.5-.5.6-.5 1a7.4 7.4 0 0 1-3.4 5.8 7 7 0 0 1-7.1-.1l.7-.1a4 4 0 0 0 2.2-.6l.5-.3-.5-.2c-.8-.2-1.4-.8-1.6-1.4 0-.1 0-.2.4-.2h.5l-.4-.2c-.5-.2-1-.6-1.1-1a3 3 0 0 1-.3-1.2l.4.1c.5.2.6.2.3-.2C6.4 10 6.3 9 6.6 8l.1-.4.6.6a6.8 6.8 0 0 0 4 2h.4Z' fill='#fff' fill-rule='evenodd'/></svg>",
            username:"@FootballCenter"
        },
        {
            name:"Youtube",
            // img:"https://image-service.onefootball.com/transform?w=48&dpr=2&image=https://images.onefootball.com/cw/icons/youtube_dark.svg",
            img:"<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'><path d='M10.8 10.4v4l3.2-2-3.2-2Z' fill='#F3F4F5'/><path fill-rule='evenodd' clip-rule='evenodd' d='M0 12a12 12 0 1 1 24 0 12 12 0 0 1-24 0Zm18.1-3c-.1-.5-.5-1-1.1-1-1-.3-5-.3-5-.3s-4 0-5 .3c-.6 0-1 .5-1.1 1-.3 1-.3 3.2-.3 3.2s0 2.1.3 3.2c.1.5.5 1 1.1 1.1 1 .3 5 .3 5 .3s4 0 5-.3c.6-.1 1-.6 1.1-1.1.3-1 .3-3.2.3-3.2s0-2.1-.3-3.2Z' fill='#F3F4F5'/></svg>",
            username:"@FootballCenter"
        },
        {
            name:"TikTok",
            img:"<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'><path fill-rule='evenodd' clip-rule='evenodd' d='M20.5 3.5a12 12 0 1 1-17 17 12 12 0 0 1 17-17Zm-4 3.7c.5.6 1 1 1.8 1.1h.8v2.6a5 5 0 0 1-3.7-1.2v5.5a5 5 0 0 1-4.9 4.9A5 5 0 0 1 7 18.5a4.9 4.9 0 0 1 3.5-8.2h.7v2.8l-.7-.1a2.2 2.2 0 0 0-1.8 3.6c.4.5 1 .9 1.8.9 1.3 0 2.3-1 2.3-2.3V4.6h2.6a4 4 0 0 0 1 2.6Z' fill='#F3F4F5'/></svg>",
            // img:"https://image-service.onefootball.com/transform?w=48&dpr=2&image=https://images.onefootball.com/cw/icons/tiktok_dark.svg",
            username:"@FootBallCenter"
        },
    ]
  return (
    <div className='footer'>
        <div className="container">
            <div className="socialMedia">
                <h3>Follow Football Center</h3>
                <div className="socialList">
                    {social.map((ele,index)=>{
                        return <div className='social' key={index}>
                                        {/* <img src={ele.img} alt='' /> */}
                                    <div dangerouslySetInnerHTML={{ __html: ele.img }} className="socialLogo"></div>
                                    <p>{ele.name}</p>
                                    <p>{ele.username}</p>
                                </div>
                    })}
                </div>
            </div>
        <p className='brand'>© 2024 FootBall Center</p>
        </div>
    </div>
  )
}
