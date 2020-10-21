'use strict';
const alfy = require('alfy');

const token = alfy.config.get('token') || process.env.TOKEN;

if (!token) {
  return alfy.error(new Error(`Please add a Product Hunt token as a variable`));
}

const query = `query { posts(url: "${alfy.input}", order: VOTES) {
  edges{
    node{
      name
      url
  }}}}`;

alfy
  .fetch('https://api.producthunt.com/v2/api/graphql', {
    method: 'POST',
    // json: true,
    json: false,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    // body: { query }
    body: JSON.stringify({ query })
  })
  .then((json) => {
    const data = json.data;

    if (!data) {
      return alfy.log(json.errors ? json.errors : 'Unknown GraphQL Error');
    }

    alfy.log('All good!');
    alfy.log(data.viewer.repositories.nodes);

    const results = data.body.posts.edges.map((node) => {
      return {
        title: node.name,
        arg: node.url
      };
    });

    alfy.output(results);
  });
