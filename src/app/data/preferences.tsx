import jsonData from './preferences.json' assert { type: 'json' };

interface PreferenceItemData {
    imdb_id: string;
    title: string;
    image_type: string;
    [key: string]: any;    
}

const preferenceItems: PreferenceItemData[] = jsonData

export default preferenceItems;