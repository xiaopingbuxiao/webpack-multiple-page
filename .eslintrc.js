module.exports = {
	'root': true,
	'env': {
		node: true,
	},
	'extends': [
		'@ued2345/eslint-config/preset/essential',
		'@ued2345/eslint-config/preset/recommended',
		'@ued2345/eslint-config/preset/stylistic',
		'@ued2345/eslint-config/preset/vue/essential',
		'@ued2345/eslint-config/preset/vue/recommended',
		'@ued2345/eslint-config/preset/vue/stylistic',
		// '@ued2345',
	],
	'rules': {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'vue/no-v-html': 'off',
		'max-len': 'off',
	},
}
