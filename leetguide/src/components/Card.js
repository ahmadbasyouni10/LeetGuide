import React from 'react';
import { useState } from 'react';
import axios from 'axios';


const Card = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const answer = await axios.post('http://localhost:3001/api/gemini', { input });
            setOutput(answer.data.answer);
        }
        catch (error) {
            console.error('Error:', error);
            setOutput('Error retrieving response from Gemini');
        }
    }

    return (
        <div className="bg-white rounded-xl p-10 w-11/12 h-screen flex flex-row space-x-4 shadow-lg">
          <div className="w-1/2 h-full bg-gray-100 rounded-xl p-4">
            <h2 className="text-2xl mb-4">Input Section</h2>
            <textarea 
                className="w-full h-1/3 p-2 rounded-md" 
                placeholder="Type here..."
                value={input} onChange={e => setInput(e.target.value)}>      
            </textarea>
            <div className='flex justify-center'>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleSubmit}
            >
                Help me!
            </button>
            </div>
          </div>
          <div className="w-1/2 h-full bg-gray-100 rounded-xl p-4">
            <h2 className="text-2xl mb-4">Output Section</h2>
            <div className='h-full p-2 overflow-auto rounded-md'>
                {output}
            </div>
          </div>
        </div>
      );
    }



export default Card;