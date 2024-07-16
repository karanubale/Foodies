import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <h1>Foodies App</h1>
                    <p className='footer-social-items margintop'>© 2024 karan</p>
                    <div className="footer-social-items margintop">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>Company</h2>
                    <ul className='margintop'>
                        <li>About</li>
                        <li>Delivery</li>
                        <li>Team</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET in touch</h2>
                    <ul className='margintop'>
                        <li>+91 9999999999</li>
                        <li>abc@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">
                copyright 2024@ foodies.com-all right reserved.
            </p>
        </div>
    )
}

export default Footer