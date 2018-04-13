const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const vueServerRenderer = require('vue-server-renderer')
const os = require('os')
const opn = require('opn')
function start() {
    app.all('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
        res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
        res.header('X-Powered-By', ' 3.2.1')
        if (req.method == 'OPTIONS') res.send(200) /*让options请求快速返回*/
        else next()
    })
    app.get('/', function(req, resp) {
        const filePath = path.join(__dirname, '../build/bundle.server.js')
        const code = fs.readFileSync(filePath, 'utf8')
        const bundleRenderer = vueServerRenderer.createBundleRenderer(code)
        bundleRenderer.renderToString((err, html) => {
            if (err) {
                console.log(err.message)
                console.log(err.stack)
            }
            console.log(html)
            resp.send(html)
        })
    })

    let port = 7000
    app.listen(port, () => {
        let url = `http://${getAddress()}:${port}`
        console.log('即将自动打开：', url)
        opn(url)
    })
}

function getAddress() {
    let iptable = '',
        ifaces = os.networkInterfaces()
    for (let dev in ifaces) {
        ifaces[dev].forEach(function(details, alias) {
            if (details.family === 'IPv4') {
                iptable = details.address
            }
        })
    }
    return iptable
}

module.exports = start
