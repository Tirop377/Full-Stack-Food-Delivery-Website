
import './Footer.css'
import {assets} from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, itaque vel! Vel necessitatibus non ipsum.dolor sit amet consectetur, adipisicing elit. Tenetur, itaque vel! Vel necessitatibus non ipsum.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET NI TOUCH</h2>
                <ul>
                    <li>+124-155-536-1</li>
                    <li>contact@kevin.dev</li>
                </ul>
            </div>   
        </div>

        <hr/>
        <p className='footer-copyright'> copyright 2024 © Tomato.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
