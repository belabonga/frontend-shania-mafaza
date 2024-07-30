import { defineStore } from 'pinia';
import { toRefs } from 'vue';
import { useState } from './state';
import { useActions } from './actions';

export const useStore = defineStore('store', () => {
  const state = useState();
  const actions = useActions(state);
  
  return {
    ...toRefs(state),
    ...actions,
  };
});