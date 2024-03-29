import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  function Square(props){
    return (
      <button 
        className="square"
        onClick={props.onClick}
      >
        { props.value }
      </button>
    );
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square 
          value={this.props.value[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        history : [
          {
            squares: Array(9).fill(null)
          }
        ],
        xlsNext: true,
        stepNumber: 0
      }
    }
    handleClick(i){
      const history = this.state.history.slice(0, this.state.stepNumber + 1)
      const current = history[this.state.stepNumber]
      const winner = calculateWinner(current.squares)
      if(winner || current.squares[i]){
        return
      }
      let squares = current.squares.slice();
      squares[i] = this.state.xlsNext ? 'X' : 'O'
      console.log(this.state.stepNumber, current, history)
      this.setState({
        history: history.concat({
          squares: squares
        }),
        stepNumber: history.length,
        xlsNext: !this.state.xlsNext,
      })
    }
    jumpTo(setp){
      this.setState({
        stepNumber: setp,
        xlsNext: setp % 2 === 0
      })
    }
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber]
      const winner = calculateWinner(current.squares)
      const moves = history.map((step , move) => {
        let desc = move ? 'Go to move #' + move : 'Go to game start'
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        )
      })
      let status
      if(winner){
        status = 'winner: ' + winner
      } else {
        status = this.state.xlsNext ? 'Next player: X' : 'Next player: O'
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board
              value={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  