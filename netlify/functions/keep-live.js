import { schedule } from '@netlify/functions';

const keep_live = async function () {
	const res = await fetch(`${process.env.SITE_URL}/api/keep_live`, {
		method: 'POST'
	});
	const data = await res.json();
	console.log('ping to keep live', data);
	return {
		statusCode: 200
	};
};

export const handler = schedule('@hourly', keep_live); // @daily
