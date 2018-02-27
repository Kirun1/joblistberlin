/* function makeSlug(string) {
 * 	return string.trim() // remove whitespaces on the edge
 * 							 .replace(/[`~!@#$%^&*()_|+=?;:'",.<>{}[\]\\/]/gi, '') // remove unwanted characters
 * 							 .replace(/\s+/g, '-') // change spaces groups to single `-`
 * 							 .replace(/\-+/g, '-') // change - groups to simgle `-`
 * 							 .toLowerCase()
 * }*/

export default function serializeCompany(data, id) {
	const companyModel = {
		id: '',
		body: '',
		url: '',
		title: '',
		/* slug: '',*/
		createdAt: 0,
		isApproved: false
	};

	data.id = id;
	/* data.slug = makeSlug(data.title)*/
	return Object.assign(companyModel, data);
};
