import moment from 'moment';
import Mtz from 'moment-timezone';

//checks if multiple events overlap within the same day
function checkOverlap(events){

	//Calculates number of events that have overlapping times, and how many overlapped events start before event
	events.sort(function(a,b){return a.start > b.start});
	for(var n=0; n<events.length; n++){
		var overlapValues = calcOverlap(events,n);
		events[n].overlap = overlapValues[0];
		events[n].overlapLeft = overlapValues[1];
	}

	function calcOverlap(arr,ind){
		var overlap = 1;
		var overlapLeft = 0;
		
		var curEvent = arr[ind];
		arr= arr.slice(0,ind).concat(arr.slice(ind+1));
		
		//Checks the overlap between target event and all other events during that day
		for (var m=0; m<arr.length; m++){
			
			var cStart = curEvent.start;
			var cEnd = curEvent.end;
			var start = arr[m].start;
			var end = arr[m].end;
			
			if ((cStart>=start && cStart<end) || (cEnd>start && cEnd<=end) || (cStart<start && cEnd>end)){
				overlap++;
				if (arr[m].overlapLeft) {
					overlap+=Math.pow(overlap,arr[m].overlapLeft+1)
				};
				if(cStart>start) {
					overlapLeft++;
					if (arr[m].overlapLeft) {overlapLeft+=Math.pow(overlapLeft+1,arr[m].overlapLeft+1)};
				}
			}
		}
		return [overlap, overlapLeft];
	}

	return events;
}

function createDateObject(obj,timezone){
	
	var weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

	//Initiate event overlaps
	obj.overlap = 1;
	obj.overlapLeft = 0;

	obj.standardStart= Mtz.tz(obj.startTime, "America/New_York");
    obj.standardEnd= Mtz.tz(obj.endTime, "America/New_York");
    obj.localStart = obj.standardStart.tz(timezone);
    obj.localEnd = obj.standardEnd.tz(timezone);

	//Modifies event if event starts and ends on same date
	if (obj.localStart.format('D')===obj.localEnd.format('D') || (obj.localEnd.format('H')==='0' && obj.localEnd.format('m')==='0')){
	  var duration = moment.duration(obj.localEnd.diff(obj.localStart));
	  var hours = Math.abs(duration.asHours()*2);
	  obj.duration = hours;
	  obj.date = obj.localStart.format('M')+"/"+obj.localStart.format('D')+" - "+weekDays[obj.localStart.format('e')];
	  obj.start = (obj.localStart.format('H')*2) + (obj.localStart.format('m')==="0" ? 0:1);
	  obj.end = ((obj.localEnd.format('H')*2) + (obj.localEnd.format('m')==="0" ? 0:1)) || 48;
	  return [obj];
	}
	else {
		//If event stretches across two days, returns two events, one for each day
		var breakDate = Mtz.tz(obj.localEnd.format('YYYY-M-D'), timezone);

		var startObj = {
			name: obj.name,
			startTime: obj.startTime,
			endTime: breakDate
		}
		startObj = createDateObject(startObj,timezone)[0];

		var endObj = {
			name: obj.name,
			startTime: breakDate,
			endTime: obj.endTime
		}
		endObj = createDateObject(endObj,timezone)[0];

		return [startObj, endObj];
	}
}

export {checkOverlap, createDateObject};