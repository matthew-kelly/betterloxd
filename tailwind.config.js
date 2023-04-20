/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontSize: {
				tiny: ['0.625rem', '1rem']
			},
			borderRadius: {
				base: '0.25rem'
			}
		}
	},
	plugins: []
};
