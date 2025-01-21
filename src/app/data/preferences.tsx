import jsonData from './preferences.json' assert { type: 'json' };

interface PreferenceItemData {
    imdb_id: string;
    title: string;
    banner_url: string;
    file_id: string;
    [key: string]: any;    
}

const preferenceItems: PreferenceItemData[] = jsonData

export default preferenceItems;