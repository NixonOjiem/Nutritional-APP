import React, { useRef, useState, useEffect } from 'react'; // Import React and necessary hooks
import axios from 'axios'; // Import axios for API requests

function ApiComp() { // Define the ApiComp component
  const textareaRef = useRef(null); // Create a reference to the textarea element
  const [responseData, setResponseData] = useState(null); // Initialize state for response data

  useEffect(() => { // Use the useEffect hook to focus on the textarea on mount
    if (textareaRef.current) { // Check if the textarea reference is available
      textareaRef.current.focus(); // Focus on the textarea
    }
  }, []); // Run the effect only once on mount

  const handleSubmit = async () => { // Define the handleSubmit function
    const textareaValue = textareaRef.current.value; // Get the value of the textarea
    const ingredients = textareaValue.split('\n'); // Split the textarea value into an array of ingredients

    try { // Try to make the API request
      const response = await axios.post( // Make a POST request to the API
        'https://recipe-food-nutrition15.p.rapidapi.com/nutrition-details', // API endpoint
        {
          ingredients // Send the ingredients array in the request body
        },
        {
          headers: { // Set the API request headers
            'x-rapidapi-key': 'f7171ed0damsh435a225b94967c1p1e2eb6jsn57f2abe28f90', // API key
            'x-rapidapi-host': 'recipe-food-nutrition15.p.rapidapi.com', // API host
            'Content-Type': 'application/json' // Content type
          }
        }
      );

      setResponseData(response.data); // Update the response data state
      console.log(response.data); // Log the response data to the console

    } catch (error) { // Catch any errors that occur during the API request
      console.error(error); // Log the error to the console
    }
  };

  return ( // Return the JSX for the component
    <div>
      <p className='Indication-For-textarea'>Key in Your ingridients to get a detailed nutritional analysis of your meal</p>
      <textarea 
        className="Ingridients-Capture" // Class name for the textarea
        rows="10" // Number of rows for the textarea
        cols="50" // Number of columns for the textarea
        placeholder='Key in your ingridients' // Placeholder text for the textarea
        required // Make the textarea required
        wrap='hard' // Set the wrap style for the textarea
        ref={textareaRef} // Assign the textarea reference
      /><br />
      <button 
        className='Submit-button' // Class name for the submit button
        onClick={handleSubmit} // Call the handleSubmit function when the button is clicked
      >Submit</button>
      <div>
      {responseData && (
  <div className='Group-container'>
    {/* Group 1: Nutritional Analysis */}
    <div className='Groups'>
      <h2>Calorie Count, Health Labels, & Diet Labels:</h2>
      {responseData.calories ? (
        <p>Calories: {responseData.calories} <br /><br /></p>
      ) : (
        <p>No calories data available <br /> <br /></p>
      )}
      {responseData.dietLabels && (
        <p>{responseData.dietLabels.join(', ')} <br /> <br /></p>
      )}
      {responseData.healthLabels && (
        <p>{responseData.healthLabels.slice(0, 4).join(', ')}<br /> <br /></p>
      )}
      {responseData.yield && (
        <p>Yield: {responseData.yield}  <br /> <br /></p>

      )}
      {responseData.totalWeight && (
        <p>Total Weight: {responseData.totalWeight} <br /> <br /></p>
      )}
     
    </div>

    {/* Group 5: Total Daily */}
    {/* <div className='Groups'>
      <h2>Total Daily:</h2>
      {Object.keys(responseData.totalDaily).map(key => (
        <p key={key}>{responseData.totalDaily[key].label}: {responseData.totalDaily[key].quantity}{responseData.totalDaily[key].unit}</p>
      ))}
    </div> */}

<div className="Groups">
  <h2>Essential Ellements</h2>
  {Object.keys(responseData.totalDaily)
    .slice(0, Math.ceil(Object.keys(responseData.totalDaily).length / 2))
    .map(key => (
      <p key={key}>{responseData.totalDaily[key].label}: {responseData.totalDaily[key].quantity}{responseData.totalDaily[key].unit}</p>
    ))}
</div>

<div className="Groups">
<h2>Essential Ellements</h2>
  {Object.keys(responseData.totalDaily)
    .slice(Math.ceil(Object.keys(responseData.totalDaily).length / 2))
    .map(key => (
      <p key={key}>{responseData.totalDaily[key].label}: {responseData.totalDaily[key].quantity}{responseData.totalDaily[key].unit}</p>
    ))}
</div>

    {/* Group 6: Total Nutrients */}
    {/* <div className='Groups'>
      <h2>Total Nutrients:</h2>
      {responseData.totalNutrients && (
        <div>
          {Object.keys(responseData.totalNutrients).map(key => (
            <p key={key}>{key}: {responseData.totalNutrients[key].quantity}{responseData.totalNutrients[key].unit}</p>
          ))}
        </div>
      )}
    </div> */}
    <div className='Groups'>
  <h3>Nutrients:</h3>
  {responseData.totalNutrients && (
    <div>
      {Object.keys(responseData.totalNutrients)
        .slice(0, Math.ceil(Object.keys(responseData.totalNutrients).length / 2))
        .map(key => (
          <p key={key}>{key}: {responseData.totalNutrients[key].quantity}{responseData.totalNutrients[key].unit}</p>
        ))}
    </div>
  )}
</div>
<div className='Groups'>
<h3>Nutrients:</h3>
  {responseData.totalNutrients && (
    <div>
      {Object.keys(responseData.totalNutrients)
        .slice(Math.ceil(Object.keys(responseData.totalNutrients).length / 2))
        .map(key => (
          <p key={key}>{key}: {responseData.totalNutrients[key].quantity}{responseData.totalNutrients[key].unit}</p>
        ))}
    </div>
  )}
</div>

    {/* Group 7: Additional Info */}
    {/* <div className='Groups'>
      <h2>Additional Info:</h2>
      {responseData.totalWeight && (
        <p>Total Weight: {responseData.totalWeight}</p>
      )}
      {responseData.uri && (
        <p>URI: {responseData.uri}</p>
      )}
      {responseData.yield && (
        <p>Yield: {responseData.yield}</p>
      )}
    </div> */}
  </div>
)}
      </div>
    </div>
  );
}

export default ApiComp; // Export the ApiComp component as the default export