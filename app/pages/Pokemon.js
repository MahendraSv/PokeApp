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

import Swipeout from '../../node_modules/react-native-swipeout/index.js';
import realm from '../realm';
import PokemonSingle from './PokemonSingle';

export default class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
      }),
      pokemons: null,
    }
  }

  componentDidMount() {
    this.fetchPokemons();
  }

  fetchPokemons() {
    let url = `https://pokeapi.co/api/v2/type/${this.props.data.name}?limit=5&offset=5`;
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        const pokemonArray = responseData.pokemon.slice(0,10);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(pokemonArray),
          pokemons: pokemonArray
        })
      });
  }

  _addFavorite(pokemon) {
    console.log('In add favorite function with: ', pokemon);
    realm.write(() => {
      realm.create('Favorite', {
        name: pokemon.pokemon.name,
        url: pokemon.pokemon.url
      });
    });
  }

  renderSinglePokemon(pokemon) {
    let swipeBtns = [{
      text: 'Favorite',
      backgroundColor: '#ffd700',
      underlayColor: '#ffe14f',
      onPress: () => {
        console.log('Favorite pressed');
        this._addFavorite(pokemon);
        console.log('Favorite added');
      }
    }]
    return(
      <Swipeout
        right={swipeBtns}
        autoClose='true'
        backgroundColor='transparent'
      >
        <TouchableHighlight
          onPress={this.nextPage.bind(this, pokemon)}
          underlayColor='grey'
        >
          <View style={styles.container}>
            <View style={styles.listData}>
              <Text style={styles.type}>{pokemon.pokemon.name}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeout>
    );
  }

  nextPage(pokemon) {
    this.props.toRoute({
      name: pokemon.pokemon.name,
      component: PokemonSingle,
      data: pokemon.pokemon.name,
      sceneConfig: Navigator.SceneConfigs.VerticalUpSwipeJump,
    });
  }

  render() {
    if (!this.state.pokemons) {
      return(
        <View style={styles.loading}>
          <Text>Retrieving pokemon...</Text>
        </View>
      );
    }
    return(
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderSinglePokemon.bind(this)}
      />
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderTopColor: '#FFCB00',
    borderTopWidth: 1
  },
  listData: {
    margin: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokemon: {
    fontSize: 20,
  },
  type: {
    fontFamily: 'Apple SD Gothic Neo',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
