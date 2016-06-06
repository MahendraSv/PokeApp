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
    let url = 'https://pokeapi.co/api/v2/type/' + this.props.data.name;
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.pokemon),
          pokemons: responseData.pokemon
        })
      });
  }

  renderSinglePokemon(pokemon) {
    return(
      <TouchableHighlight onPress={this.nextPage.bind(this, pokemon)}>
        <View style={styles.container}>
          <View style={styles.listData}>
            <Text style={styles.type}>{pokemon.pokemon.name}</Text>
          </View>
        </View>
      </TouchableHighlight>
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
        <View><Text>Retrieving pokemon...</Text></View>  
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
    borderTopColor: '#445995',
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
  }
});


