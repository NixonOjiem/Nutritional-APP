import React, {useRef, useEffect} from 'react'

function ApiComp() {
    const textareaRef = useRef(null);

    useEffect(()=>{
        if(textareaRef.current){
            textareaRef.current.focus();
        }
    },[]);

    const handleSubmit = () =>{
        const textareaValue = textareaRef.current.value;
        const ingridients =[textareaRef.current.value]
        console.log("The button has been clicked: The value for text area is:", ingridients)
    }

    

  return (
    <div>
        <p className='Indication-For-textarea'>Key in Your ingridients to get a detailed nutritional analysis of your meal</p>
        <textarea className="Ingridients-Capture" rows="10" cols="50" placeholder='Key in your ingridients' required wrap='hard' ref={textareaRef} /><br />
        <button className='Submit-button'onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default ApiComp