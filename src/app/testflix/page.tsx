// URL: www.testflix.com with optional ?iid=<item ID>
import Carousel from '../components/items/item-carousel'
import TestItems from '../testData/testData';

export default function Page() {
    return (
      <div>
        <div>
          <Carousel
            carouselName="The Hunger Games"
            carouselItems={TestItems}
          />        
        </div>
        <div>
          <Carousel
            carouselName="The Hunger Games"
            carouselItems={TestItems}
          />        
        </div>
        <div>
          <Carousel
            carouselName="The Hunger Games"
            carouselItems={TestItems}
          />        
        </div>
        <div>
          <Carousel
            carouselName="The Hunger Games"
            carouselItems={TestItems}
          />        
        </div>
        <div>
          <Carousel
            carouselName="The Hunger Games"
            carouselItems={TestItems}
          />        
        </div>
        <div>
          <Carousel
            carouselName="The Hunger Games"
            carouselItems={TestItems}
          />        
        </div>
        <div>
          <Carousel
            carouselName="The Hunger Games"
            carouselItems={TestItems}
          />        
        </div>
      </div>
      
    );
  }
