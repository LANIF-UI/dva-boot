/**
 * 生成动态组件
 * @param {*} app 
 * @param {*} models 
 * @param {*} component 
 */
export const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(model => import(model)),
  component: () => typeof component === "string" ? import(component) : component,
});

/**
 * 生成路由
 * @param {*} app 
 * @param {*} routesConfig 
 */
export const createRoutes = (app, routesConfig) => {
  return (
    <Switch>
      {
        routesConfig(app).map(({component: Comp, path, ...otherProps}) => {

          const routeProps = assign({
            render: props => <Comp {...props} routerData={otherProps}/>
          }, path && {
            key: path,
            path: path
          });
          
          return (
            <Route {...routeProps} />
          )
        })
      }
      {
        routesConfig(app).filter(route => typeof route.indexPath === 'string').map(({path, indexPath}) => <Redirect exact from={path} to={indexPath} />)
      }
    </Switch>
  )
};