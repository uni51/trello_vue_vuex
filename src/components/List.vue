<template>
  <div class="list">
    <div class="listheader">
      <p class="list-title">{{ title }}</p>
      <div class="deletelist" v-on:click="removeList">×</div>
    </div>
    <card-add v-bind:listIndex="listIndex" />
  </div>
</template>

<script>
import CardAdd from "./CardAdd";

export default {
  components: {
    CardAdd
  },
  // propsには、親コンポーネントから受け取るデータを定義できる
  // propsでデータを受け取る時は、型などの条件を指定できる
  props: {
    title: {
      type: String,
      required: true
    },
    listIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    removeList: function() {
      if (confirm("本当にこのリストを削除しますか？")) {
        this.$store.dispatch("removelist", { listIndex: this.listIndex });
      }
    }
  }
};
</script>