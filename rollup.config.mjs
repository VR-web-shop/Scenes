import json from '@rollup/plugin-json';

export default {
	input: './sdk/sdk.js',
	output: {
		file: './dist_sdk/bundle.js',
		format: 'cjs'
	},
	plugins: [json()]
};
