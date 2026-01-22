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

exports.default = parallel(copyNodeIcons, copyCredentialIcons, copyMeta);