import {useState,useEffect} from 'react'

const Quotes = () => {
  const quotes=[
    "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    "The way to get started is to quit talking and begin doing.",
    "You must be the change you wish to see in the world.",
    "Well done is better than well said.",
    "Be yourself; everyone else is already taken.",
    "It is during our darkest moments that we must focus to see the light.",
    "Do one thing every day that scares you.",
    "Life is either a daring adventure or nothing.",
    "The secret of success is to do the common thing uncommonly well.",
    "Whether you think you can or you think you can't, you're right."
  ];
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Select a random quote on component mount
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []); // Empty dependency array ensures it runs only on mount

  return (
    <div className='border border-success text-center bg-success'>
      <h2>Quote of the Day</h2>
      <p style={{ fontSize: "1.5rem", fontStyle: " oblique" }}>{quote}</p>
    </div>
  );
};

export default Quotes