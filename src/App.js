import React, { useState } from 'react';
import './calculator.css';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [isResult, setIsResult] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleButtonClick = (value) => {
    if (isError) {
      setDisplayValue(value === 'C' ? '0' : value);
      setIsError(false);
      return;
    }
    
    if (isResult && value !== '=') {
      setDisplayValue(value === 'C' ? '0' : value);
      setIsResult(false);
      return;
    }

    switch (value) {
      case '=':
        try {
          const result = eval(displayValue);
          setDisplayValue(result.toString());
          setIsResult(true);
        } catch (error) {
          setDisplayValue('please enter a valid value');
          setIsError(true);
        }
        break;
      case 'C':
        setDisplayValue('0');
        setIsResult(false);
        break;
      default:
        if (displayValue === '0') {
          setDisplayValue(value);
        } else {
          setDisplayValue(displayValue + value);
        }
        break;
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
  ];

  return (
    <div className="calculator">
      <input type="text" value={displayValue} readOnly />
      <div className="buttons">
        {buttons.map((button, index) => (
          <button key={index} onClick={() => handleButtonClick(button)}>{button}</button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
