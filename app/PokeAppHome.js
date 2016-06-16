import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableHighlight,
  ListView,
  TabBarIOS
} from 'react-native';

import Pokemon from './pages/Pokemon';
import rn from 'random-number';
let requestTypesUrl = 'http://pokeapi.co/api/v2/type/';

export default class PokeAppHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
      }),
      types: null,
      selectedTab: 'search'
    };
  }

  componentDidMount() {
    this._fetchTypes();
  }

  _fetchTypes() {
    fetch(requestTypesUrl)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.results),
          types: responseData.results,
        })
      });
  }

  _renderSingleType(type) {
    return(
      <TouchableHighlight onPress={this._nextPage.bind(this, type)}>
        <View style={styles.container}>
          <View style={styles.listData}>
            <Text style={styles.type}>{type.name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _nextPage(type) {
    this.props.toRoute({
      name: type.name,
      component: Pokemon,
      data: type,
      sceneConfig: Navigator.SceneConfigs.VerticalUpSwipeJump,
    });
  }

  _renderFirstView() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderSingleType.bind(this)}
      />
    );
  }

  _renderSecondView() {
    return(
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutMessage}>This is the about page</Text>
      </View>
    );
  }


  render() {
    if (!this.state.types) {
      return(
        <View style={styles.loading}>
          <Text>Loading...</Text>
        </View>
      );
    }

    return(
      <TabBarIOS
        barTintColor='#FFCB00'
        tintColor='#266CC1'
        unselectedTintColor='#266CC1'
      >
        <TabBarIOS.Item
          title="Pokemon Types"
          systemIcon="search"
          selected={this.state.selectedTab === 'search'}
          onPress={() => {
            this.setState({
              selectedTab: 'search'
            })
          }}
        >
          {this._renderFirstView()}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="About PokeApp"
          systemIcon="featured"
          selected={this.state.selectedTab === 'featured'}
          onPress={() => {
            this.setState({
              selectedTab: 'featured'
            })
          }}
        >
          {this._renderSecondView()}
        </TabBarIOS.Item>
      </TabBarIOS>

    );
  }
}

const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    alignItems: 'center'
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
  },
  type: {
    fontSize: 20,
    fontFamily: 'Apple SD Gothic Neo',
  },
  aboutContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  aboutMessage: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
