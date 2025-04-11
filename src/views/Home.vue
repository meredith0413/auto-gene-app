<template>
    <div class="home-container">
      <!-- 顶部导航栏 -->
      <el-header class="header">
        <el-menu
          mode="horizontal"
          :default-active="activeMenu"
          @select="handleMenuSelect"
        >
          <el-menu-item index="dashboard">控制台</el-menu-item>
          <el-menu-item index="analysis">数据分析</el-menu-item>
          <el-sub-menu index="more">
            <template #title>更多功能</template>
            <el-menu-item index="settings">系统设置</el-menu-item>
            <el-menu-item index="help">帮助中心</el-menu-item>
          </el-sub-menu>
        </el-menu>
        <div class="user-actions">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar :size="30" :src="user.avatar" />
              {{ user.name }}<el-icon><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleProfile">个人中心</el-dropdown-item>
                <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
  
      <!-- 主内容区 -->
      <el-main>
        <!-- 数据概览卡片 -->
        <el-row :gutter="20" class="mb-4">
          <el-col :span="6" v-for="item in summaryData" :key="item.title">
            <el-card shadow="hover">
              <div class="flex items-center">
                <el-icon :size="30" :color="item.color" class="mr-3">
                  <component :is="item.icon" />
                </el-icon>
                <div>
                  <div class="text-gray-500">{{ item.title }}</div>
                  <div class="text-2xl font-bold">{{ item.value }}</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
  
        <!-- 图表区域 -->
        <el-row :gutter="20">
          <el-col :span="16">
            <el-card header="访问量统计">
              <div ref="chartRef" style="height: 350px;"></div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card header="快捷操作">
              <el-button
                v-for="action in quickActions"
                :key="action.name"
                :type="action.type"
                :icon="action.icon"
                class="mb-2 w-full"
                @click="handleQuickAction(action)"
              >
                {{ action.label }}
              </el-button>
            </el-card>
          </el-col>
        </el-row>
  
        <!-- 表格数据 -->
        <el-card class="mt-4" header="最近订单">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="id" label="订单ID" width="180" />
            <el-table-column prop="name" label="客户姓名" />
            <el-table-column prop="amount" label="金额" align="right">
              <template #default="{ row }">
                ¥{{ row.amount.toLocaleString() }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
              <template #default="{ row }">
                <el-tag :type="statusMap[row.status].type">
                  {{ statusMap[row.status].label }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template #default="{ row }">
                <el-button size="small" @click="handleView(row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="mt-4"
            v-model:current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            layout="prev, pager, next"
            @current-change="handlePageChange"
          />
        </el-card>
      </el-main>
    </div>
  </template>
  
  <script setup lang="ts">

  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import * as echarts from 'echarts'
  import type { ECharts } from 'echarts'

  // 图标按需引入
  import {
    User,
    ArrowDown,
    ShoppingCart,
    Money,
    Tickets,
    DataLine,
    Plus,
    Edit,
    Upload,
    Download
  } from '@element-plus/icons-vue'
  
  // 路由相关
  const router = useRouter()
  const activeMenu = ref('dashboard')


  defineProps<{
  msg: string
}>()
  
  // 用户信息
  const user = ref({
    name: '管理员',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  })
  
  // 数据概览
  const summaryData = ref([
    {
      title: '今日访问',
      value: '1,234',
      icon: User,
      color: '#409EFF'
    },
    {
      title: '订单数量',
      value: '326',
      icon: ShoppingCart,
      color: '#67C23A'
    },
    {
      title: '销售额',
      value: '¥8,542',
      icon: Money,
      color: '#E6A23C'
    },
    {
      title: '待处理',
      value: '12',
      icon: Tickets,
      color: '#F56C6C'
    }
  ])
  
  // 快捷操作
  const quickActions = ref([
    {
      name: 'create',
      label: '新建订单',
      icon: Plus,
      type: 'primary'
    },
    {
      name: 'edit',
      label: '编辑资料',
      icon: Edit,
      type: 'success'
    },
    {
      name: 'upload',
      label: '上传文件',
      icon: Upload,
      type: 'warning'
    },
    {
      name: 'download',
      label: '下载报表',
      icon: Download,
      type: 'info'
    }
  ])
  
  // 表格数据
  const tableData = ref([
    {
      id: '20230001',
      name: '张三',
      amount: 1280,
      status: 'pending',
      date: '2023-05-01'
    },
    {
      id: '20230002',
      name: '李四',
      amount: 2560,
      status: 'completed',
      date: '2023-05-02'
    },
    {
      id: '20230003',
      name: '王五',
      amount: 980,
      status: 'canceled',
      date: '2023-05-03'
    },
    {
      id: '20230004',
      name: '赵六',
      amount: 3560,
      status: 'completed',
      date: '2023-05-04'
    },
    {
      id: '20230005',
      name: '钱七',
      amount: 1560,
      status: 'pending',
      date: '2023-05-05'
    }
  ])
  
  const statusMap = {
    pending: { label: '待处理', type: 'warning' },
    completed: { label: '已完成', type: 'success' },
    canceled: { label: '已取消', type: 'danger' }
  }
  
  // 分页
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(50)
  
  // 图表相关
  const chartRef = ref<HTMLElement>()
  let chart: ECharts | null = null
  
  // 方法定义
  const handleMenuSelect = (index: string) => {
    activeMenu.value = index
    ElMessage.success(`切换到 ${index}`)
  }
  
  const handleProfile = () => {
    router.push('/profile')
  }
  
  const handleLogout = () => {
    ElMessageBox.confirm('确定要退出登录吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      router.push('/login')
      ElMessage.success('已退出登录')
    })
  }
  
  const handleQuickAction = (action: any) => {
    ElMessage.info(`执行操作: ${action.label}`)
  }
  
  const handleView = (row: any) => {
    ElMessage.info(`查看订单: ${row.id}`)
  }
  
  const handlePageChange = (val: number) => {
    currentPage.value = val
    // 这里应该调用API获取新数据
    ElMessage.info(`切换到第 ${val} 页`)
  }
  
  // 初始化图表
  const initChart = () => {
    if (!chartRef.value) return
  
    chart = echarts.init(chartRef.value)
    const option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['访问量', '订单量', '销售额']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '访问量',
          type: 'line',
          data: [120, 132, 101, 134, 90, 230, 210],
          smooth: true,
          lineStyle: {
            color: '#409EFF'
          }
        },
        {
          name: '订单量',
          type: 'line',
          data: [220, 182, 191, 234, 290, 330, 310],
          smooth: true,
          lineStyle: {
            color: '#67C23A'
          }
        },
        {
          name: '销售额',
          type: 'line',
          data: [150, 232, 201, 154, 190, 330, 410],
          smooth: true,
          lineStyle: {
            color: '#E6A23C'
          }
        }
      ]
    }
  
    chart.setOption(option)
  }
  
  // 生命周期
  onMounted(() => {
    initChart()
    window.addEventListener('resize', () => {
      chart?.resize()
    })
  })
  </script>
  
  <style scoped>
  .home-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--el-border-color-light);
    padding: 0 20px;
  }
  
  .user-actions {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .el-dropdown-link {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .mb-4 {
    margin-bottom: 1rem;
  }
  
  .mt-4 {
    margin-top: 1rem;
  }
  
  .mr-3 {
    margin-right: 0.75rem;
  }
  
  .w-full {
    width: 100%;
  }
  </style>