import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableHighlight,
} from 'react-native';
import { ListView } from 'realm/react-native';
import Swipeout from '../../node_modules/react-native-swipeout/index.js';
import realm from '../realm';
import l_ from 'lodash';

export default class FavoritePokemon extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.favorites),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.ds.cloneWithRows(nextProps.favorites)
    })
  }

  _removeFavorite(favorite) {
    realm.write(() => {
      realm.delete(favorite);
    });
    this.setState({
      dataSource: this.ds.cloneWithRows(this.props.favorites),
    })
  }

  _renderSingleFavorite(favorite) {
    let swipeBtns = [{
      text: 'Remove',
      backgroundColor: 'red',
      underlayColor: 'white',
      onPress: () => { this._removeFavorite(favorite)}
    }]
    return(
      <View style={styles.listItem}>
        <Swipeout
          right={swipeBtns}
          autoClose='true'
          backgroundColor='transparent'
        >
          <TouchableHighlight underlayColor='#d1d1d1'>
            <Text style={styles.listItemText}>{l_.capitalize(favorite.name)}</Text>
          </TouchableHighlight>
        </Swipeout>
      </View>
    );
  }

  render() {
    return (
      <ListView
        style={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this._renderSingleFavorite.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    alignSelf: 'stretch',
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'yellow',
    borderStyle: 'solid',
    padding: 10,
    flexDirection: 'row',
    position: 'relative',
  },
  listItemText: {
    fontSize: 16,
  },
});
