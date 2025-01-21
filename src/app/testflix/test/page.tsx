import Carousel from "@/app/components/items/ItemCarousel"
import { ItemProps } from "@/app/components/items/ItemCard"

const testData: ItemProps[] = [{
    tvdb_id: '226',
    item_type: 'movie',
    title: 'Beauty and the Beast',
    year: '1991',
    genres: 'Animation, Fantasy',
    runtime: '84',
    actors: 'Jesse Corti,Robby Benson,Rex Everhart',
    pg_rating: 'AL',
    season_count: 'MOVIE',
    banner_url: 'https://drive.google.com/uc?id=1ggYcFaWTRaj5x1fdg6L-zCb-OSD0OjDc',
    drive_id: 'https://drive.google.com/uc?id=1ggYcFaWTRaj5x1fdg6L-zCb-OSD0OjDc'
}, {
    tvdb_id: '2537',
    item_type: 'movie',
    title: 'Highlander II: The Quickening',
    year: '1991',
    genres: 'Action,Adventure,Fantasy',
    runtime: '84',
    actors: 'Jesse Corti,Robby Benson,Rex Everhart',
    pg_rating: 'AL',
    season_count: 'MOVIE',
    banner_url: 'https://drive.google.com/uc?id=1l7QTQ_APJpwXtZbnpa3mmvv11upwFqZz',
    drive_id: 'https://drive.google.com/uc?id=1l7QTQ_APJpwXtZbnpa3mmvv11upwFqZz'
}, {
    tvdb_id: '76168',
    item_type: 'series',
    title: 'Batman: The Animated Series',
    year: '1992',
    genres: 'Action,Adventure,Animation',
    runtime: '84',
    actors: 'Jesse Corti,Robby Benson,Rex Everhart',
    pg_rating: 'AL',
    season_count: 'MOVIE',
    banner_url: 'https://drive.google.com/uc?id=1ggYcFaWTRaj5x1fdg6L-zCb-OSD0OjDc',
    drive_id: 'https://drive.google.com/uc?id=1CkP20NynUn6f8j5A42GaDTqwxALhyYt2'
}]

export default function testPage() {
  return (
        <Carousel 
            item_type="both"
            genre="combination"
            rank={1}
            items={testData}
        />
  )
}