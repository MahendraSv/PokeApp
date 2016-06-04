import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import rn from 'random-number';

let requestInfoUrl = 'http://pokeapi.co/api/v2/pokemon/';
let requestPicUrl = 'http://pokeapi.co/api/v2/pokemon-form/';

let id = null;

const rnOptions = {
  min: 1,
  max: 721,
  integer: true
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: '',
      pic: '',
    };
  }

  componentDidMount() {
    this.fetchInfo();
    this.fetchPicture();
  }

  generateRandomNumber() {
    return rn(rnOptions);
  }

  fetchInfo() {
    id = this.generateRandomNumber();
    fetch(requestInfoUrl + id)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          info: responseData,
        })
      });
  }

  fetchPicture() {
    fetch(requestPicUrl + id)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          pic: responseData.sprites.front_default,
        });
      });
  }

  render() {
    if (!this.state.info && !this.state.pic) {
      return (
        <View style={styles.container}>
          <Text>Welcome to PokeApp!</Text>
          <Text>Everytime you open this app a new pokemon will show up</Text>
          <View>
            <Text style={styles.loading}>Loading...</Text>
          </View>
        </View>
      )
    } else {
      return(
        <View style={styles.container}>
          <Text>Welcome to PokeApp!</Text>
          <Text>Everytime you open this app a new pokemon will show up</Text>
          <Image
            style={styles.pic}
            source={{uri: this.state.pic}}
          />
          <View style={styles.info}>
            <Text>Name: {this.state.info.name}</Text>
            <Text>Height: {this.state.info.height + 'ft'}</Text>
            <Text>Weight: {this.state.info.weight + 'lbs'}</Text>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  pic: {
    height: 200,
    width: 200,
    flex: 1,
  },
  loading: {
    flex: 1,
  }
});
