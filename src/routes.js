/*
Copyright 2020, Ingenia, S.A.
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

@author jfpastor@ingenia.es
*/
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
     {path: '', name:'s', component:listado},
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
