"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/loader";
import "./App.css";
import { Empty } from "@/components/empty";


function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  async function generateAnswer() {
    setLoading(true);
    try {
      const response = await axios.post<{ candidates: { content: { parts: { text: string }[] } }[] }>(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=ADD_YOUR_API_KEY',
        {
          contents: [{ parts: [{ text: question }] }],
        }
      );
      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error('Error fetching data:', error);
      setAnswer('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center ">
<h1 className="text-5xl  text-center font-bold font-serif mt-20 text-[#a3a1a3]">Code Genrator</h1>
      <p className="mb-8 mt-2 text-center text-violet-500 font-semibold">Our most advanced code Genrator model</p>
      <div className="flex justify-center mb-8">
        <Input 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)} 
          className="border p-3 w-full md:w-80 rounded-xl" 
          placeholder="write a ccode for sum of 2 number"
        />
      </div>
      <Button onClick={generateAnswer} className='bg-[#7d2fc6] hover:bg-green-600'>Genrate Code</Button>
      {loading && (
        <div className="mt-4">
          <Loader />
        </div>
      )}
      <div className="mt-20 p-4 bg-white rounded-xl shadow-md w-full md:max-w-xl h-full md:h-64 overflow-auto">
        <pre className="whitespace-pre-wrap">{answer}</pre>
       
       
          
      </div>
    </div>
  );
}

export default App;
