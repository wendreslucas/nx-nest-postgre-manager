const webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                username: JSON.stringify(process.env.username),
                password: JSON.stringify(process.env.password)
            }
        })
    ]
};
