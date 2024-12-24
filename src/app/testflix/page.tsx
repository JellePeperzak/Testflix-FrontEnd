// URL: www.testflix.com with optional ?iid=<item ID>
import Carousel from '../components/items/item-carousel';
import TestItems from '../testData/testData';
import HeaderMenu from '../components/header-menu/header-menu';


// Note that HeaderMenu is currently here for test purposes.
// HeaderMenu should be in a layout.tsx page.
export default function Page() {
    return (
      <div>
        <HeaderMenu currentPage="Home"/>
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
        <div className="h-[8rem]"></div>
      </div>
      
    );
  }
