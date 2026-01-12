<<<<<<< HEAD
const { src, dest, parallel } = require('gulp');

function copyNodeIcons() {
	return src('nodes/**/*.{svg,png}')
		.pipe(dest('dist/nodes'));
}

function copyCredentialIcons() {
	return src('credentials/**/*.{svg,png}')
		.pipe(dest('dist/credentials'));
}

function copyMeta() {
	return src(['package.json', 'README.md', 'LICENSE'])
		.pipe(dest('dist'));
}

=======
const { src, dest, parallel } = require('gulp');

function copyNodeIcons() {
	return src('nodes/**/*.{svg,png}')
		.pipe(dest('dist/nodes'));
}

function copyCredentialIcons() {
	return src('credentials/**/*.{svg,png}')
		.pipe(dest('dist/credentials'));
}

function copyMeta() {
	return src(['package.json', 'README.md', 'LICENSE'])
		.pipe(dest('dist'));
}

>>>>>>> b7319d8b76a654549e2abdeb482227fb7a5a3542
exports.default = parallel(copyNodeIcons, copyCredentialIcons, copyMeta);