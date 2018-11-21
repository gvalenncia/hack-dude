'use latest';

import axios from 'axios';
import json2html from 'node-json2html';

const DANISH = 'danish';
const SCOTISH = 'scotish';
const SUPERLIGA_ID = '/271';
const PREMIERSHIP_ID = '/501';
const API_TOKEN = 'PMOGRNpIH2oxAANr6EBmKycVeMyzq41uGhOaVjCTvmUrVOnxa2bt3ympnxoH';
module.exports = function (ctx, req, res) {
  let league = getLeagueIdFromName(ctx.data.name);
  if(league){
    axios.get('https://soccer.sportmonks.com/api/v2.0/leagues'+ league,
    {params: { 'api_token': API_TOKEN }})
    .then(leagues => {
      let sessionId = leagues.data.data.current_season_id;
      return axios.get('https://soccer.sportmonks.com/api/v2.0/topscorers/season/' + sessionId + '/aggregated',
      {params: { 'api_token': API_TOKEN }});
    }).then(topscorers => {
      return axios.all(getPlayerPromises(topscorers.data.data.aggregatedGoalscorers.data));
    }).then( resolves => {
      res.writeHead(200, { 'Content-Type': 'application/json'});
      res.end('');
    }).catch(error => {
      res.writeHead(500, { 'Content-Type': 'application/json'});
      res.end('{"message": "Unexpected Error, try again later."}');
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json'});
    res.end('{"message": "League name not found, please provide a valid one"}');
  }
}

function getPlayerPromises (players) {
  let promises = [];
    players.forEach(player => {
      let promise = axios.get('https://soccer.sportmonks.com/api/v2.0/players/' + player.player_id,
      {params: {'api_token': API_TOKEN}}).then(response => {return response.data;});
      promises.push(promise);
    });
    return promises;
}
function getLeagueIdFromName(name){
  if(name === DANISH) {
    return SUPERLIGA_ID;
  } else if (name === SCOTISH){
    return PREMIERSHIP_ID;
  }
  return undefined;
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