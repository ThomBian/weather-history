export module Config {
    const API_URL_BASE = 'http://api.wunderground.com/api/';
    const API_KEY = '6f53a3abf5359d2c';
    export function forgeUrl(request:string): string{
        return `${API_URL_BASE}${API_KEY}${request}`;
    }
}