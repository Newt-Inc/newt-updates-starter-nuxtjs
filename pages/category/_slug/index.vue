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
          :current="1"
          :base-path="`/category/${selected}`"
        />
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
  async asyncData({ $config, params }) {
    const { categories } = await getCategories($config)
    const category = categories.find(
      (_category) => _category.slug === params.slug
    )
    const { articles, total } = await getArticles($config, {
      category: (category && category._id) || '',
    })
    const app = await getApp($config)

    return {
      articles,
      total,
      categories,
      selected: params.slug || '',
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
