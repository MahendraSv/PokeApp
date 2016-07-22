import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableHighlight,
  ListView,
  ScrollView,
} from 'react-native';
import {
  Button
} from 'native-base';
import l_ from 'lodash';

export default class PokemonSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
      }),
      games: '',
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
        this.setState({
          pokemon: responseData,
          dataSource: this.state.dataSource.cloneWithRows(responseData.game_indices)
        })
      });
  }

  renderGame(game) {
    return(
      <TouchableHighlight>
        <View style={styles.container}>
          <View style={styles.listData}>
            <Text style={styles.text}> {l_.capitalize(game.version.name)}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
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
      <View>
        <View style={styles.spriteContainer}>
          <Image
            style={styles.sprite}
            source={{ uri: this.state.pokemon.sprites.front_default }}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.text}>{'Height: ' + this.state.pokemon.height + 'ft'}</Text>
          <Text style={styles.text}>{'Weight: ' + this.state.pokemon.weight + 'lbs'}</Text>
          <Text style={styles.gamesAppearedTitle}>Games Appeared In</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderGame.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gamesAppearedTitle: {
    fontFamily: 'Apple SD Gothic Neo',
    marginTop: 10
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  spriteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sprite: {
    height: 120,
    width: 120,
  },
  text: {
    fontFamily: 'Apple SD Gothic Neo',
  },
  gamesList: {
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  }
});
