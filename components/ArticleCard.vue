<template>
  <article class="Article">
    <NuxtLink :to="`/article/${article.slug}`" class="Article_Link">
      <ul class="Article_Tags">
        <li
          v-for="category in article.categories"
          :key="category._id"
          :style="
            category.colorCode ? `background: ${category.colorCode};` : ``
          "
          class="Article_Tag"
        >
          <span v-if="category.emoji && category.emoji.value">{{
            category.emoji.value
          }}</span>
          <strong>{{ category.name }}</strong>
        </li>
      </ul>
      <h2 class="Article_Title">{{ article.title }}</h2>
      <div class="Article_Data">
        <div class="Article_Avatar">
          <template v-if="article.author && article.author.profileImage">
            <img
              :src="article.author.profileImage.src"
              alt=""
              width="32"
              height="32"
            />
          </template>
          <template v-else>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="#CCCCCC"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              />
            </svg>
          </template>
        </div>
        <div class="Article_AuthorName">{{ authorName }}</div>
        <time
          :datetime="formatDate(article._sys.createdAt).replace(/\//gm, '-')"
          class="Article_Date"
          >{{ formatDate(article._sys.createdAt) }}</time
        >
      </div>
    </NuxtLink>
  </article>
</template>

<script>
import { formatDate } from 'utils/date'

export default {
  props: {
    article: {
      type: Object,
      default: null,
    },
  },
  computed: {
    authorName() {
      return (this.article.author && this.article.author.fullName) || 'NO NAME'
    },
  },
  methods: {
    formatDate(dateStr) {
      return dateStr ? formatDate(dateStr) : ''
    },
  },
}
</script>

<style scoped>
.Article {
  border: 1px solid #e5e5e5;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin: 0 0 16px 0;
}
.Article_Link {
  display: block;
  padding: 16px;
  line-height: 1.5;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.2s;
  background: #fff;
}
.Article_Link:hover {
  background: #f8f8f8;
}
.Article_Link:active {
  background: none;
  transition: none;
}
.Article_Tags {
  margin: 0 0 8px 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}
.Article_Tag {
  height: 22px;
  border-radius: 11px;
  background: #f8f8f8;
  display: flex;
  align-items: center;
  padding: 0 8px;
  margin: 0 4px 4px 0;
}
.Article_Tag > span {
  font-size: 1.2rem;
  margin: 0 4px 0 0;
}
.Article_Tag > strong {
  font-size: 1.2rem;
}
.Article_Title {
  font-size: 1.4rem;
  margin: 0 0 12px 0;
  padding: 0;
}
.Article_Data {
  display: flex;
  align-items: center;
}
.Article_Avatar {
  width: 32px;
  height: 32px;
  border-radius: 16px;
  overflow: hidden;
  margin: 0 12px 0 0;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
}
.Article_Avatar img {
  width: 32px;
  height: 32px;
  object-fit: cover;
  font-family: 'object-fit: cover'; /* IE11 */
}
.Article_AuthorName {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 8px 0 0;
}
.Article_Date {
  font-size: 1.2rem;
  color: #888;
}
</style>
