# Fasttrack Code Test Frontend - Jason Sant
## Overview
The task was to build a quiz application which allows users to answer a set of questions and be able to post them to get their result as well as how they compare to previous results.

## Technologies Used
Vue.js - Nuxt.js
CSS Less
CSS Grid
Vuex
Axios

## How it works
Quiz questions are being fetched from an external API (http://opentdb.com) and are all in multiple choice format. The user is asked to choose an answer for each question.

Once submitted, the user will see his score (1 point per correct answer) and how many of the previous results he managed to beat. For this purpose, results are being saved in a Vuex store.

Demo: http://jasonsant-fasttrack.surge.sh/
