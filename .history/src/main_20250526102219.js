import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import router from "./router";

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
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

// Import styles
import "primeicons/primeicons.css";
import Aura from "@primeuix/themes/aura";


const app = createApp(App);

app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
  },
});
app.use(router);
app.use(ToastService);

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
app.component("PrimeToast", Toast);

app.mount("#app");
