import Realm from 'realm';

const Favorite = {
  name: 'Favorite',
  properties: {
    name: 'string',
    url: 'string'
  },
}

export default new Realm({ schema: [Favorite] });
