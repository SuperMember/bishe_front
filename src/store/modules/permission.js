import { asyncRouterMap, constantRouterMap } from '../../router'

function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        // const accessedRouters = asyncRouterMap.filter(v => {
        //   // if (roles[0].authority.indexOf('admin') >= 0) return true
        //   if (hasPermission(roles, v)) {
        //     if (v.children && v.children.length > 0) {
        //       v.children = v.children.filter(child => {
        //         if (hasPermission(roles, child)) {
        //           return child
        //         }
        //         return false
        //       })
        //       return v
        //     } else {
        //       return v
        //     }
        //   }
        //   return false
        // })
        let accessedRouters
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

export default permission
