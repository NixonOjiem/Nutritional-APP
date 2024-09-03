import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Content() {
  AOS.init();
  return (
    <>
      <div className="Nav-bar">
        <h2>Nutrition Analysis</h2>
      </div>{" "}
      {/* Add this closing tag */}
      <div
        className="Header"
        data-aos="fade-zoom-in"
        data-aos-easing="ease-in-back"
        data-aos-delay="100"
        data-aos-offset="0"
      >
        <p>
          Good nutrition is the foundation of a healthy lifestyle. What we eat
          directly impacts our energy levels, overall well-being, and long-term
          health. Understanding the nutritional content of your meals is crucial
          for making informed decisions that align with your health goals,
          whether you're aiming to lose weight, build muscle, or simply maintain
          a balanced diet.
        </p>
        <br />

        <p>
          This app is designed to simplify this process. It calculates the
          nutritional breakdown of your meals, providing detailed insights into
          calorie count, essential nutrients, vitamins, minerals, and more. With
          this information at your fingertips, you can easily track your intake
          and make adjustments to support your dietary needs. Empower yourself
          with knowledge and take control of your nutrition with our app.
        </p>
      </div>
    </>
  );
}

export default Content;
