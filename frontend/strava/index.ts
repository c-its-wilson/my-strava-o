import { default as strava, Strava } from 'strava-v3';


strava.config({
    "access_token"  : "Your apps access token (Required for Quickstart)",
    "client_id"     : "Your apps Client ID (Required for oauth)",
    "client_secret" : "Your apps Client Secret (Required for oauth)",
    "redirect_uri"  : "Your apps Authorization Redirection URI (Required for oauth)",
  });

  
// const payload = await strava.athlete.get({})
const profile = strava.athletes.get({id:5626404});
console.log(profile)
// strava = new stravaApi.client(access_token);
 
// const payload = await strava.athlete.get({})