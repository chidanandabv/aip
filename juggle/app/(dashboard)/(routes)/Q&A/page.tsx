"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/empty";

import "./App.css";


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
    <div className=" flex flex-col items-center justify-center ">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center mb-4 ">Ask The Juggle</h1>
        <Input 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)} 
          className="border p-3 w-full rounded-lg mb-4" 
          placeholder="Ask me a question"
        />
        <Button onClick={generateAnswer} className="w-full bg-[#7d2fc6] text-white font-semibold py-3 rounded-lg hover:bg-green-600">Ask</Button>
        {loading && (
        <div className="mt-5">
          <Loader />
        </div>
      )}  

         
      
      
          </div>
      {answer && (
        <div className="bg-white rounded-lg shadow-md p-8 mt-8 max-w-md w-full">
          <h2 className="text-xl font-semibold mb-2">Answer:</h2>
          <p className="text-gray-700">{answer}</p>
        </div>
      )}

{question.length===0 && !loading && (
            <Empty label="No Question Asked" />
          )}
    </div>
  );
}

export default App;