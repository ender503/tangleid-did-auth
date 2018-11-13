class RequestStore {
  constructor() {
    this.requests = {};
  }

  hasRequest(token) {
    return (token in this.requests);
  }

  addSocketID(socketID) {
    const timestamp = Math.floor(Date.now() / 1000);
    requests[timestamp] = socketID;
  }

  getSocketID(token) {
    return this.requests[token];
  }

  getToken(id) {
    return Object.keys(this.requests).find(key => requests[key] === id);
  }

  getRequests() {
    return this.requests;
  }

  removeRequest(token) {
    delete requests[token];
  }
}

module.exports = RequestStore;
