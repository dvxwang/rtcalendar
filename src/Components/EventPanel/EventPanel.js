import React from 'react';
import moment from 'moment';
import momentTimeZone from 'moment-timezone';

import EventListComponent from '../EventListComponent/EventListComponent';

import './EventPanel.css';

var EventPanel = React.createClass({
	
	getInitialState() {
		var today = new Date();
		return {
			eventName: "",
			eventYear: today.getFullYear(),
			eventMonth: today.getMonth()+1,
			eventDay: today.getDate()<10 ? "0"+today.getDate():today.getDate(),
			eventZone: this.props.timeZone,
			eventStart: "00:00",
			eventEnd: "00:30"
		}
	},

	updateEventName(e) {
		this.setState({eventName: e.target.value});
	},

	updateEventYear(e) {
		this.setState({eventYear: e.target.value});
	},

	updateEventMonth(e) {
		this.setState({eventMonth: e.target.value});
	},

	updateEventDay(e) {
		this.setState({eventDay: e.target.value});
	},

	updateEventZone(e) {
		this.setState({eventZone: e.target.value});
	},

	updateEventStart(e) {
		this.setState({eventStart: e.target.value});
	},

	updateEventEnd(e) {
		this.setState({eventEnd: e.target.value});
	},

	sendEvent() {
		var startConfig = (this.state.eventStart === "EOD" ? false: momentTimeZone.tz(this.state.eventYear+"-"+this.state.eventMonth+"-"+this.state.eventDay+" "+this.state.eventStart, this.state.eventZone));
		var endConfig = (this.state.eventEnd === "EOD" ? false: momentTimeZone.tz(this.state.eventYear+"-"+this.state.eventMonth+"-"+this.state.eventDay+" "+this.state.eventEnd, this.state.eventZone));

		var eventSequence = (!startConfig ? false:(this.state.eventEnd === "EOD" ? true: endConfig.isAfter(startConfig)));

		//Only adds event if times and name are valid
		if (eventSequence && this.state.eventName && this.state.eventStart) {
			if (!endConfig) {
				endConfig = moment(startConfig.format('YYYY-M-D')).add(1, "days");
			}

			startConfig = momentTimeZone(startConfig.format()).tz('America/New_York');
			endConfig = momentTimeZone(endConfig.format()).tz('America/New_York');

			this.props.addEvent({
				name: this.state.eventName,
				startTime: startConfig.format("YYYY-M-D HH:mm"),
				endTime: endConfig.format("YYYY-M-D HH:mm")
			});

			//Reset state after successful event add
			var today = new Date();
			this.setState({
				eventName: "",
				eventYear: today.getFullYear(),
				eventMonth: today.getMonth()+1,
				eventDay: today.getDate()<10 ? "0"+today.getDate():today.getDate(),
				eventZone: this.props.timeZone,
				eventStart: "00:00",
				eventEnd: "00:30"
			});	
		} else {
			console.log("Start: ", startConfig);
			console.log("End: ", endConfig);
			console.log("Invalid event name/time");
		}
	},

	render() {

		//Create dropdown options for adding events
		var eventListComponents= this.props.events.map((elem,index)=> <EventListComponent event={elem} key={index}/>);
		
		var yearOptions = Array(10).fill(true).map((elem,index)=>{
			var today = new Date();
			return <option key={index}>{today.getFullYear()+index}</option>
		});

		var monthOptions = Array(12).fill(true).map((elem,index)=>{
			var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			return <option key={index} value={index+1}>{monthNames[index]}</option>
		});

		var daysInMonth = moment(this.state.eventYear+"-"+this.state.eventMonth, "YYYY-MM").daysInMonth()
		var dayOptions = Array(daysInMonth).fill(true).map((elem,index)=>{
			var dayValue = (index+1)<10 ? "0"+(index+1):(index+1);
			return <option key={index} value={dayValue}>{index+1}</option>
		});
		
		var timeOptions = Array(49).fill(true).map((elem,index)=>{
			var startTimeValue = (Math.floor(index/2)<10 ? "0"+Math.floor(index/2):Math.floor(index/2))+(index%2 ? ":30":":00")
			if (index===48) return <option key={index} value={"EOD"}>{"End of day"}</option>
			return <option key={index} value={startTimeValue}>{!(Math.floor(index/2)%12) ? "12":Math.floor(index/2)%12}{index%2 ? ":30":":00"}{index>23 ? " PM":" AM"}</option>
		});

		var timeZones = [
			["EST", "America/New_York"],
			["CST", "America/Chicago"],
			["MST", "America/Denver"],
			["PST", "America/Los_Angeles"]
		]
		var timezoneOptions = timeZones.map((elem,index)=><option key={index} value={elem[1]}>{elem[0]}</option>)

		return (
			<div className='eventPanel'>
				<div className='panelSection'>
					<div className='panelTitle'>Add Event</div>
					<div className='panelBody'>
						<div className='inputRow'>
							<div className='inputTitle'>Name: </div>
							<div className='inputSection'><input style={{width: "80%"}} onChange={this.updateEventName} placeholder="Event name" value={this.state.eventName} /></div>
						</div>
						<div className='inputRow'>
							<div className='inputTitle'>Year: </div>
							<div className='inputSection'>
								<select onChange={this.updateEventYear} value={this.state.eventYear}>
									{yearOptions}
								</select>
							</div>
						</div>
						<div className='inputRow'>
							<div className='inputTitle'>Month: </div>
							<div className='inputSection'>
								<select onChange={this.updateEventMonth} value={this.state.eventMonth}>
									{monthOptions}
								</select>
							</div>
						</div>
						<div className='inputRow'>
							<div className='inputTitle'>Date: </div>
							<div className='inputSection'>
								<select onChange={this.updateEventDay} value={this.state.eventDay}>
									{dayOptions}
								</select>
							</div>
						</div>
						<div className='inputRow'>
							<div className='inputTitle'>TZone: </div>
							<div className='inputSection'>
								<select onChange={this.updateEventZone} value={this.state.eventZone}>
									{timezoneOptions}
								</select>
							</div>
						</div>
						<div className='inputRow'>
							<div className='inputTitle'>Start: </div>
							<div className='inputSection'>
								<select onChange={this.updateEventStart} value={this.state.eventStart}>
									{timeOptions}
								</select>
							</div>
						</div>
						<div className='inputRow'>
							<div className='inputTitle'>End: </div>
							<div className='inputSection'>
								<select onChange={this.updateEventEnd} value={this.state.eventEnd}>
									{timeOptions}
								</select>
							</div>
						</div>
						<div className='submitButton' onClick={this.sendEvent}>Submit</div>
					</div>
				</div>
				<div className='panelSection'>
					<div className='panelTitle'>Upcoming Events</div>
					<div className='panelBody'>
						{eventListComponents}
					</div>
				</div>
			</div>
		)
	}
})

export default EventPanel;