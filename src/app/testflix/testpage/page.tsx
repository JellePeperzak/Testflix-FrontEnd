'use client'

// URL: www.testflix.com with optional ?iid=<item ID>
import Item from '../../components/items/ItemCard';
import HeaderMenu from '@/app/components/header-menu/HeaderMenu';
import { useState } from 'react';

export default function Page() {
  const [exampleType, setExampleType] = useState('movie')

    return (
      <>
        <HeaderMenu />
        <div className="h-screen w-screen flex items-center justify-center">
          <div className="w-1/4">
            {exampleType == 'movie' ? (
              <Item imgURL="https://artworks.thetvdb.com/banners/v4/movie/135073/backgrounds/666f946df249b.jpg" contentType="movie" itemName="The Hunger Games" pgRating="12" genres={['Action', 'Drama', 'Romance']} runtime_minutes="176" season_count="MOVIE"/>
            ) : (
              <Item imgURL="https://artworks.thetvdb.com/banners/v4/series/399909/backgrounds/64b1b9825dcf7_t.jpg" contentType="series" itemName="The Lincoln Lawyer" pgRating="9" genres={['Drama']} runtime_minutes="42" season_count="3"/>
            )}
            
          </div>        
        </div>   
      </>
         
    );
  }
