<template>
<div>
<button @click="insertApi('newArgumentApi')">点点我</button>
</div>  
</template>
<script setup lang="ts">

import request from '@/utils/request'
import {insertApiParams} from '@/types/api/manageApi'
import {insertApiFunc} from '@/api/manageApi'
import { toRefs,reactive } from 'vue'
const state = reactive({
  api:{ 
    apiName: 'newApi',
    apiType: 'normal' ,
    apiUrl: 'https://api.example.com' ,
    method: 'get' ,
    params: 'data:{ name: string, age: number }' ,
    headers: '' ,
    body: ''
  }
})
const {api} = toRefs(state);
methods: {
  insertApi
}
function insertApi(name: string) {

  const { apiName, apiType, apiUrl, method, params, headers, body } = api.value
  const data = {
    apiName : name,
    apiType,
    apiUrl,
    method,
    params,
    headers,
    body
  }
  insertApiFunc(data).then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
}

</script>
