import React from 'react';
import moment from 'moment';
import Mtz from 'moment-timezone';

import Datebox from '../Datebox/Datebox';
import Dateheader from '../DateHeader/DateHeader';
import MenuBar from '../Menubar/Menubar';
import EventPanel from '../EventPanel/EventPanel';
import {createDateObject} from '../../helperFunctions';

import './MainbodyBox.css';

var MainbodyBox = React.createClass({
  
  getInitialState() {
    return { 
      viewType: "week",
      viewLength: 7,
      viewInit: 0,
      timeZone: "America/New_York",
      events:[]
    };
  },

  getEventData() {
    
    //Queries for event data and sets applicable events to state

    //Promise for querying data
    const promise = new Promise(resolve => {
      setTimeout(() => {

          //Scrapes data from window object (for demo purposes)
          var events = window.events;

          //Filters only for events in current date view range
          events = events.filter((elem)=> {
            var eventTime = Mtz.tz(elem.startTime, this.state.timeZone)
           
            var leftRange = moment().add(this.state.viewInit-1,'days');
            var rightRange = moment().add(this.state.viewInit + this.state.viewLength+1,'days'); 
            return eventTime.isBetween(leftRange,rightRange, 'days', '[)');
          },this)

          //Reformat events into usable array of events
          var timeZone = this.state.timeZone;
          events = events.reduce(function(a,elem){
            a = a.concat(createDateObject(elem, timeZone));
            return a;
          },[]);

          this.setState({events: events})
      }, 0)
    })

    promise
    .catch(error => {
      console.log('Error', error);
    })

  },

  componentDidMount() {
    this.getEventData();
  },

  updateViewInit(e) {
    //Sets calendar view start date
    var newInit = e ? this.state.viewInit+this.state.viewLength:this.state.viewInit-this.state.viewLength
    this.setState({viewInit: newInit},this.getEventData);
  },

  updateTimeZone(e) {
    //Sets calendar timezone
    this.setState({timeZone: e.target.value}, this.getEventData);
  },

  updateViewType(e) {
    //Sets calendar view date range length
    this.setState({viewType: e.type, viewLength: e.length},this.getEventData);
  },

  addEvent(e) {
    //Pushes new event to window object (demo purposes only)
    window.events.push(e);
    this.getEventData();
  },

  render() {

    //creates array of dates to show
    var datesArray=[];
    var weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    for (var i=this.state.viewInit; i<(this.state.viewInit+this.state.viewLength); i++){
      var someDate = new Date();
      someDate.setDate(someDate.getDate() + i); 
      datesArray.push((someDate.getMonth()+1)+"/"+someDate.getDate()+" - "+weekDays[someDate.getDay()]);
    }

    return (
      <div className='mainbodyBox'>
        <div className='mainbody'>
          <MenuBar dates={datesArray} changeView={this.updateViewInit} updateViewType={this.updateViewType} updateTimeZone={this.updateTimeZone} timeZone={this.state.timeZone} viewType={this.state.viewType} />
          <Dateheader dates={datesArray}/>
          <Datebox dates={datesArray} events={this.state.events}/>
        </div>
        <EventPanel addEvent={this.addEvent} events={this.state.events} timeZone={this.state.timeZone}/>
      </div>
    );
  }
})

export default MainbodyBox;
