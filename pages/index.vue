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
import { getArticles } from 'api/article'
import { getCategories } from 'api/category'
import { getApp } from 'api/app'

export default {
  async asyncData(context) {
    const [resArticles, resCategories, app] = await Promise.all([
      getArticles(context.$config),
      getCategories(context.$config),
      getApp(context.$config),
    ])
    return {
      articles: resArticles.articles,
      total: resArticles.total,
      categories: resCategories.categories,
      app,
    }
  },
  data() {
    return {}
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
