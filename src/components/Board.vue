<template>
  <div>
    <header>my Trello</header>
    <main>
      <p class="info-line">All: {{ totalCardCount }} tasks</p>
      <draggable :list="lists" @end="movingList" class="list-index">
        <!-- Listコンポーネントを呼び出し、Listコンポーネントに必要なデータを渡しています -->
        <list
          v-for="(item, index) in lists"
          :key="item.id"
          :title="item.title"
          :cards="item.cards"
          :listIndex="index"
          @change="movingCard"
        />
        <list-add />
      </draggable>
    </main>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import ListAdd from "./ListAdd.vue";
import List from "./List";
import { mapState } from "vuex";

export default {
  components: {
    draggable,
    ListAdd,
    List,
  },
  computed: {
    // ストア（store/index.js）のstateで定義されたデータの名前と同じ名前の文字列でstateを呼び出すことができる
    // computedにストアのstateからのデータと、ローカルでの算出データを両方定義する場合には、このように書く必要がある
    ...mapState(["lists"]),
    totalCardCount() {
      return this.$store.getters.totalCardCount;
    },
  },
  methods: {
    movingCard: function() {
      this.$store.dispatch("updateList", { lists: this.lists });
    },
    movingList: function() {
      this.$store.dispatch("updateList", { lists: this.lists });
    },
  },
};
</script>
