import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import App from '../src/App';
import MainbodyBox from '../src/Components/MainbodyBox/MainbodyBox';
import Menubar from '../src/Components/Menubar/Menubar';
import Dateheader from '../src/Components/DateHeader/DateHeader';

import {checkOverlap} from '../src/helperFunctions';

it("creates Date object correctly", function () {

	var events = [{
		convertedEnd: "2016-11-08T05:30:00-05:00",
		convertedStart: "2016-11-08T01:30:00-05:00",
		date: "11/8 - Tue",
		duration: 8,
		end: 11,
		endDate: "2016-11-08T10:30:00.000Z",
		name: "Foo",
		overlap: 1,
		overlapLeft: 0,
		start: 3,
		startDate: "2016-11-08T06:30:00.000Z" 
	}, {
		convertedEnd: "2016-11-08T05:30:00-05:00",
		convertedStart: "2016-11-08T02:30:00-05:00",
		date: "11/8 - Tue",
		duration: 8,
		end: 11,
		endDate: "2016-11-08T10:30:00.000Z",
		name: "Foo",
		overlap: 1,
		overlapLeft: 0,
		start: 5,
		startDate: "2016-11-08T07:30:00.000Z"
	}]
	
	var formattedEvents = checkOverlap(events);

	expect(formattedEvents[0].overlap).toEqual(2);
	expect(formattedEvents[0].overlapLeft).toEqual(0);

	expect(formattedEvents[1].overlap).toEqual(2);
	expect(formattedEvents[1].overlapLeft).toEqual(1);
});

it("renders App component", function () {

    var renderer = ReactTestUtils.createRenderer();

    renderer.render( <App /> );
    var appElement = renderer.getRenderOutput();

    expect(appElement.props.className).toEqual("App");
	expect(appElement.props.children[0].props.className).toEqual("App-header");
	expect(appElement.props.children[1].type.displayName).toEqual("MainbodyBox");
});

it("renders MainbodyBox component", function () {

    var renderer = ReactTestUtils.createRenderer();

    renderer.render( <MainbodyBox /> );
    var appElement = renderer.getRenderOutput();

    expect(appElement.props.className).toEqual("mainbodyBox");
	expect(appElement.props.children[0].props.children[0].type.displayName).toEqual("Menubar");
	expect(appElement.props.children[0].props.children[1].type.displayName).toEqual("Dateheader");
	expect(appElement.props.children[0].props.children[2].type.displayName).toEqual("Datebox");
	expect(appElement.props.children[1].type.displayName).toEqual("EventPanel");
});

it("renders Menubar component", function () {

    var renderer = ReactTestUtils.createRenderer();

    renderer.render( <Menubar dates={[0]}/> );
    var appElement = renderer.getRenderOutput();

    expect(appElement.props.className).toEqual("menubar");
	expect(appElement.props.children[0].props.className).toEqual("arrowBox");
	expect(appElement.props.children[1].props.className).toEqual("dateRange");
	expect(appElement.props.children[2].props.className).toEqual("timeZoneView");
	expect(appElement.props.children[3].props.className).toEqual("viewRange");
});

it("renders Dateheader component", function () {

    var renderer = ReactTestUtils.createRenderer();
    
    renderer.render( <Dateheader dates={[0]}/> );
    var appElement = renderer.getRenderOutput();

    expect(appElement.props.className).toEqual("headerWrapper");
	expect(appElement.props.children[0].props.className).toEqual("timeHeader");
});