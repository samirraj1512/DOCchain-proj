import React from "react";
import manas_lion from '../Assets/manas_lion.png'
import './Footer.css'

const Footer = () => {
	return (
        <div className="parent_footer">
		    <div className="footer_container">
                <div className="img_container">
                    <img src={manas_lion} alt="" style={{transform: 'scaleX(-1)', height:'25vh', color:'gold'}}/>
                    <div className="yo_manas">Yo Manas !!</div>
                </div>
            </div>
            <div style={{color:'white', textAlign:'center', fontWeight:'600', borderTop:'2px solid white', padding:'1vh'}}>&copy; 2024 Manas All Rights Reserved.</div>
        </div>
	);
};

export default Footer;
