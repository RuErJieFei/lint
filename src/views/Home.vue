<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-sheet
        color="grey lighten-4"
        class="pa-4"
      >
        <v-avatar
          class="mb-4"
          color="grey darken-1"
          size="64"
        ></v-avatar>

        <div>john@vuetifyjs.com</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="[icon, text, route] in links"
          :key="icon"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
          <router-link :to="route"> >>>> </router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container
        class="py-8 px-6"
        fluid
      >
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    cards: ['Today', 'Yesterday'],
    drawer: null,
    links: [
      ['mdi-inbox-arrow-down', 'YY', 'yy'],
      ['mdi-send', 'JS', 'js'],
      ['mdi-delete', 'ZMW', 'zmw'],
      ['mdi-alert-octagon', 'HMM', 'hmm']
    ]
  })
}
</script>

<style scoped>

</style>
