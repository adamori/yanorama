<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { getFromStorage } from '../contentScript/utils'

const openInNewTab = ref(true)

onMounted(async () => {
  openInNewTab.value = <boolean>await getFromStorage('openInNewTab')
})

watch(openInNewTab, (value) => {
  chrome.storage.sync.set({ openInNewTab: value })
})
</script>

<template>
  <main>
    <h3>Yanorama Settings</h3>
    <div class="calc">
      <button @click="openInNewTab = !openInNewTab">
        {{ openInNewTab ? '✅' : '❌' }}
      </button>
      <label for="openInNewTab">Open in new tab</label>
    </div>
  </main>
</template>

<style>
:root {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;

  color-scheme: light dark;
  background-color: #242424;
}

@media (prefers-color-scheme: light) {
  :root {
    background-color: #fafafa;
  }

  a:hover {
    color: #ff4535;
  }
}

body {
  min-width: 20rem;
  color-scheme: light dark;
}

main {
  text-align: center;
  padding: 1em;
  margin: 0 auto;
}

h3 {
  color: #ff4535;
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: 200;
  line-height: 1.2rem;
  margin: 2rem auto;
}

.calc {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;

  > button {
    font-size: 1rem;
    padding: 1rem;
    border: 1px solid #ff4535;
    border-radius: 0.25rem;
    background-color: transparent;
    color: #ff4535;
    cursor: pointer;
    outline: none;
    margin: 0 auto;
  }

  > label {
    font-size: 1rem;
    margin: 0 1rem;
  }
}

a {
  font-size: 0.5rem;
  margin: 0.5rem;
  color: #cccccc;
  text-decoration: none;
}
</style>
