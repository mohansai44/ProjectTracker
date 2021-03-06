import { injectReducer } from '../../store/reducers'
export default (store) => ({
  path: 'subtask/:subtaskid',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const SubTask = require('./container/SubtaskContainer').default
      const subtaskReducer = require('./modules/subtask').default

      /*  Add the reducer to the store on key 'project'  */
      injectReducer(store, { key: 'subtask', reducer: subtaskReducer })

      /*  Return getComponent   */
      cb(null, SubTask)

      /* Webpack named bundle   */
    }, 'subtask')
  }
})
