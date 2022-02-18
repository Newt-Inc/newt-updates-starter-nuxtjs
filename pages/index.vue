<template>
  <Wrapper :app="app">
    <main class="Container">
      <Cover
        v-if="app && app.cover && app.cover.value"
        :img="app.cover.value"
      />
      <div class="Articles">
        <Dropdown :categories="categories" />
        <ArticleCard
          v-for="article in articles"
          :key="article._id"
          :article="article"
        />
        <Pagination :total="total" :current="1" />
      </div>
    </main>
  </Wrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSiteName } from 'utils/head'

export default {
  async asyncData({ $config, store }) {
    await store.dispatch('fetchApp', $config)
    await store.dispatch('fetchArticles', $config)
    await store.dispatch('fetchCategories', $config)
    return {}
  },
  head() {
    return {
      title: getSiteName(this.app),
    }
  },
  computed: {
    ...mapGetters(['app', 'articles', 'total', 'categories']),
  },
}
</script>

<style scoped>
.Articles {
  padding: 24px 24px 40px 24px;
  margin: 0 auto;
}
@media (min-width: 600px) {
  .Articles {
    padding: 60px;
    max-width: 700px;
  }
}
</style>
