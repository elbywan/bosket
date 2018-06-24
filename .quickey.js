module.exports = q => {
    q.category('Npm scripts').description('Npm scripts').from(__dirname, {
        loader: 'package.json',
        include: [
            'start',
            'clean',
            'build',
            'dev-server',
            'publishall',
            'changelog'
        ]
    })
}
