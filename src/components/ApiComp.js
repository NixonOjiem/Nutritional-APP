import React, { useRef, useState } from 'react';
import axios from 'axios';

function ApiComp() {
  const textareaRef = useRef(null);
  const [responseData, setResponseData] = useState(null);

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

  return (
    <div>
      <p className='Indication-For-textarea'>Key in Your ingridients to get a detailed nutritional analysis of your meal</p>
      <textarea 
        className="Ingridients-Capture" 
        rows="10" 
        cols="50" 
        placeholder='Key in your ingridients' 
        required 
        wrap='hard' 
        ref={textareaRef} 
      /><br />
      <button 
        className='Submit-button' 
        onClick={handleSubmit}
      >Submit</button>
      <div>
        {responseData && (
          <div>
            <h2>Nutritional Analysis:</h2>
            {/* Check the actual structure of responseData and access calories correctly */}
            {responseData.calories ? (
              <p>Calories: {responseData.calories}</p>
            ) : (
              <p>No calories data available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ApiComp;