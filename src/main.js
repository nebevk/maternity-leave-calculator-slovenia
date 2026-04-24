import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import router from "./router";
import i18n from "./i18n";

// Import PrimeVue components
import Card from "primevue/card";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import DatePicker from "primevue/datepicker";
import Message from "primevue/message";
import Panel from "primevue/panel";
import Divider from "primevue/divider";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import Checkbox from "primevue/checkbox";
import Tag from "primevue/tag";
import Select from "primevue/select";
import Fieldset from "primevue/fieldset";
import IftaLabel from "primevue/iftalabel";
import Timeline from "primevue/timeline";
import Slider from "primevue/slider";

// Import styles
import "primeicons/primeicons.css";
import Aura from "@primevue/themes/aura";

const app = createApp(App);

app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
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
app.component("PrimeInputText", InputText);
app.component("PrimeInputNumber", InputNumber);
app.component("PrimeDatePicker", DatePicker);
app.component("PrimeMessage", Message);
app.component("PrimePanel", Panel);
app.component("PrimeDivider", Divider);
app.component("PrimeToast", Toast);
app.component("PrimeCheckbox", Checkbox);
app.component("PrimeTag", Tag);
app.component("PrimeSelect", Select);
app.component("PrimeFieldset", Fieldset);
app.component("PrimeIftaLabel", IftaLabel);
app.component("PrimeTimeline", Timeline);
app.component("PrimeSlider", Slider);

app.mount("#app");
