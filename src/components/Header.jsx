import {useState,useEffect} from 'react'

const Header = ({isNewFest,timeleft}) => {
    let [currentword,setCurrentWord]=useState("incredible")
    
    let words=["Beautiful","Awesome","Incredible","lovely","fantastic","greatfull","joyfull","gratitude","confidence","peace","success"];
 
    // useEffect for updating the words after everysecond
    useEffect(()=>{
        let wordChange=setInterval(()=>{
           setCurrentWord(prevword=>{
            let currentIndex=words.indexOf(prevword)
         
            return words[(currentIndex+1)% words.length]
           })
        },1000)
        
        // cleanup 
        return ()=>clearInterval(wordChange)
    },[]) //run only once


return (
    <div className='header-container d-flex justify-content-between align-items-center p-4 border'>
        {/* header-display */}
       <div className='text-start'>
       <h1 className='header-title '>{isNewFest?"🌹Happy Pongal🌹🪁":"🌹Advance Happy Pongal🌹🪁"}</h1>
       <p className='fs-3 '>Make these year <strong className='text-success fs-1'>{currentword}</strong></p>
       </div>
       {/* countdown-timer */}
       <div className="timer-section">
         <h3 className='border border-info rounded-pill bg-info fw-bold p-2 fs-0 mx-5 mb-5'>
            {timeleft.hours<10?`0${timeleft.hours}`:timeleft.hours}:
            {timeleft.min<10?`0${timeleft.min}`:timeleft.min}:
            {timeleft.sec<10?`0${timeleft.sec}`:timeleft.sec}
         </h3>
       </div>
    </div>
  )
}

export default Header;