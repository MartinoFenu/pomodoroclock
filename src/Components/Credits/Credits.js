import React from 'react';

const Credits = props => {
  return (
    <div className="creditsContainer">
      <p>
        Based on the <a href="https://learn.freecodecamp.org/front-end-libraries/front-end-libraries-projects/build-a-pomodoro-clock">Build a Pomodoro Clock</a> freeCodeCamp challenge.
      </p>
      <p>
        <span>Sounds from <a href="https://freesound.org/">freesound.org</a>.</span>
        <span>The author of every sound is:</span>
      </p>
      <ul>
        <li>
          For Mechanical alarm: <a href="https://freesound.org/people/joedeshon/">joedeshon</a>
        </li>
        <li>
          For Digital alarm <a href="https://freesound.org/people/ZyryTSounds/">ZyryTSounds</a>
        </li>
        <li>For Buzzer alarm: <a href="https://freesound.org/people/israra/">israra</a></li>
        <li>
          For Water alarm: <a href="https://freesound.org/people/almalaut/">almalaut</a>
        </li>
      </ul>
    </div>
  )
}

export default Credits;
