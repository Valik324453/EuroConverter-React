import "./App.css";
import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { FcDislike, FcApproval } from "react-icons/fc";
import { GrBitcoin } from "react-icons/gr";
import { BsCurrencyEuro } from "react-icons/bs";

//----------------------------------------------------
//     1
//----------------------------------------------------
// function App() {
//   const count = useRef(0);
//   const [number, setNumber] = useState(0);

//   useEffect(() => {
//     console.log(`Count: ${count.current}`);
//     console.log(`Number: ${number}`);
//   }, [number]);

//   return (
//     <div className="App">
//       <h2>count: {count.current}</h2>
//       <h2>number: {number}</h2>
//       <button
//         onClick={() => {
//           count.current = count.current + 10;
//           setNumber(number + 1);
//         }}
//       >
//         +
//       </button>
//     </div>
//   );
// }
//----------------------------------------------------
//     2
//----------------------------------------------------

// function App() {
//   const inputValue = useRef();
//   const text = useRef();

//   return (
//     <div className="App">
//       <input type="text" ref={inputValue} />
//       <h2 ref={text}>Heading 1</h2>
//       <button
//         onClick={() => {
//           inputValue.current.style.backgroundColor = "red";
//           inputValue.current.style.display = "none";

//           console.log(inputValue.current.value);
//           console.log(text.current.textContent);
//         }}
//       >
//         Show value
//       </button>
//     </div>
//   );
// }
//----------------------------------------------------
//     3
//----------------------------------------------------
// function App() {
//   const [number, setNumber] = useState(1);
//   const prevNumber = useRef();

//   useEffect(() => {
//     prevNumber.current = number;
//   }, [number]);

//   function rollTheDice() {
//     let randomNumber = Math.round(Math.random() * 8) + 1;

//     setNumber(randomNumber);
//   }

//   return (
//     <div className="App">
//       <h1>Dice: {number}</h1>
//       <p>Previous value: {prevNumber.current}</p>
//       <button onClick={() => rollTheDice()}>Roll the dice</button>
//     </div>
//   );
// }

//----------------------------------------------------
//     4(icons)
//----------------------------------------------------
// function App() {
//   const Title = styled.h1`
//     font-size: 30px;
//     font-family: serif;
//     color: blue;
//   `;

//   const Container = styled.div`
//     margin: 10px 30px;
//     padding: 50px;
//     background-color: lightgray;
//     text-align: left;
//   `;

//   const Btn = styled.button`
//     background-color: black;
//     color: white;
//     padding: 15px;
//   `;

//   return (
//     <div className="App">
//       <Container>
//         <Title>Welcome</Title>
//         <Btn onClick={() => console.log("Hello")}>Click me!</Btn>
//       </Container>
//       <FcDislike />
//       <FcApproval />
//       <GrBitcoin />
//     </div>
//   );
// }

// export default App;

//----------------------------------------------------
//     5(api)
//----------------------------------------------------

function App() {
  const [data, setData] = useState();
  const currency = useRef();
  const eur = useRef();
  const x = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const Input = styled.input`
    font-size: 24px;
    padding: 10px 20px;
    background-color: lightgray;
    border-radius: 5px;
    border: 0;
    outline: 0;
    margin: 10px;
  `;

  const Select = styled.select`
    font-size: 24px;
    padding: 10px 20px;
    background-color: lightgray;
    border-radius: 5px;
    border: 3px solid lightgray;
    outline: 0;
    margin: 10px;
  `;

  async function fetchData() {
    const api = await fetch(
      "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json"
    );
    const json = await api.json();
    setData(json);
  }

  function converter() {
    console.log(currency.current.value.name);
    //console.log(data);
    let value = eur.current.value * data.eur[currency.current.value];
    x.current.value = value.toFixed(5);
  }

  function converterBack() {
    let value = x.current.value / data.eur[currency.current.value];
    eur.current.value = value.toFixed(5);
  }

  return (
    <div className="App">
      <h1>
        Euro Converter <BsCurrencyEuro className="euro_icons" />
        <Input
          onChange={() => converter()}
          ref={eur}
          type="number"
          step="0.1"
          placeholder="EUR"
        />
        <Input
          onChange={() => converterBack()}
          ref={x}
          type="number"
          step="0.1"
          placeholder="X"
        />
        <Select onChange={() => converter()} ref={currency}>
          {data
            ? Object.keys(data.eur).map((currency) => (
                <option value={currency}>{currency.toUpperCase()}</option>
              ))
            : ""}
        </Select>
      </h1>
    </div>
  );
}

export default App;
