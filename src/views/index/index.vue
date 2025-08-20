<template>
  <div>
    {{ $t('article.article.title') }}
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted() {
    this.test();
  },
  methods: {
    test() {
      this.$message('success');
    }
  },
}
</script>

<style>

</style>