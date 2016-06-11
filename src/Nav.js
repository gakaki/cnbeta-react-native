'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';



import ArticleList from "./ArticleList";

export default class Nav extends Component {
  render() {
    return (
      <Navigator
        initialRoute ={{ name: 'index', component: ArticleList }}
        // configureScene={(route) => {
        //   return Navigator.SceneConfigs.VerticalUpSwipeJump;
        // } }
        renderScene={(route, navigator) => {
          let Component = route.component;
          return <Component {...route.params} navigator={navigator}  />
        } }

        />
    );
  }
}
