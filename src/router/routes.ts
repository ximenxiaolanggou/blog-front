//对外暴露配置路由(常量路由):全部用户都可以访问到的路由
export const constantRoute = [
  {
    //登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录', //菜单标题
      hidden: true, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
      icon: 'Promotion', //菜单文字左侧的图标,支持element-plus全部图标
    },
  },
  {
    //登录成功以后展示数据的路由
    path: '/admin',
    component: () => import('@/layout/basic/index.vue'),
    name: 'layout',
    meta: {
      title: '',
      hidden: false,
      icon: '',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/blog',
    component: () => import('@/layout/basic/index.vue'),
    name: 'blog',
    meta: {
      title: '博客管理',
      icon: 'Lock',
    },
    redirect: '/blog/admin/article',
    children: [
      {
        path: '/blog/admin/article',
        component: () => import('@/views/blog/admin/article/index.vue'),
        name: 'blog-article',
        meta: {
          title: '列表',
          icon: 'Collection',
        },
      },
      {
        path: '/blog/admin/article/add',
        component: () => import('@/views/blog/admin/article/ArticleAdd.vue'),
        name: 'blog-add',
        meta: {
          hidden: true,
          title: '添加',
        },
      },
      {
        path: '/blog/admin/article/modify',
        component: () => import('@/views/blog/admin/article/ArticleModify.vue'),
        name: 'blog-modify',
        meta: {
          hidden: true,
          title: '修改',
        },
      },
      {
        path: '/blog/admin/category',
        component: () => import('@/views/blog/admin/category/index.vue'),
        name: 'blog-category',
        meta: {
          title: '类别',
          icon: 'Wallet',
        },
      },
      {
        path: '/blog/admin/tag',
        component: () => import('@/views/blog/admin/tag/index.vue'),
        name: 'blog-tag',
        meta: {
          title: '标签',
          icon: 'CollectionTag',
        },
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layout/blog/index.vue'),
    name: 'blog-pre',
    meta: {
      title: '博客',
      hidden: true,
    },
    redirect: '/articles',
    children: [
      {
        path: '/articles',
        component: () => import('@/views/blog/pre/articles/index.vue'),
        name: 'articles',
        meta: {
          title: '文章',
          hidden: true,
          icon: '',
        },
      },
      {
        path: '/articles/detail',
        component: () => import('@/views/blog/pre/detail/index.vue'),
        name: 'article-detail',
        meta: {
          title: '详情',
          hidden: true,
          icon: '',
        },
      },
    ],
  },
  {
    //404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
      icon: 'DocumentDelete',
    },
  },
]

//任意路由
export const anyRoute = {
  //任意路由
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'Any',
  meta: {
    title: '任意路由',
    hidden: true,
    icon: 'DataLine',
  },
}
