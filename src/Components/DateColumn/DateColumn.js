import React from 'react';

import './DateColumn.css';

import EventBlock from '../EventBlock/EventBlock';

var DateColumn = React.createClass({
	render() {

		//Parses events by half houts slot
		var eventObj={};
		this.props.events.forEach((elem,index)=> eventObj[elem.start] ? eventObj[elem.start].push(<EventBlock key={index} event={elem}></EventBlock>) : eventObj[elem.start]=[<EventBlock key={index} event={elem} marginFlag={true}></EventBlock>]);

		var timeRows = Array(48).fill(true).map((elem,index)=> <div className='timeSlot' style={!(index%2) ? {borderBottom: "1px lightGray dashed"}:{borderBottom: "1px lightGray solid"}} key={index}>{eventObj[index] || []}</div>);
		
		return (
			<div className='dateColumn' style={{width:(this.props.width)+"%"}}>
				{timeRows}
			</div>
		)
	}
})

export default DateColumn;