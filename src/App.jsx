import { useState } from 'react';
import './App.css'

function App() {
  return (
    <Game />
  )
}

function Game() {
  const [historyId, setHistoryId] = useState(0);
  const [history, setHistory] = useState([Array(9).fill(0)]);

  const next = historyId % 2 === 0 ? 'X' : 'O';
  const list = history[historyId];

  function updateGameState(cellId) {
    const newEntry = list.map((val, i) => {
      if (i === cellId) return next;
      return val;
    })

    setHistory(h => h.slice(0, historyId + 1));
    setHistory(h => [...h, newEntry]);
    setHistoryId(historyId + 1);
  }

  function getQue() {
    const gameOvers = [
      [1,2,3],
      [4,5,6],
      [7,8,9],
      [1,4,7],
      [2,5,8],
      [3,6,9],
      [1,5,9],
      [3,5,7],
    ];
    let que = `Next player: ${next}`;
    for (const [a, b, c] of gameOvers) {
      if (
        (list[a-1] === list[b-1])
        && (list[b-1] === list[c-1])
        && (list[a-1] !== 0)
      ) {
        que = `Winner: ${list[a-1]}`;
        break;
      }
    };
    return que;
  }

  const cells = list.map((val, i) => 
    <Cell
      value={val}
      updateGameState={updateGameState}
      key={i}
      id={i}
    />  
  );

  const historyItems = history.map((_, i) => {
    if (i === 0) return (
      <li key={i}>
        <button onClick={() => setHistoryId(i)}>Go to game start</button>
      </li>
    )
    else return (
      <li key={i}>
        <button onClick={() => setHistoryId(i)}>Go to move #{i}</button>
      </li>
    )
  });

  return (
    <div className="game">
      <div className="game--container">
        <p>{getQue()}</p>
        <table className="game--field">
          <tbody>
            <tr>{cells.slice(0, 3)}</tr>
            <tr>{cells.slice(3, 6)}</tr>
            <tr>{cells.slice(6, 9)}</tr>
          </tbody>
        </table>
      </div>
      <ol className="game--history">
        {historyItems}
      </ol>
    </div>
  )
}

function Cell({ value, updateGameState, id }) {
  function clickHandler() {
    if (value !== 0) return;
    updateGameState(id);
  }

  return (
    <td className="cell">
      <button onClick={clickHandler}>{value || ''}</button>
    </td>
  )
}

export default App;