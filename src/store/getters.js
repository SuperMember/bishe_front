const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  info: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers
}
export default getters
