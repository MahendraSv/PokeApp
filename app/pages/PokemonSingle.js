import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableHighlight,
  ListView,
} from 'react-native';

export default class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: '',
    };
  }

  componentDidMount() {
    this.fetchPokemon();
  }

  fetchPokemon() {
    let url = 'http://pokeapi.co/api/v2/pokemon/'+ this.props.data;
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          pokemon: responseData,
        })
      });
  }

  render() {
    if (!this.state.pokemon.name) {
      return(
          <View style={styles.container}>
            <Text>Loading...</Text>
          </View>
      );
    }
    return(
        <View style={styles.container}>
          <Image 
            style={styles.sprite} 
            source={{ uri: this.state.pokemon.sprites.front_default }} 
          />
          <Text>{this.state.pokemon.name}</Text>
          <Text>{this.state.pokemon.height + 'ft'}</Text>
          <Text>{this.state.pokemon.weight + 'lb'}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sprite: {
    height: 100,
    width: 100,
  }
});
