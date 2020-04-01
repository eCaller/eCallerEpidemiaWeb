import home from './components/home.vue';
import main from './components/main.vue';
import {store} from './store/store.js';

import listado from './components/listado/listado.vue'

import triage from './components/triage/triage.vue'
import sie from './components/sie/sie.vue'
import caso from './components/caso/caso.vue'

export const routes = [
  {path: '/', component: home, name:"home"},
  {path: '/main', component: main, children: [
     {path: '', name:'sie', component:sie},
     {path: 'listado', name:'listado', component:listado},
     {path: 'triage', name:'triage', component:triage},
     {path: 'sie', name:'sie', component:sie},
     {path: 'caso/:id', name:'caso', component:caso},
   ],
    beforeEnter: (to, from, next) => {
      //console.log("Se puede navegar?: " + store.state.isLoggedIn);
      if (store.state.isLoggedIn) {
        next();
      } else {
        next('/');
      }
    }
  },
  //{path: '/prueba', component: home, name:"prueba"},

  {path: '*', component: home}
];
