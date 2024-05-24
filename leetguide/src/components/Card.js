import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import autosize from 'autosize';
import { IoEnterOutline } from "react-icons/io5";


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

    const suggestions = [
        "Ask for help with linked lists",
        "Explain this Python code",
        "Generate unit tests for my code",
        "Find relevant code examples"
    ];

    useEffect(() => {
        autosize(document.getElementById('prompt-textarea'));
      }, []);

    return (
        <div className="rounded-xl p-10 w-11/12 justify-center items-center h-screen flex flex-col space-y-4 shadow-lg card-background">
          <div className="h-5/6 overflow-auto overscroll-contain rounded-xl p-4">
            {output === '' ? (
                <div className="grid grid-cols-4 gap-5">
                {suggestions.map((suggestion, index) => (
                    <button key={index} className="relative flex w-28 flex-col gap-2 rounded-2xl border border-token-border-light px-2 pb-3 pt-2 text-left align-top text-[14px] shadow-[0_0_2px_0_rgba(0,0,0,0.05),0_4px_6px_0_rgba(0,0,0,0.02)] transition hover:bg-token-main-surface-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" className="icon-md" style={{color: "rgb(118, 208, 235)"}}>
                            <path fill="currentColor" fill-rule="evenodd" d="M12.455 4.105a1 1 0 0 0-.91 0L1.987 8.982 1.077 7.2l9.56-4.877a3 3 0 0 1 2.726 0l9.56 4.877A1.98 1.98 0 0 1 24 9.22V15a1 1 0 1 1-2 0v-3.784l-2.033.995v4.094a3 3 0 0 1-1.578 2.642l-4.967 2.673a3 3 0 0 1-2.844 0l-4.967-2.673a3 3 0 0 1-1.578-2.642v-4.094l-2.927-1.433C-.374 10.053-.39 7.949 1.077 7.2l.91 1.782 9.573 4.689a1 1 0 0 0 .88 0L22 8.989v-.014zM6.033 13.19v3.114a1 1 0 0 0 .526.88l4.967 2.674a1 1 0 0 0 .948 0l4.967-2.673a1 1 0 0 0 .526-.88V13.19l-4.647 2.276a3 3 0 0 1-2.64 0z" clip-rule="evenodd"></path>
                        </svg>
                        <div className="line-clamp-3 text-gray-600 dark:text-gray-500 break-word">
                            {suggestion}
                        </div>
                    </button>
                ))}
            </div>
            ) : (
                <div className='h-full p-2 overflow-auto rounded-md text-gray-200 overscroll-contain text-base text-left whitespace-normal overflow-wrap-anywhere'>
                    <ReactMarkdown>
                    {output}
                    </ReactMarkdown>
                </div>
            )}
          </div>
          <div className="h-1/6 w-full bg-282c34 rounded-xl p-4">
  <textarea 
    id="prompt-textarea" 
    tabindex="0" 
    data-id="9c01f276-9014-4cb1-9631-52f5d6089023" 
    dir="auto" 
    rows="1" 
    placeholder="Message LeetGuide" 
    className="m-0 text-gray-400 resize-none bg-transparent px-0 text-token-text-primary focus:ring-0 focus-visible:ring-0 text-center border border-gray-600 w-full outline-none rounded-lg"
    style={{overflowY: 'hidden', maxHeight: '4em'}}
    value={input} 
    onChange={e => setInput(e.target.value)} 
  />      
  <div className='flex justify-center'>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
      onClick={handleSubmit}
    >
      <IoEnterOutline />
            </button>
            </div>
          </div>
        </div>
    );
}

export default Card;
