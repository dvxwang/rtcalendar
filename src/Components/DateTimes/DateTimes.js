import React from 'react';

import './DateTimes.css';

var DateTimes = React.createClass({
	render() {

		//Create elements for times
		var DateRows = Array(48).fill(true).map(function(elem,index){
			var evenRow = !!(index%2);
			return <div className="timeRow" style={evenRow ? {borderTop: "none"}:{borderBottom: "none"}} key={index}>{evenRow ? null: ((index/2)%12 ? (index/2)%12:12)+((index/2)<12 ? " AM":" PM")}</div>
		});

		return (
			<div className='timeColumn'>
				{DateRows}
			</div>
		)
	}
})

export default DateTimes;