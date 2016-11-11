import React from 'react';

import DateColumn from '../DateColumn/DateColumn';
import DateTimes from '../DateTimes/DateTimes';
import {checkOverlap} from '../../helperFunctions';

import './Datebox.css';

var Datebox = React.createClass({
  render() {
    
    // create hash of events per day and check for overlap
    var dateObj={};
    this.props.events.forEach((elem)=> dateObj[elem.date] ? dateObj[elem.date].push(elem) : dateObj[elem.date]=[elem]);
    for (var key in dateObj){
      if (dateObj.hasOwnProperty(key)) {
        dateObj[key] = checkOverlap(dateObj[key]);
      }
    }

    // create date column elements
    var elemWidth = 90/this.props.dates.length;
    var numDatesRender = this.props.dates.map((elem,index)=> <DateColumn key={index} width={elemWidth} date={elem} events={dateObj[elem] || []}/>);
    
    return (
      <div className='dateBox'>
        <DateTimes />
        {numDatesRender}
      </div>
    );
  }
})

export default Datebox;
