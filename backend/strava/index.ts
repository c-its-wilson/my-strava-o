import { default as strava } from 'strava-v3';
import path from 'path';
import { overwriteFile, readFile } from './logger';
import credentials from '../../config.json'

type StravaCredentials = typeof credentials;

export class StravaAthlete {

    readonly athlete_id = '5626404'

    readonly configPath = path.resolve(__dirname, '../../config.json')

    stravaApiConfig: StravaCredentials

    setStravaApiConfig = (data: StravaCredentials) => {
        overwriteFile(this.configPath, JSON.stringify(data, null, 2))
        this.stravaApiConfig = JSON.parse(readFile(this.configPath));
    };

    constructor(){
        this.stravaApiConfig = JSON.parse(readFile(this.configPath));
        strava.config({
            "access_token"  : this.stravaApiConfig.access_token,
            "client_id"     : this.stravaApiConfig.client_id,
            "client_secret" : this.stravaApiConfig.client_secret,
            "redirect_uri"  : this.stravaApiConfig.redirect_uri,
          });
    }

    athlete = () => {
        return this.athlete_id
    }

    stravaArgs = () => {
        const configData = JSON.parse(readFile(this.configPath))
        return {
            id: this.athlete_id,
            access_token: configData.access_token
        }
    }

    refreshTokens = async () => {
        console.log('tokens expired, refreshing')
        const newAuthCodes = await strava.oauth.refreshToken(this.stravaApiConfig.refresh_token)

        this.stravaApiConfig.refresh_token = newAuthCodes.refresh_token;
        this.stravaApiConfig.access_token = newAuthCodes.access_token;
        this.stravaApiConfig.expires_at = newAuthCodes.expires_at;

        this.setStravaApiConfig(this.stravaApiConfig)
        console.log('tokens refreshed')
    }

    fetchData = async (predicate: () => Promise<any>) => {
        if (Date.now() > this.stravaApiConfig.expires_at) {
            this.refreshTokens()
        }

        try {
            return await predicate();
        } catch (error: any) {
            console.log('there has been an error: ' + error.statusCode.toString())
        }    
    }
    
}


export const StravaSummary = async (athlete: StravaAthlete) => {
    const a = await athlete.fetchData(() => strava.athlete.get(athlete.stravaArgs()))
    console.log(a)
    athlete.fetchData(() => strava.athlete.listActivities(athlete.stravaArgs()).then(res => console.log(res)))
}