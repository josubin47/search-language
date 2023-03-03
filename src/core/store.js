const store = {
  setlocalStorage(state) {
    localStorage.setItem("state", JSON.stringify(state));
  },
  getlocalStorage() {
    return JSON.parse(localStorage.getItem("state"));
  },
};

export default store;
