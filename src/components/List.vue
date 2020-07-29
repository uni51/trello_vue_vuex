<template>
  <div class="list">
    <div class="listheader">
      <p class="list-title">{{ title }}</p>
      <p class="list-counter">total: {{ totalCardInlist }}</p>
      <div class="deletelist" @click="removeList">×</div>
    </div>
    <card
      v-for="(item, index) in cards"
      :body="item.body"
      :key="item.id"
      :cardIndex="index"
      :listIndex="listIndex"
    />
    <card-add :listIndex="listIndex" />
  </div>
</template>

<script>
import CardAdd from "./CardAdd";
import Card from "./Card";

export default {
  components: {
    CardAdd,
    Card,
  },
  // propsには、親コンポーネントから受け取るデータを定義できる
  // propsでデータを受け取る時は、型などの条件を指定できる
  props: {
    title: {
      type: String,
      required: true,
    },
    cards: {
      type: Array,
      required: true,
    },
    listIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalCardInlist() {
      return this.cards.length;
    },
  },
  methods: {
    removeList: function () {
      if (confirm("本当にこのリストを削除しますか？")) {
        this.$store.dispatch("removelist", { listIndex: this.listIndex });
      }
    },
  },
};
</script>