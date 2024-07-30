import { reactive } from 'vue';

export const useState = () => reactive({
  countries: [],
  ports: [],
  products: []
});