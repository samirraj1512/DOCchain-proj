import React from 'react';
import ReactDOM from 'react-dom'
import "./AboutUs.css";
import Navbar from './components/NavBar/navbar';
import Footer from './components/Footer/Footer';

export default function AboutUs(){
    return (
        <div>
            <Navbar/>
            <div className="about-us">
                <div className="about-container">
                    <div className="Intro">
                        <p>Welcome to our project website dedicated to the 
                            exploration and implementation of a blockchain based decentralized 
                                digital identity system verification model.
                        </p>
                    </div>
                    <h1>Our Mission</h1>
                    <p>Our mission is to make the handling of digital Identities more secure and verified using blockchain technology.
                        We aim to provide a secure, transparent, and decentralized solution 
                           that empowers individuals to have control over their own digital identities.
                                The utilisation of blockchain technology allows us to enhance the validity and trust on the verification of documents. As once a document is verified and stored on blockchain further no tampering can be done to it.
                                                  We utilise the well secured IPFS system for document verification.We provide you with the facility of utilising all these beneficial functionalitites sitting at home.                                 </p>
                    <h1>Our Vision</h1>
                    <p>We envision a future where every individual has a self-sovereign digital identity that is portable, private, and secure.
                        Through our innovative approach, we strive to build a trustless ecosystem where identity verification processes are efficient, cost-effective, fraud-resistant and less time consuming.</p>
                    <h1>Our Solution</h1>
                    <ul>
                    <li>
                        <h2>Claim Contracts</h2>
                        <p>Blockchain technology offers effective solutions to common issues such as document forgery and vulnerabilities associated with centralized storage processes, which are susceptible to cyber attacks. Decentralizing processes like document verification and storing documents enhances security in the environment.</p>
                    </li>
                    <li>
                        <h2>Docker</h2>
                        <p>The optimal approach to document storage is by refraining from granting any single third party access to them. Instead, storing them in a decentralized manner ensures enhanced security.</p>
                        {/* <br/> */}
                        <p>With Docker, you can conveniently verify your documents using the latest IPFS system without the need to stand in long queues or visit any physical locations.</p>
                    </li>
                    <li>
                        <h2>Avatar Using Gen-AI</h2>
                        <p>The Gen-AI function utilizes your provided prompts to generate personalized images, tailoring avatars to your unique interests and preferences.</p>
                    </li>
                    <li>
                        <h2>Property Access</h2>
                        <p>No longer fret about entrusting your keys to neighbors or dealing with self-centered friends who disrupt your home while you're away. You can now use blockchain for the security of your property. And provide the access of it to anyone according to your comfortability.</p>
                    </li>
                    <li><h2>Voting</h2>
               
                    <p>The integration of blockchain technology in voting improves transparency and auditability, eliminating opportunities for forgery and undue influence.</p>
                    </li>
                    </ul>
                    <h1>Why Choose Us?</h1>
                    <ul>
                        <li>Expertise in blockchain technology</li>
                        <li>Commitment to security and privacy</li>
                        <li>Focus on decentralization and transparency</li>
                        <li>Passionate team dedicated to innovation</li>
                        <li>Continuous research and development</li>
                        
                    </ul>
                    <h1>Contact Us</h1>
                    <p>If you have any questions, feedback, or inquiries about our project, feel free to reach out to us:</p>
                    <ul>
                        <li>Email: manas.help_desk@iitg.ac.in</li>
                        <li>Phone: +91(0123456789)</li>
                    </ul>
                </div>
            </div>
            <Footer/>
            </div>
    );
}