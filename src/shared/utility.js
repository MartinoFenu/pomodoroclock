export const formatTime = time => {
  //format timer as MM:SS
  const minutes = Math.floor( time / ( 1000 * 60 ) );
  //dividing the time in milliseconds for the equivalent of a minute everithings left are seconds
  const seconds = Math.floor( ( time % ( 1000 * 60 ) ) / 1000 );
  return `${minutes < 10 ? `0${minutes}` : minutes }:${seconds < 10 ? `0${seconds}` : seconds }`;
}

//54+546++0+ => 54+546+1+

export const parseString = ( val, type, defVal ) => {
  const strLength = val.length;
  const lastVal = val[ strLength - 1 ];
  let lengths = val.split('+').filter(el => el !== '').map(el => parseInt(el) < 1 ? 1 : parseInt(el));
  let newString;
  if( type === 'blur' ) {
    if( lastVal === '+' &&
       lengths.length % 2 === 0 ) {
      newString = val.slice( 0, strLength -1 )
    } else if( lengths.length % 2 !== 0 ) {
      newString = val + `+${defVal.break}`;
    } else if (val === '') {
      newString = `${defVal.session}+${defVal.break}`;
      lengths = [defVal.session, defVal.break]
    } else newString = val;
  } else {
    // 56++++ => 56+ 
    const joinedString = lengths.join('+');
    newString = lastVal === '+' ? `${joinedString}+` : joinedString;
  }
  return { newString, lengths };
}