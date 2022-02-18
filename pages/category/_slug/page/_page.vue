<template>
  <Wrapper :app="app">
    <main class="Container">
      <Cover
        v-if="app && app.cover && app.cover.value"
        :img="app.cover.value"
      />
      <div class="Articles">
        <Dropdown :categories="categories" :selected="selected" />
        <ArticleCard
          v-for="article in articles"
          :key="article._id"
          :article="article"
        />
        <Pagination
          :total="total"
          :current="pageNumber"
          :base-path="`/category/${selected}`"
        />
      </div>
    </main>
  </Wrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSiteName } from 'utils/head'

export default {
  async asyncData({ $config, store, redirect, params }) {
    await store.dispatch('fetchApp', $config)
    await store.dispatch('fetchCategories', $config)

    const pageNumber = Number(params.page)
    if (Number.isNaN(pageNumber)) return redirect(302, '/')
    const category = store.getters.categories.find(
      (_category) => _category.slug === params.slug
    )
    await store.dispatch('fetchArticles', {
      ...$config,
      category: (category && category._id) || '',
      page: pageNumber,
    })

    return {
      selected: params.slug || '',
      pageNumber,
    }
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
