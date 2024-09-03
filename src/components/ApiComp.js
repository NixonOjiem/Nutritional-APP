import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

function ApiComp() {
  const textareaRef = useRef(null);
  const [responseData, setResponseData] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSubmit = async () => {
    const textareaValue = textareaRef.current.value;
    const ingredients = textareaValue.split('\n');

    try {
      const response = await axios.post(
        'https://recipe-food-nutrition15.p.rapidapi.com/nutrition-details',
        {
          ingredients
        },
        {
          headers: {
            'x-rapidapi-key': 'f7171ed0damsh435a225b94967c1p1e2eb6jsn57f2abe28f90',
            'x-rapidapi-host': 'recipe-food-nutrition15.p.rapidapi.com',
            'Content-Type': 'application/json'
          }
        }
      );

      setResponseData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (containerRef.current && responseData) {
      const groups = containerRef.current.querySelectorAll('.Groups');
      const largeCard = containerRef.current.querySelector('#Large-card');
      const largeCardHeight = largeCard.offsetHeight;
      groups.forEach((group) => {
        group.style.height = `${largeCardHeight}px`;
      });
    }
  }, [responseData]);

  return (
    <div>
      <p className="Indication-For-textarea">Key in Your ingridients to get a detailed nutritional analysis of your meal</p>
      <textarea
        className="Ingridients-Capture"
        rows="10"
        cols="50"
        placeholder="Key in your ingridients"
        required
        wrap="hard"
        ref={textareaRef}
      />
      <br />
      <button className="Submit-button" onClick={handleSubmit}>
        Submit
      </button>
      {responseData ? (
  <div ref={containerRef}>
    <div className="Group-container">
      {/* Group 1: Nutritional Analysis */}
      <div className="Groups">
        <h2>Calorie & Labels:</h2>
        {responseData.calories ? (
          <p>Calories: {responseData.calories} <br /><br /></p>
        ) : (
          <p>No calories data available <br /> <br /></p>
        )}
        
        <ul><br />
        <h4>Diet Labels</h4>
        {responseData.dietLabels.slice(0, 9).map((label) => (
          <li key={label}>{label}</li>
          ))}
        </ul><br />
        
        <ul>
          <h4>Health Labels</h4>
          {responseData.healthLabels.slice(0,9).map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul><br />
        <ul>
        <p>Yield: {responseData.yield}</p>
        </ul>
      </div>
      {/* Group 2: Ingredients */}
      <div className="Groups">
        {/* <h2>Ingredients:</h2>
        <ul>
          {responseData.ingredients.map((ingredient) => (
            <li key={ingredient.text}>{ingredient.text}</li>
          ))}
        </ul> */}
        <ul>
          <h2>Total Daily:</h2>
      {Object.keys(responseData.totalDaily)
        .slice(0, Math.ceil(Object.keys(responseData.totalDaily).length / 2))
        .map((key) => (
          <li key={key}>{key}: {responseData.totalDaily[key].quantity} {responseData.totalDaily[key].unit}</li>
        ))}
    </ul>
      </div>
      {/* Group 3: Total Daily */}
      <div className="Groups">
        <h2>Total Daily:</h2>
        <ul>
      {Object.keys(responseData.totalDaily)
        .slice(Math.ceil(Object.keys(responseData.totalDaily).length / 2))
        .map((key) => (
          <li key={key}>{key}: {responseData.totalDaily[key].quantity} {responseData.totalDaily[key].unit}</li>
        ))}
    </ul>
      </div>
      {/* Group 4: Total Nutrients */}
      <div className="Groups" id="Large-card">
        <h2>Total Nutrients:</h2>
        <div>
          {Object.keys(responseData.totalNutrients)
            .slice(0, Math.ceil(Object.keys(responseData.totalNutrients).length / 2))
            .map((key) => (
              <p key={key}>{key}: {responseData.totalNutrients[key].quantity}{responseData.totalNutrients[key].unit}</p>
            ))}
        </div>
        
      </div>
      {/* Group 5: Total Weight */}
      <div className="Groups">
        <h2>Total Nutrients</h2>
          {Object.keys(responseData.totalNutrients)
            .slice(Math.ceil(Object.keys(responseData.totalNutrients).length / 2))
            .map((key) => (
              <p key={key}>{key}: {responseData.totalNutrients[key].quantity}{responseData.totalNutrients[key].unit}</p>
            ))}
            <p>Total Weight:{responseData.totalWeight} g</p>
        </div>
      {/* <div className="Groups">
        <h2>Total Weight:</h2>
        <p>{responseData.totalWeight} g</p>
      </div> */}
      {/* Group 6: URI */}
      {/* <div className="Groups">
        <h2>URI:</h2>
        <p>{responseData.uri}</p>
      </div> */}
      {/* Group 7: Yield */}
      {/* <div className="Groups">
        <h2>Yield:</h2>
        <p>{responseData.yield}</p>
      </div> */}
      {/* Group 8: Cautions */}
      {/* <div className="Groups">
        <h2>Cautions:</h2>
        <ul>
          {responseData.cautions.map((caution) => (
            <li key={caution}>{caution}</li>
          ))}
        </ul>
      </div> */}
    </div>
  </div>
) : (
  <p>Loading...</p>
)}
    </div>
  );
}

export default ApiComp;