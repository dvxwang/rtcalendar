import React from 'react';

import './EventBlock.css'

var EventBlock = React.createClass({
	render() {

		var eventWidth = ((100/this.props.event.overlap)-5)+"%";

		//set component size/placement
		var eventLeft="0";
		if(this.props.marginFlag) {
			eventLeft=(95-(100/this.props.event.overlapLeft+1))+"%";
		}

		//Add event components
		var elemHeight=(this.props.event.duration*101)+"%";

		return (
			 <div className='eventContainer' style={{left: eventLeft, height: elemHeight, width: eventWidth}}>{this.props.event.name}</div>
		)
	}
})

export default EventBlock;