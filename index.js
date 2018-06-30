/**
 * This is the entry point for your Probot App.
 * @param {import('probot').Application} app - Probot's Application class.
 */
module.exports = app => {
  app.on('pull_request.opened', async context => {
    app.log('opened', context)
  })
  app.on('pull_request.synchronize', async context => {
    app.log('synchronize', context)
  })
}
