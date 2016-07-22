import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Router from 'react-native-simple-router';
import PokeAppHome from './app/components/PokeAppHome';

const HOME = {
  name: 'PokeApp',
  component: PokeAppHome,
};

class PokeApp extends Component {
  render() {
    return (
        <Router
          firstRoute={HOME}
          headerStyle={styles.header}
          titleStyle={styles.headerText}
        />
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFCB00'
  },
  headerText: {
    color: '#266CC1'
  }
});
AppRegistry.registerComponent('PokeApp', () => PokeApp);
