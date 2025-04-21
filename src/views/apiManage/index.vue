<template>
    <el-container class="layout-container-demo" style="height:920px; width: auto;">
      <el-aside width="200px">
        <el-scrollbar>
          <el-menu :default-openeds="[]">
            <!-- 遍历 documents 数组 -->
    <template v-for="document in documents" :key="document.id">
      <el-sub-menu :index="document.id.toString()">
        <template #title>
          <el-icon><icon-menu /></el-icon>
          {{ document.name }} <!-- 显示当前 document 的 name -->
        </template>

         <!-- 这里可以放置子菜单内容 -->
        <el-sub-menu :index="document.id.toString()+'-1'">
          
          <template #title> <el-icon><Avatar /></el-icon>智能体</template>
          <template v-for="documentMethod in document.agentMethod" :key="documentMethod.url">
            <el-menu-item :index="documentMethod.url">{{ documentMethod.name }}</el-menu-item>
          </template>
        </el-sub-menu>
        <el-sub-menu :index="document.id.toString()+'-2'">
          <template #title> <el-icon><Location /></el-icon>API</template>
          <template v-for="documentMethod in document.apiMethod" :key="documentMethod.url">
            <el-menu-item :index="documentMethod.url">{{ documentMethod.name }}</el-menu-item>
          </template>
              </el-sub-menu>
              <el-sub-menu :index="document.id.toString()+'-3'">
          <template #title><el-icon><StarFilled /></el-icon>自定义标签</template>
          <template v-for="documentMethod in document.designMethod" :key="documentMethod.url">
            <el-menu-item :index="documentMethod.url">{{ documentMethod.name }}</el-menu-item>
          </template>
              </el-sub-menu>

       
      </el-sub-menu>
    </template>
            
          </el-menu>
        </el-scrollbar>
      </el-aside>
  
      <el-container>
        <el-header style="text-align: right; font-size: 12px ;width:1712px">
          <div class="toolbar">
            <el-dropdown>
              <el-icon style="margin-right: 8px; margin-top: 1px">
                <setting />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>View</el-dropdown-item>
                  <el-dropdown-item>Add</el-dropdown-item>
                  <el-dropdown-item>Delete</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            
            <el-button @click="addApi()">新增标签</el-button>
          </div>
        </el-header>
  
        <el-main style="width:1712px">
          <el-scrollbar>
            <el-table :data="apiData" >
              <el-table-column prop="apiName" label="标签名称" width="auto" />
              <el-table-column prop="apiType" label="标签类型" width="auto" />
              <el-table-column prop="updateTime" label="更新时间" width="auto" />
              <el-table-column label="操作">
                <template #default="scope">
                      <el-button 
                        type="text" 
                        @click="editApi(scope.row.apiId)"
                      >
                        查看&编辑
                      </el-button>
                      </template>
                </el-table-column>
            </el-table>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
  
  const item = {
    date: '2016-05-02',
    name: 'Amie',
    address: 'No. 189, Grove St, Los Angeles',
    
  }

  const document = {
    id:'21314423555',
    name: '文档名称1',
    type: '文档类型1',
    createTime: '2023-10-01 12:00:00',
    agentMethod:[],
    apiMethod:[],
    designMethod:[],
    methods:[
      { 
        name: '接口1',
        url: 'https://api.example.com/endpoint1',
        method: 'GET',
        type: 'api',
        outArgs:[]
      },
      {
        name: '智能体2',
        url: 'https://api.example.com/endpoint2',
        method: 'POST',
        type: 'agent',
        outArgs:[]
      },
      {
        name: '接口3',
        url: 'https://api.example.com/endpoint3',
        method: 'PUT',
        type: 'api',
        outArgs:[]
      },
      {
        name: '智能体4',
        url: 'https://api.example.com/endpoint4',
        method: 'DELETE',
        type: 'agent',
        outArgs:[]
      },
      {
        name: '接口5',
        url: 'https://api.example.com/endpoint5',
        method: 'PATCH',
        type: 'api',
        outArgs:[]
      },
      {
        name: '智能体6',
        url: 'https://api.example.com/endpoint6',
        method: 'OPTIONS',
        type: 'agent',
        outArgs:[]
      },
      {
        name: '自定义接口7',
        url: 'https://api.example.com/endpoint7',
        method: 'HEAD',
        type: 'design',
        outArgs:[]
      },
    ]
  }
  const tempDocId = ''
  const documents= []
  /*
  function getDocuments() {
    //数据赋值
    documents = req.data.data;
    //遍历 documents 数组
    documents.forEach((item) => {
      //调用 queryApisByDocumentId 函数获取当前文档下接口数据
      queryApisByDocumentId(item.id).then((res:any) => {
        item.methods = res.data.data;
        item.methods.forEach((method) => {
          if (method.type === 'agent') {
            document.agentMethod.push(method);
          } else if (method.type === 'api') {
            document.apiMethod.push(method);
          } else if (method.type === 'design') {
            document.designMethod.push(method);
          }
        });
      });
    })
  }
    */
  //假数据创建
  for(let i = 0; i < 4; i++) {
      const doc = { ...document }
      doc.id = ''+i + 1
      doc.name = '文档名称' + (i + 1)
      doc.agentMethod = []
      doc.apiMethod = []
      doc.designMethod = []
      doc.methods.forEach((method) => {
        if (method.type === 'agent') {
          doc.agentMethod.push(method);
        } else if (method.type === 'api') {
          doc.apiMethod.push(method);
        } else if (method.type === 'design') {
          doc.designMethod.push(method);
        }
      });
      documents.push(doc)
      console.log(doc)
  }
  
  const apiType = {
    apiId:'ouiqwheoandsk',
    apiName:'接口名称1',
    apiUrl:'https://api.example.com/endpoint1',
    apiMethod:'GET',
    apiType:'api',
    apiOutArgs:[],
    apiInArgs:[],
    updateTime:'2023-10-01 12:00:00',
    createTime:'2023-10-01 12:00:00',
  }
  const apiData = [
    {
      apiId:'ouiqwheoandsk2',
      apiName:'接口名称1',
      apiUrl:'https://api.example.com/endpoint1',
      apiMethod:'GET',
      apiType:'api',
      apiOutArgs:[],
      apiInArgs:[],
      updateTime:'2023-10-01 12:00:00',
      createTime:'2023-10-01 12:00:00',
    },
    {
      apiId:'ouiqwheoandsk3',
      apiName:'接口名称2',
      apiUrl:'https://api.example.com/endpoint2',
      apiMethod:'POST',
      apiType:'agent',
      apiOutArgs:[],
      apiInArgs:[],
      updateTime:'2023-10-01 12:00:00',
      createTime:'2023-10-01 12:00:00',
    },
    {
      apiId:'ouiqwheoandsk4',
      apiName:'接口名称3',
      apiUrl:'https://api.example.com/endpoint3',
      apiMethod:'PUT',
      apiType:'api',
      apiOutArgs:[],
      apiInArgs:[],
      updateTime:'2023-10-01 12:00:00',
      createTime:'2023-10-01 12:00:00',
    },
  ]
  

    //todo:tableData数据获取接口调用
  const tableData = ref(Array.from({ length: 20 }).fill(apiType))
  function editApi(params:string) {
    console.log('editApiId', params)  
  }
  function addApi() {
    console.log('addApi')  
  }
  </script>
  
  <style scoped>
  .layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
  }
  .layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
  }
  .layout-container-demo .el-menu {
    border-right: none;
  }
  .layout-container-demo .el-main {
    padding: 0;
  }
  .layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
  }
  </style>
  