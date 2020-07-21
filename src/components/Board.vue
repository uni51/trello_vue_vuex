<template>
  <div>
    <header>my Trello</header>
    <main>
      <p class="info-line">All: 0 tasks</p>
      <div class="list-index">
        <!-- Listコンポーネントを呼び出し、Listコンポーネントに必要なデータを渡しています -->
        <list v-for="(item, index) in lists" :key="item.id" :title="item.title" :listIndex="index" />
        <list-add />
      </div>
    </main>
  </div>
</template>

<script>
import ListAdd from "./ListAdd.vue";
import List from "./List";
import { mapState } from "vuex";

export default {
  components: {
    ListAdd,
    List
  },
  computed: {
    // ストア（store/index.js）のstateで定義されたデータの名前と同じ名前の文字列でstateを呼び出すことができる
    // computedにストアのstateからのデータと、ローカルでの算出データを両方定義する場合には、このように書く必要がある
    ...mapState(["lists"])
  }
};
</script>