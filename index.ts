import fs from 'fs'
import { default as strava } from 'strava-v3';
import { initialiseStrava, StravaAthlete } from './backend/strava/index'


fs.readFile('./config.json', (err, content) => {
  if (err) return console.log('Error loading config file:', err);
  const authData = JSON.parse(content.toString('utf-8'));

  // initialiseStrava(authData)
  const stravaAthlete = new StravaAthlete(authData)

  StravaSummary(stravaAthlete)

});



// async function getStravaData() {
//   const access_token = await getAccessToken()
//   const profileData = await getProfile(access_token)
// // console.log(JSON.stringify( profileData))
// // const activities = await strava.athletes.stats({
// //   id: process.env.ATHLETE_CODE,
// //   access_token: "0a95ea82cfae50fffe6b6cbc17ba257c70e5a7fc"
// // }).then(res => console.log(JSON.stringify(res)))

strava.athlete.listActivities({
  id: process.env.ATHLETE_CODE,
  access_token: process.env.ACCESS_TOKEN
}).then(res => console.log(JSON.stringify(res)))


// }

// getStravaData()




//// TODO  Host on github pages