'use strict';
const alfy = require('alfy');
const algoliasearch = require('algoliasearch');
const path = require('path');
const fs = require('fs');
const https = require('https');
const alfredNotifier = require('alfred-notifier');
alfredNotifier();
// Shortcuts
const join = path.join;

// Variables
let dir = join(__dirname, 'assets', 'thumbs');

const client = algoliasearch(
	'0H4SMABBSG',
	'9670d2d619b9d07859448d7628eea5f3'
);
const index = client.initIndex('Post_production');

function download(filename, url, callback) {
	let file = fs.createWriteStream(filename);

	https.get(url, function(response) {
		 if (callback != undefined) {
			 response.pipe(file).on('finish', () => {
				 callback(file)
			 })
		 }
	});
};

(async () => {
	const { hits } = await index.search({
		query: alfy.input,
		hitsPerPage: 5
	});

	const output = hits.map(hit => {
		const icon_path = join(dir, `${hit.name}_${hit.id}.png`);

		const result = {
			uid: hit.id,
			title: hit.name,
			subtitle: hit.vote_count+' votes · '+hit.comments_count+' comments · '+hit.tagline,
			arg: 'https://producthunt.com'+hit.url,
			icon: {
				path: icon_path
			}
		};

		return result;
	});

	// fs.exisits is deprecated
	// hits.map(hit => {
	// 	fs.exists( join(dir, `${hit.name}_${hit.id}.png`), exists => {
	// 		if (!exists) {
	// 			download(join(dir, `${hit.name}_${hit.id}.png`), hit.thumbnail.image_url, () => {
	// 				return true
	// 			})
	// 		}
	// 	});
	// })

	output.map(hit => {
		hit.icon = {
			path: join(dir, `${hit.name}_${hit.id}.png`)
		}
		return hit.icon
	})

	alfy.output(output);
})();

