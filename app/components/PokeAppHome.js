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

import Pokemon from '../containers/Pokemon';
import FavoritePokemon from '../containers/Favorite_Pokemon';
import realm from '../realm';
import * as Types from '../constants';



export default class PokeAppHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
      }),
      selectedTab: 'search'
    };
    this.favorites = realm.objects('Favorite');
  }

  componentWillMount() {
    this._loadTypes();
  }

  _loadTypes() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(Types.types)
    });
  }

  _renderSingleType(type) {
    return(
      <TouchableHighlight
        onPress={this._nextPage.bind(this, type)}
        underlayColor='#d1d1d1'
      >
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
      <FavoritePokemon favorites={this.favorites}/>
    );
  }


  render() {
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
