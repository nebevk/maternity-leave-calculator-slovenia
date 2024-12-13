import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import router from "./router";
import Aura from "@primevue/themes/aura";

// Import PrimeVue components
import Card from "primevue/card";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Menubar from "primevue/menubar";

import "/node_modules/primeicons/primeicons.css";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(router);

// Register PrimeVue components
app.component("SimpleCard", Card);
app.component("SimpleButton", Button);
app.component("InputText", InputText);
app.component("MenuBar", Menubar);

app.mount("#app");
