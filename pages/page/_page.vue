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
        <Pagination :total="total" :current="pageNumber" />
      </div>
    </main>
  </Wrapper>
</template>

<script>
import { getArticles } from 'api/article'
import { getCategories } from 'api/category'
import { getApp } from 'api/app'
import { getSiteName } from 'utils/head'

export default {
  async asyncData({ $config, redirect, params }) {
    const pageNumber = Number(params.page)
    if (Number.isNaN(pageNumber)) return redirect(302, '/')

    const [resArticles, resCategories, app] = await Promise.all([
      getArticles($config, { page: pageNumber }),
      getCategories($config),
      getApp($config),
    ])
    return {
      pageNumber,
      articles: resArticles.articles,
      total: resArticles.total,
      categories: resCategories.categories,
      app,
    }
  },
  head() {
    return {
      title: getSiteName(this.app),
    }
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
