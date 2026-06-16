import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import router from "./router";
import i18n from "./i18n";

// Import PrimeVue components
import Card from "primevue/card";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import DatePicker from "primevue/datepicker";
import Message from "primevue/message";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import Checkbox from "primevue/checkbox";
import Select from "primevue/select";
import Menu from "primevue/menu";
import Timeline from "primevue/timeline";
import Slider from "primevue/slider";

// Import styles
import "primeicons/primeicons.css";
import Aura from "@primevue/themes/aura";
import { definePreset } from "@primevue/themes";

// Slightly darker emerald primary (emerald-600) for better contrast/visibility.
const AppPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        primary: {
          color: "{emerald.600}",
          contrastColor: "#ffffff",
          hoverColor: "{emerald.700}",
          activeColor: "{emerald.800}",
        },
      },
    },
  },
});

const app = createApp(App);

app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: AppPreset,
    options: {
      darkModeSelector: false,
    },
  },
});
app.use(router);
app.use(i18n);
app.use(ToastService);

// Register PrimeVue components
app.component("PrimeCard", Card);
app.component("PrimeButton", Button);
app.component("PrimeInputNumber", InputNumber);
app.component("PrimeDatePicker", DatePicker);
app.component("PrimeMessage", Message);
app.component("PrimeToast", Toast);
app.component("PrimeCheckbox", Checkbox);
app.component("PrimeSelect", Select);
app.component("PrimeMenu", Menu);
app.component("PrimeTimeline", Timeline);
app.component("PrimeSlider", Slider);

app.mount("#app");
