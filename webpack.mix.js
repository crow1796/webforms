let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			'@': path.resolve(__dirname, 'resources/assets/js'),
			'@app': path.resolve(__dirname, 'resources/assets/js/app'),
			'@web': path.resolve(__dirname, 'resources/assets/js/web')
		}
	}
});

mix.js('resources/assets/js/app/app.js', 'public/js/app')
	.sass('resources/assets/sass/app/app.scss', 'public/css/app');

mix.js('resources/assets/js/web/app.js', 'public/js/web')
	.sass('resources/assets/sass/web/app.scss', 'public/css/web');

mix.browserSync('webforms.dev/dashboard');
