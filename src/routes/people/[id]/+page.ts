import * as api from '$lib/api';
import type { CastMember, CrewMember } from '$lib/types.js';

export async function load({ data, params, fetch }) {
	const person = (await api.get(fetch, `/person/${params.id}`, {
		append_to_response: 'credits'
	})) as CrewMember | CastMember;

	person.credits.cast = person.credits.cast
		.filter((c) => c.release_date)
		.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
	person.credits.crew = person.credits.crew
		.filter((c) => c.release_date)
		.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());

	// sort crew grouped by job
	const credits_by_job = new Map();
	const job_by_department = new Map(); // map job to department
	// Actor
	if (person.credits.cast.length) {
		credits_by_job.set('Actor', []);
		person.credits.cast.forEach((c) => {
			credits_by_job.get('Actor').push(c);
		});
	}
	// Crew
	person.credits.crew.forEach((c) => {
		// job
		if (!credits_by_job.has(c.job)) {
			credits_by_job.set(c.job, []);
		}
		credits_by_job.get(c.job).push(c);

		// department
		if (!job_by_department.has(c.department)) {
			job_by_department.set(c.department, []);
		}
		job_by_department.get(c.department).push(c.job);
	});

	return {
		person,
		roles: [...credits_by_job].sort((a, b) => b[1].length - a[1].length),
		departments: [...job_by_department],
		title: person.name
	};
}
