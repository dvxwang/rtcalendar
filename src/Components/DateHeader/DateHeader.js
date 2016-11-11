import React from 'react';

import './DateHeader.css';

var Dateheader = React.createClass({
  render() {
    
    // evenly distribute header width
    var elemWidth = (90/this.props.dates.length)+"%";
    
    // create array of date header elements
    var dateElementsArray = this.props.dates.map((elem,index)=><div className='dateHeader' style={{width: elemWidth}} key={index}>{this.props.dates[index]}</div>);

    return (
      <div className='headerWrapper'>
        <div className='timeHeader'>Time</div>
        {dateElementsArray}
      </div>
    );
  }
})

export default Dateheader;