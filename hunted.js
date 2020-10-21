'use strict';
const path = require('path');
const fs = require('fs');
const https = require('https');
const alfy = require('alfy');
const normalizeUrl = require('normalize-url');

const media = path.join(__dirname, 'media');
const token = alfy.config.get('token') || process.env.TOKEN;
const input = normalizeUrl(alfy.input);
const query = `query { posts(url: "${input}", order: VOTES) {
  edges{
    node{
      id
      name
      url
      thumbnail {
        url(height: 120, width: 120)
      }
  }}}}`;

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function download(filename, url, callback) {
	ensureDirectoryExistence(filename)
	let file = fs.createWriteStream(filename);

	https.get(url, function (response) {
		if (callback !== undefined) {
			response.pipe(file).on('finish', () => {
				callback(file);
			});
		}
	});
}

if (!token) {
  return alfy.error(new Error(`Please add a Product Hunt token as a variable`));
}

alfy
  .fetch('https://api.producthunt.com/v2/api/graphql', {
    method: 'POST',
    json: true,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: { query }
  })
  .then((json) => {
    const data = json.data;
    const edges = data.posts.edges;
    const hasResults = (Array.isArray(edges) && edges.length)

    if (!data) {
      return alfy.log(json.errors ? json.errors : 'Unknown GraphQL Error');
    }

    const noResults = [{
      title: 'Looks like this URL hasn’t been hunted!',
      subtitle: 'Submit to Product Hunt',
      arg: 'https://www.producthunt.com/posts/new'
    }];

    const results = edges.map(({node}) => {
      const iconPath = path.join(media, `${node.id}`);

      fs.exists(iconPath, exists => {
        if (!exists) {
          download(iconPath, node.thumbnail.url, () => {
            return true;
          });
        }
      });

      return {
        title: 'This URL has already been hunted!',
        subtitle: `Open ${node.name} on Product Hunt`,
        arg: node.url,
        icon: {
          path: iconPath
        },
      };
    });

    if (hasResults) {
      alfy.output(results)
    }
    else{
      alfy.output(noResults)
    }
  });
