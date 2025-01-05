import React, { useContext } from 'react'
import "./Main.css"
import { assets } from '../../assets/assets'
import { Context } from '../../Context/Context'



const Main = () => {

  const { onSent, prevPrompt, setPrevPrompt, recentPrompt, setRecentPtompt, showResult, loading, input, setInput, resultData, setResultData } = useContext(Context)


  return (
    <div className='main'>
      <div className="nav">
        <p>Geminai</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">


        {!showResult
          ? <>
            <div className="greet">
              <span>Hello, Nayan  </span>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Sggest beautiful places to see on an upcomming road ptrip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Brufly summrize this concept: urben planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstrom team bonding activities for our work reatert</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readabilaty of the following code </p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>

          </> : <div className='result'>
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />

              {loading
              ? <div className='loader'>
                  <hr />
                  <hr />
                  <hr />
              </div>:
              <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
               }
            </div>
          </div>
        }


        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here... !' />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input?<img onClick={() => onSent()} src={assets.send_icon} alt="" />:null}
            </div>
          </div>
          <p className='bottmon-info' >
            Gminai may display incorret info, inclouding about people, so double checks its responses, your privicy and gemonai app .
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main