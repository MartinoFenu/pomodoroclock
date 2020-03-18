import React from 'react';

const ClockFace = props => {
  let marks = [];
  for(let i = 1; i < 13; i++ ) {
    marks.push(<line
                key={i}
                x1="21"
                y1="0"
                x2="20"
                y2="0"
                style={{
                  transform: `rotate(${i * 30}deg)`
                }} />
              );
  }

  return(
    <svg
      viewBox="0 0 50 50"
      className="ClockFace">
      <path
        className="OuterCircle"
        d="M25 2.7183
          a 22.2817 22.2817 0 0 1 0 44.5634
          a 22.2817 22.2817 0 0 1 0 -44.5634"
      />
      <path
        className={`ProgressCircle ${props.timeStyle}`}
        strokeDasharray={`${130-(props.elapsed * 130)}, 130`}
        d="M25 4.7183
          a 20.2817 20.2817 0 0 1 0 40.5634
          a 20.2817 20.2817 0 0 1 0 -40.5634"
      />
      <g className="marks">
        {marks}
      </g>
      <text x='11' y='23'
        className={`TimerLabel ${props.timeStyle}`}>
      {props.timerLabel}
      </text>
      <text
        x="25"
        y="33.35"
        className={`ClockTimer ${props.timeStyle}`}>
        {props.timer}
      </text>
    </svg>
  )
}
export default ClockFace;
