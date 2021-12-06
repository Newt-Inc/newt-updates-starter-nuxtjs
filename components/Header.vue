<template>
  <header class="Header">
    <NuxtLink to="/" class="Title">
      <span v-if="icon" class="Title_Icon">{{icon}}</span>
      <h1 v-if="isHome" class="Title_Text">{{title}}</h1>
      <div v-else class="Title_Text">{{title}}</div>
    </NuxtLink>
    <div class="Search">
      <button type="button" class="Search_Button" @click="focusInput">
        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M9.3890873 1.6109127c1.81744 1.81743998 2.0970461 4.59036739.8388184 6.7018035l3.3116969 3.3126728c.3547755.3547755.3257954.9589604-.0647289 1.3494847-.3626297.3626297-.9094871.4135198-1.2698126.1348865l-.0796721-.0701576-3.22015474-3.21985629C6.7465078 11.5258295 3.60410194 11.3822765 1.6109127 9.3890873c-2.1478836-2.14788361-2.1478836-5.63029099 0-7.7781746 2.14788361-2.1478836 5.63029099-2.1478836 7.7781746 0zM2.95984943 2.95984943c-1.40288642 1.40288642-1.40288642 3.67741472 0 5.08030114 1.40288642 1.40288642 3.67741472 1.40288642 5.08030114 0 1.40288642-1.40288642 1.40288642-3.67741472 0-5.08030114-1.40288642-1.40288642-3.67741472-1.40288642-5.08030114 0z" fill="#333" fill-rule="nonzero" /></svg>
      </button>
      <form action="/search">
        <div class="Search_Input">
          <input
            ref="target"
            v-model="searchText"
            name="q"
            type="search"
            placeholder="Search"
          />
        </div>
      </form>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Blog'
    },
    icon: {
      type: String,
      default: ''
    },
    isHome: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      searchText: this.$route.query.q || ''
    }
  },
  methods: {
    focusInput() {
      this.$refs.target.focus();
    }
  }
}
</script>

<style scoped>
.Header {
  display: flex;
  background: #fff;
  padding: 8px;
  position: sticky;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 10;
  min-width: 0;
  flex-shrink: 0;
  box-shadow: 0 0 0 1px rgba(0,0,0,.1);
}
.Title {
  display: flex;
  margin: 0 auto 0 0;
  align-items: center;
  min-width: 0;
  color: #333;
  text-decoration: none;
}
.Title_Icon {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 6px 0 0;
  font-size: 1.8rem;
  flex-shrink: 0;
}
.Title_Icon img {
  width: 26px;
  height: 26px;
  object-fit: cover;
  font-family: 'object-fit: cover'; /* IE11 */
  border-radius: 4px;
}
.Title_Button {
  width: 34px;
  height: 34px;
  margin: 0 6px 0 0;
  transition: background .2s;
  border-radius: 4px;
  position: relative;
  background: none;
  flex-shrink: 0;
}
.Title_Button:hover {
  background: #F0F0F0;
}
.Title_Button:active {
  background: none;
  transition: none;
}
 .Title_Button > svg {
  position: absolute;
  left: 13px;
  top: 11px;
}
.Title_Text {
  margin: 0;
  padding: 0;
  font-size: 1.6rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.Search {
  display: flex;
  flex-shrink: 0;
}
.Search_Input input {
  font-size: 1.6rem;
  appearance: none;
  border: none;
  height: 34px;
  padding: 0 12px;
  border-radius: 4px;
  opacity: 0;
  position: absolute;
  right: 8px;
  top: 8px;
  pointer-events: none;
}
.Search_Input input:focus {
  opacity: 1;
  pointer-events: inherit;
}
.Search_Button {
  height: 34px;
  width: 34px;
  border: none;
  background: none;
  border-radius: 4px;
  transition: background .2s;
  cursor: pointer;
  position: relative;
  z-index: 0;
}
.Search_Button:hover {
  background: #F0F0F0;
}
.Search_Button:active {
  background: none;
  transition: none;
}
.Search_Button > svg {
  position: absolute;
  left: 10px;
  top: 10px;
}
</style>