import env from './env.json';

function buildUrl(endPoint) {
    return `${env.apiRootUrl}/${endPoint}.json`;
}

export function callAPI(endPoint, options) {
    return fetch(buildUrl(endPoint), options).then(response => response.json());
}

export function postAPI(endpoint, data) {
    const options = {
	method: 'POST',
	body: JSON.stringify(data)
    }
    return callAPI(endpoint, options).then(answer => {
	console.log( 'answer', answer );
    });
}

export function postJobs(data) {
    postAPI('links', data);
}
