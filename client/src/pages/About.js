import React from 'react';
import drRichImage from '../assets/images/drRich.png';
import drAbedImage from '../assets/images/drAbed.png';
import drSashaImage from '../assets/images/drSasha.png';


const About = () => {
  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-4xl font-semibold mb-4'>About Our Dermatology Office</h1>
      <p className='text-lg mb-4'>
        At our Dermatology Office, our mission is to provide comprehensive and advanced skincare to patients of all ages. With a team of
        dedicated, experienced, and caring professionals, we strive to provide the highest quality dermatological care in a compassionate
        and comfortable environment.
      </p>
      <p className='text-lg mb-4'>
        Our primary dermatologist, Dr. Doe, is a board-certified dermatologist with over 15 years of experience in medical and cosmetic
        dermatology. Dr. Doe is committed to helping patients achieve healthy, beautiful skin and uses the latest technologies and
        treatments in the field.
      </p>
      <p className='text-lg mb-4'>
        We offer a wide range of services including acne treatment, botox, skin cancer treatment, and laser hair removal. Whether you are
        seeking to improve the appearance of your skin, or need comprehensive skin cancer care, our team is here to meet and exceed your
        expectations.
      </p>
      <p className='text-lg mb-4'>
        We believe in educating our patients about their skin conditions and treatment options. This enables our patients to make informed
        decisions about their care. We are proud of the lasting relationships we have developed with our patients over the years and look
        forward to welcoming you to our practice.
      </p>
      <h1 className='text-4xl font-semibold mb-4'>Meet our staff</h1>
     
       <div className= "flex"> <img className="" src={drRichImage} alt="rich"></img> <p>Dr. Rich-Dr. Rich Widtmann isn't just a board-certified dermatologist; he's a skin health maestro orchestrating a symphony of science, empathy, and personalized care for each patient. With his profound understanding of dermatology, he paints a picture of health on the canvas of your skin, turning each concern into a masterpiece of wellness. When you step into Dr. Widtmann's clinic, you're not just getting treated, you're embarking on a journey towards radiant skin health, conducted by one of the most dedicated virtuosos in the field. </p>
       </div>
        
      <div  className= "flex"> <img className="" src={drAbedImage} alt="abed"></img> <p>Dr. Abed- Navigating the world of skin care with Dr. Abed is like embarking on a voyage with a seasoned captain at the helm. With his vast knowledge as a dermatologist and a deep-rooted passion for skin health, Dr. Abed's clinic is your sanctuary, where skincare concerns transform into empowering journeys of wellness. Here at Dr. Abed's clinic, you're not just a patient, you're a valued member of a shared expedition towards achieving the glowing skin health you deserve.</p>
      </div> 
       
     
     <div  className= "flex"> <img className="" src={drSashaImage} alt="sasha"></img>  <p>Dr. Sasha- At the crossroads of innovation and care, you'll find Dr. Sasha - a dermatologist who doesn't just treat skin, but transforms it. Harnessing his vast knowledge and experience, he crafts unique, personalized journeys towards skin health, turning complexities into straightforward paths. With Dr. Sasha, you are not simply experiencing dermatology - you are witnessing the art of skin care reinvented.</p>
    </div>
    </div>
  );
};


export default About;
