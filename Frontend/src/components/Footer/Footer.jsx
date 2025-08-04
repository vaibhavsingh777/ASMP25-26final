import React from 'react'
import './Footer.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <>
        <div className="asmp-footer">
            {/* <p>Made with ❤️ by SARC</p> */}
            <div className="heart">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ margin: '0', fontFamily: "Fraunces, serif",}}>Made with </p>
                <p className="heartbeat" style={{ margin: '0 5px' }}>❤️</p>
                <p className="heartecho" style={{ margin: '0 5px' }}>❤️</p>
                <p style={{ margin: '0', fontFamily: "Fraunces, serif",}}> by SARC</p>
            </div>
            </div>
            <div className="social-links">
                <ul className='footer-ul'>
                    <li className='footer-li'>
                    <a href="https://www.facebook.com/SARC.IITB/" target="_blank" rel="noopener noreferrer">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span className="fa-brands fa-facebook"></span>
                    </a>
                    </li>
                    <li className='footer-li'>
                    <a href="https://www.youtube.com/c/SARCIITBombay" target="_blank" rel="noopener noreferrer">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span className="fa-brands fa-youtube"></span>
                    </a>
                    </li>
                    <li className='footer-li'>
                    <a href="https://www.instagram.com/sarc_iitb/?hl=en" target="_blank" rel="noopener noreferrer">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span className="fa-brands fa-instagram"></span>
                    </a>
                    </li>
                    <li className='footer-li'>
                    <a href="https://www.linkedin.com/in/sarciitb/?originalSubdomain=in" target="_blank" rel="noopener noreferrer">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span className="fa-brands fa-linkedin"></span>
                    </a>
                    </li>
                </ul>
            </div>
        </div>
    </>
  )
}

export default Footer