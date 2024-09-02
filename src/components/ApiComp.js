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
        {responseData && ( // Check if response data is available
          <div>
            <h2>Nutritional Analysis:</h2> 
            {/* Check the actual structure of responseData and access calories correctly */}
            {responseData.calories ? ( // Check if calories data is available
              <p>Calories: {responseData.calories}</p> // Display the calories data
            ) : (
              <p>No calories data available</p> // Display a message if no calories data is available
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ApiComp; // Export the ApiComp component as the default export