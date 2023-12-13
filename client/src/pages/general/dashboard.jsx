import React, {useEffect} from "react";
import Navbar from "../../components/navbar/navbar";
import "../../styles/dashboard/dashboards.css";

export default function Dashboard() {

  useEffect(() => {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
      });
    };

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    };

    setInterval(nextSlide, 3000); // Change slide every 3 seconds
  }, []);


  return (
    <div className="dashboard-page"> 
    <style></style>
  <Navbar />
  <div className="content">
    <div className="slider-container">
      <div className="slide">
        <img src={require('./1.jpg')} alt="Slide 1" />
      </div>
      <div className="slide">
        <img src={require('./2.jpg')} alt="Slide 2" />
      </div>
      <div className="slide">
        <img src={require('./1.jpg')} alt="Slide 3" />
      </div>
    </div>
  </div>
</div>
  );
}
