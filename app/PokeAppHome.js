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

import Pokemon from './pages/Pokemon';
import rn from 'random-number';
let requestTypesUrl = 'http://pokeapi.co/api/v2/type/';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2 
      }),
      types: null,
    };
  }

  componentDidMount() {
    this.fetchTypes();
  }

  fetchTypes() {
    fetch(requestTypesUrl)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.results),
          types: responseData.results,
        })
      });
  }

  renderSingleType(type) {
    return(
      <TouchableHighlight onPress={this.nextPage.bind(this, type)}>
        <View style={styles.container}>
          <View style={styles.listData}>
            <Text style={styles.type}>{type.name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  nextPage(type) {
    this.props.toRoute({
      name: type.name,
      component: Pokemon,
      data: type,
      sceneConfig: Navigator.SceneConfigs.VerticalUpSwipeJump,
    });
  }


  render() {
    if (!this.state.types) {
      return(
        <View><Text>Retrieving types...</Text></View>  
      );
    } 

    return(
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderSingleType.bind(this)}
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
  type: {
    fontSize: 20,
    fontFamily: 'Apple SD Gothic Neo',
  }
});
