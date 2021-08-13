import { default as strava } from 'strava-v3';
import fs from 'fs'
import { readFile } from './logger';
import credentials from '../../config.json'

type StravaCredentials = typeof credentials;

require('dotenv').config();



export class StravaAthlete {

    readonly athlete_id = '5626404'

    constructor(credentials: StravaCredentials){
        strava.config({
            "access_token"  : credentials.access_token,
            "client_id"     : credentials.client_id,
            "client_secret" : credentials.client_secret,
            "redirect_uri"  : credentials.redirect_uri,
          });
    }

    athlete = () => {
        return this.athlete_id
    }

    stravaArgs = () => {
        const configData = JSON.parse(readFile('../../config.json'))
        return {
            id: this.athlete_id,
            access_token: configData.access_token
        }
    }

    refreshTokens = async () => {
        let configData = JSON.parse(readFile('../../config.json'))
        const newAuthCodes = await strava.oauth.refreshToken(configData.refresh_token)

        configData.refresh_token = newAuthCodes.refresh_token
        configData.access_token = newAuthCodes.access_token;
    }

    fetchData = async (predicate: () => Promise<any>) => {
        const stravaResponse = await predicate();
        if (stravaResponse.statusCode === 401) {
            // may have failed due to expired tokens
            // generate new tokens
            this.refreshTokens()
            //call predicate again
            return await predicate()
        } else {
            return stravaResponse
        }
        // predicate is strava wrapper request
        // do that first, if errors then try to refresh token 
    
    }
    
}


export const StravaSummary (athlete: StravaAthlete) => {
    
}