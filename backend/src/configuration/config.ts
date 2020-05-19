export default {
    port: process.env.PORT || 3333,
    secretyKey: process.env.SECRETYKEY || 'bfa8d803-54c3-4aab-b814-c6b22db99918',
    publicRoutes: process.env.PUBLICROUTES || [
        'login',
        'users/create'
    ]
}