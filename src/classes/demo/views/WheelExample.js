// WheelExample.js

'use strict';

import React, {Component} from 'react';
import {View} from 'react-native';

import {NavigationPage, Theme, Wheel} from 'teaset';
import {Const} from "../../../common/storage/Const";

export default class WheelExample extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Wheel',
    showBackButton: true,
  };

  constructor(props) {
    super(props);
    this.years = [];
    this.hour = [];
    this.min = [];
    for (let i = 2000; i <= 2022; ++i) this.years.push(i);
    for (let i = 0; i <= 23; ++i) this.hour.push(i);
    for (let i = 0; i <= 59; ++i) this.min.push(i);
    this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.daysCount = [
      [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    ];
    Object.assign(this.state, {
      date: new Date(),
    });
  }

  isLeapYear(year) {
    return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
  }

  onDateChange(year, month, day,hour, min) {
    let {date} = this.state;
    date.setFullYear(year);

    let daysCount = this.daysCount[this.isLeapYear(year) ? 1 : 0][month];
    if (day > daysCount) {
      day = daysCount;
      date.setDate(day);
      date.setMonth(month);
    } else {
      date.setMonth(month);
      date.setDate(day);
    }

    date.setHours(hour);
    date.setMinutes(min);
    this.setState({date});
  }

  // onHourMinChange(hour, min) {
  //   let {date} = this.state;
  //   date.setHours(hour);
  //   date.setMinutes(min);
  //   this.setState({date});
  // }

  renderPage() {
    let {date} = this.state;
    let year = date.getFullYear(), month = date.getMonth(), day = date.getDate(), hour = date.getHours(), min = date.getMinutes();
    let daysCount = this.daysCount[this.isLeapYear(year) ? 1 : 0][month];
    let days = [];
    for (let i = 1; i <= daysCount; ++i) days.push(i);
    let scw = Const.screenWidth / 5;
    return (
      <View style={{flex: 1}}>
        <View style={{backgroundColor: Theme.defaultColor, padding: 20, flexDirection: 'row', justifyContent: 'center'}}>
          <Wheel
            style={{height: 200, width: scw}}
            itemStyle={{textAlign: 'center'}}
            items={this.years}
            index={this.years.indexOf(year)}
            onChange={index => this.onDateChange(this.years[index], month, day,hour,min)}
            />
          <Wheel
            style={{height: 200, width: scw}}
            itemStyle={{textAlign: 'center'}}
            items={this.months}
            index={this.months.indexOf(month + 1)}
            onChange={index => this.onDateChange(year, this.months[index] - 1, day,hour,min)}
            />
          <Wheel
            style={{height: 200, width: scw}}
            itemStyle={{textAlign: 'center'}}
            items={days}
            index={days.indexOf(day)}
            onChange={index => this.onDateChange(year, month, days[index],hour,min)}
            />
          <Wheel
            style={{height: 200, width: scw}}
            itemStyle={{textAlign: 'center'}}
            items={this.hour}
            index={hour}
            onChange={index => this.onDateChange(year, month,day,this.hour[index],min)}
            />
          <Wheel
            style={{height: 200, width: scw}}
            itemStyle={{textAlign: 'center'}}
            items={this.min}
            index={min}
            onChange={index => this.onDateChange(year, month,day,hour,this.min[index])}
            />
        </View>
      </View>
    );
  }

}
