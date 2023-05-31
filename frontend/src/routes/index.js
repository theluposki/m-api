import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Contacts from '../views/Contacts.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'

import List from '../views/Contacts/List.vue'
import FriendRequests from '../views/Contacts/FriendRequests.vue'
import Add from '../views/Contacts/Add.vue'
import Chat from '../views/Contacts/Chat.vue'

const routes = [
  { path: '/:pathMatch(.*)*', component: NotFound },
  { path: '/', component: Home },
  { 
    path: '/contacts', 
    component: Contacts,
    children: [
      {
        path: 'list',
        component: List,
      },
      {
        path: 'friend-requests',
        component: FriendRequests,
      },
      {
        path: 'add',
        component: Add,
      },
      {
        path: 'chat',
        component: Chat,
      },
    ],
  },
  { path: '/about', component: About },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
