'use latest';

import axios from 'axios';

const DANISH = 'danish';
const SCOTISH = 'scotish';
const SUPERLIGA_ID = '/271';
const PREMIERSHIP_ID = '/501';

module.exports = function (ctx, req, res) {
  let league = getLeagueIdFromName(ctx.data.name);

  if(league){
    axios.get('https://soccer.sportmonks.com/api/v2.0/leagues'+ league,
    {
      params:{
        'api_token':'PMOGRNpIH2oxAANr6EBmKycVeMyzq41uGhOaVjCTvmUrVOnxa2bt3ympnxoH'
      }
    })
    .then(response => {
      res.writeHead(200, { 'Content-Type': 'text/html '});
      res.end('<h1>Hello, world!</h1>');
    }).catch(error => {
      res.writeHead(500, { 'Content-Type': 'application/json'});
      res.end('{"message": "Unexpected Error, try agail later."}');
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json'});
    res.end('{"message": "League name not found, please provide a valid one"}');
  }
}

function getLeagueIdFromName(name){
  if(name === DANISH) {
    return SUPERLIGA_ID;
  } else if (name === SCOTISH){
    return PREMIERSHIP_ID;
  } else {
    return undefined;
  }
}

function renderView(content) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${content.title}</title>
    </head>

    <body>
      ${content.body}
    </body>
    </html>
  `;
}