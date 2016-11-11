import React from 'react';
import moment from 'moment'

import './EventListComponent.css';

var EventListComponent = React.createClass({
	render() {

		return (
			<div className='eventBox'>
				<div className='nameBox'>Name: {this.props.event.name}</div>		
				<div className='timeBox'>Date: {this.props.event.date}</div>		
				<div className='timeBox'>Start: {moment(this.props.event.localStart).format('LT')}</div>	
				<div className='timeBox'>End: {moment(this.props.event.localEnd).format('LT')}</div>			
			</div>
		)
	}
})

export default EventListComponent;