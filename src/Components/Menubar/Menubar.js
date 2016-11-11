import React from 'react';

import './Menubar.css';

//renders views for menubar appearing above calendar
var Menubar = React.createClass({
	render(){
		return (
			<div className='menubar'>
				<div className='arrowBox'>
					<div className='leftArrow' onClick={()=> this.props.changeView(false)}></div>
					<div className='rightArrow' onClick={()=> this.props.changeView(true)}></div>
				</div>
				<div className='dateRange'>Date Range: {this.props.dates[0]} - {this.props.dates[this.props.dates.length-1]} </div>
				<select className='timeZoneView' onChange={this.props.updateTimeZone} defaultValue={this.props.timeZone}>
					<option value="America/New_York">Timezone: EST</option>
					<option value="America/Chicago">Timezone: CST</option>
					<option value="America/Denver">Timezone: MST</option>
					<option value="America/Los_Angeles">Timezone: PST</option>
				</select>
				<div className='viewRange'>
					<div className='dateView' style={this.props.viewType==="1day" ? {border: "thin solid white"}:{}} onClick={()=> this.props.updateViewType({type: "1day", length: 1})}>1 Day</div>
					<div className='dateView' style={this.props.viewType==="4day" ? {border: "thin solid white"}:{}} onClick={()=> this.props.updateViewType({type: "4day", length: 4})}>4 Day</div>
					<div className='dateView' style={this.props.viewType==="week" ? {border: "thin solid white"}:{}} onClick={()=> this.props.updateViewType({type: "week", length: 7})}>Week</div>
				</div>
			</div>
		)
	}
})

export default Menubar;