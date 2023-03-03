import SearchInput from "./components/SearchInput.js";
import Suggestion from "./components/Suggestion.js";
import SelectedLanguage from "./components/SelectedLanguage.js";

import get from "./core/api.js";
import store from "./core/store.js";

export default function App({ $root }) {
  this.state = {
    fetchedWords: [],
    selectedWords: [],
    currentWord: "",
  };

  this.init = () => {
    if (store.getlocalStorage() !== undefined) {
      console.log(store.getlocalStorage());
      this.setState(store.getlocalStorage());
    }
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };

    suggestion.setState({
      items: this.state.fetchedWords,
      currentWord: this.state.currentWord,
    });
    selectedLanguage.setState({ items: this.state.selectedWords });

    store.setlocalStorage(this.state);
  };

  const onInputChange = async (keyword) => {
    if (keyword !== "") {
      const words = await get(keyword);
      this.setState({ fetchedWords: words, currentWord: keyword });
      console.log(this.state);
    } else if (keyword === "") {
      this.setState({ fetchedWords: [] });
    }
  };

  const onSelect = async (word) => {
    const nextSelectedWords = [...this.state.selectedWords];
    const nextSeletedwordIndex = nextSelectedWords.findIndex(
      (item) => item === word
    );

    if (nextSeletedwordIndex > -1) {
      nextSelectedWords.splice(nextSeletedwordIndex, 1);
    }

    if (nextSelectedWords.length >= 5) {
      nextSelectedWords.shift();
    }

    nextSelectedWords.push(word);

    this.setState({ selectedWords: nextSelectedWords });
    alert(word);

    console.log(this.state);
  };

  const selectedLanguage = new SelectedLanguage({
    $root,
    initialState: { items: [] },
  });
  const seachInput = new SearchInput({
    $root,
    initialState: "",
    onInputChange,
  });
  const suggestion = new Suggestion({
    $root,
    initialState: { items: [], currentWord: "" },
    onSelect,
  });

  this.init();
}
