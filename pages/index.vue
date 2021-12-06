<template>
  <main class="Container">
    <Cover img="https://as1.ftcdn.net/v2/jpg/03/45/18/76/1000_F_345187680_Eo4rKPDmdB6QTaGXFwU4NE5BaLlpGooL.jpg" />
    <div class="Articles">
      <Dropdown :categories="categories" />
      <div class="Inner">
        <ArticleCard v-for="article in articles" :key="article._id" :article="article" />
      </div>
      <Pagination :total="total" :current="1" />
    </div>
  </main>
</template>

<script>
import { getArticles } from 'api/article'
import { getCategories } from 'api/category'

export default {
  async asyncData(context) {
    const [resArticles, resCategories] = await Promise.all([
      getArticles(context.$config),
      getCategories(context.$config),
    ])
    return {
      articles: resArticles.articles,
      total: resArticles.total,
      categories: resCategories.categories,
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
.Inner {
  display: flex;
  flex-wrap: wrap;
}
@media (min-width: 600px) {
  .Articles {
    padding: 60px;
  }
}
@media (min-width: 960px) {
  .Articles {
    max-width: 1024px;
  }
}
</style>