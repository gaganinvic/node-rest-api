import mongoose = require('mongoose');

export class NodeAPIDB {

  constructor(public uri: string) {
    //mongoose.Promise = global.Promise;
  }

  async connect() {
    console.log(`connecting to ${this.uri}`);
    try {
      if (!mongoose.connection.readyState) {
        await mongoose.connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
        console.log('Connected to DB');
      }
    } catch (e) {
      console.log('unable to connect to DB', e);
    }
  }
}
