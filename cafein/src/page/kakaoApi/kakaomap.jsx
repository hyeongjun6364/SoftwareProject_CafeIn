import React, { useEffect } from 'react';

const coffeeShops = [
  { name: 'Starbucks', lat: 37.5665, lon: 126.9780 },
  { name: 'Ediya', lat: 37.5668, lon: 126.9782 },
  { name: 'Hollys', lat: 37.5671, lon: 126.9784 },
];

const CoffeeShopMap = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src =
            '//dapi.kakao.com/v2/maps/sdk.js?appkey=b2826541e3bd29bd2b5d53d57a63fb12&autoload=false';
        document.head.appendChild(script);

        script.onload = () => {
            /* eslint-disable no-undef */
            kakao.maps.load(() => {
                let container = document.getElementById('map');
                let options = {
                    center: new kakao.maps.LatLng(37.5665, 126.9780),
                    level: 3,
                };

                const map = new kakao.maps.Map(container, options);

                coffeeShops.forEach((shop) => {
                    new kakao.maps.Marker({
                        map,
                        position : new kakao.maps.LatLng(shop.lat, shop.lon)
                    });
                    
                    var infowindow = new kakao.maps.InfoWindow({zIndex :1});
                    
                    var contentString ="<div style='padding-top :5px; padding-left :5px; padding-right :5px'>"+shop.name+"</div>";
                    
                    infowindow.setContent(contentString);
                    
                    infowindow.open(map);
                
                 });
            });
            /* eslint-enable no-undef */
        };
    }, []);

    return <div id="map" style={{ width:'100%', height:'100vh'}}></div>;
};

export default CoffeeShopMap;
