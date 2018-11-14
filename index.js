'use latest';

import axios from 'axios';

const DANISH = 'danish';
const SCOTISH = 'scotish';
const SUPERLIGA_ID = '/271';
const PREMIERSHIP_ID = '/501';

module.exports = function (ctx, done) {
  let league = getLeagueIdFromName(ctx.data.name);

  if(league){
    let url = '	https://soccer.sportmonks.com/api/v2.0/leagues'+ league +
    '?api_token=PMOGRNpIH2oxAANr6EBmKycVeMyzq41uGhOaVjCTvmUrVOnxa2bt3ympnxoH';
  
    axios.get(url)
    .then(response => {
      done(null, 'Hello, ' + ctx.data.name);
    })
  } else {
    done(null, 'Provide a valid league name.');
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