'use strict';
const alfy = require('alfy');
const algoliasearch = require('algoliasearch');

const client = algoliasearch(
	'0H4SMABBSG',
	'9670d2d619b9d07859448d7628eea5f3'
);
const index = client.initIndex('Post_production');

(async () => {
	const { hits } = await index.search({
		query: alfy.input,
		hitsPerPage: 5
	});

	const output = hits.map(hit => {
		const result = {
			uid: hit.id,
			title: hit.name,
			subtitle: hit.vote_count+' votes · '+hit.comments_count+' comments · '+hit.tagline,
			arg: 'https://producthunt.com'+hit.url,
			cmd: {
				arg: hit.product_links[0].url,
				subtitle: hit.product_links[0].store_name+': '+hit.product_links[0].url
			}
		};

		return result;
	});

	alfy.output(output);
})();

