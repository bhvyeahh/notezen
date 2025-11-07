import React, { useEffect, useState } from 'react';
import '../styles/ThoughtBento.css'
import {thoughts} from "../data/thoughts.js"

const ThoughtBento = () => {

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % thoughts.length);
    }, 12000); // 12 seconds

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <div className="thought-bento">
      <p>{thoughts[current]}</p>
    </div>
  );
};

export default ThoughtBento;
