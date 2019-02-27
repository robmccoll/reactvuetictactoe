import React from 'react';

var Square = (props) => (
      <button className="square" onClick={() => props.onClick()}>
        {props.value}
      </button>
);

var Board = (props) => {
    var rows = [];
    for(var r = 0; r < 3; r++) {
      var cols = [];
      for(var c = 0; c < 3; c++) {
        var i = r*3 + c;
        cols.push(<Square
          key={i}
          value={props.squares[i]}
          onClick={props.onClick.bind(this, i)}
        />);
      }
      rows.push(
        <div key={r} className="board-row">
          {cols}
        </div>
      );
    }
    return (<div>{rows}</div>);
};

export default Board;
