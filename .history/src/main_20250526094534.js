import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import router from "./router";
import Aura from "@primevue/themes/aura";

// Import PrimeVue components
import Card from "primevue/card";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Calendar from "primevue/calendar";
import Message from "primevue/message";
import Panel from "primevue/panel";
import Divider from "primevue/divider";
import Menubar from "primevue/menubar";

// Import PrimeVue styles
import "/node_modules/primeicons/primeicons.css";
import "primevue/resources/themes/aura/theme.css";
import "primevue/resources/primevue.min.css";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
  ripple: true,
});
app.use(router);

// Register PrimeVue components
app.component("PrimeCard", Card);
app.component("PrimeButton", Button);
app.component("PrimeInputText", InputText);
app.component("PrimeInputNumber", InputNumber);
app.component("PrimeCalendar", Calendar);
app.component("PrimeMessage", Message);
app.component("PrimePanel", Panel);
app.component("PrimeDivider", Divider);
app.component("PrimeMenuBar", Menubar);

app.mount("#app");
