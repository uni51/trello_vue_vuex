import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const savedLists = localStorage.getItem("trello-lists");

const store = new Vuex.Store({
  state: {
    // localStorageに保存されたリストがあれば取得、なければデフォルトのリスト配列を設置する
    // localStorageにはJSON形式の文字列型でデータが保存されているので、
    // 取得するときにはJSON.parse(取得するデータ)でオブジェクトに変換する必要があ
    lists: savedLists
      ? JSON.parse(savedLists)
      : [
          {
            title: "Backlog",
            cards: [{ body: "English" }, { body: "Mathematics" }],
          },
          {
            title: "Todo",
            cards: [{ body: "Science" }],
          },
          {
            title: "Doing",
            cards: [],
          },
        ],
  },
  mutations: {
    // mutationsはあくまでもストアの状態の変更だけを行う
    // mutationsの重要なルールとして、同期的でなければならないというのがある
    addlist(state, payload) {
      state.lists.push({ title: payload.title, cards: [] });
    },
    removelist(state, payload) {
      // 配列の要素を1つ削除する
      state.lists.splice(payload.listIndex, 1);
    },
    addCardToList(state, payload) {
      state.lists[payload.listIndex].cards.push({ body: payload.body });
    },
    removeCardFromList(state, payload) {
      state.lists[payload.listIndex].cards.splice(payload.cardIndex, 1);
    },
    updateList(state, payload) {
      state.lists = payload.lists;
    },
  },
  actions: {
    // mutationsの呼び出しはactionsが行う
    // 第一引数にcontextというストアインスタンスのメソッドやプロパティを呼び出せるオブジェクトを受け取ることができる
    addlist(context, payload) {
      context.commit("addlist", payload);
    },
    removelist(context, payload) {
      context.commit("removelist", payload);
    },
    addCardToList(context, payload) {
      context.commit("addCardToList", payload);
    },
    removeCardFromList(context, payload) {
      context.commit("removeCardFromList", payload);
    },
    updateList(context, payload) {
      context.commit("updateList", payload);
    },
  },
  getters: {
    totalCardCount(state) {
      let count = 0;
      state.lists.map((content) => (count += content.cards.length));
      return count;
    },
  },
});

// データの状態を更新後にlocalStorageへデータの状態を保存する
// subscribeはストアのインスタンスメソッドで、全てのmutationの後に呼ばれる
store.subscribe((mutation, state) => {
  // 保存するときは任意のキーを設定して、データをJSON形式（文字列型）に変換して保存する
  localStorage.setItem("trello-lists", JSON.stringify(state.lists));
});

export default store;
