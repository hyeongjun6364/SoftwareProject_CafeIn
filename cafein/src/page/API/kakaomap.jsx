// import React, { useEffect } from 'react';
// import "../../style/kakaoApi/kakaomap.scss"

// const coffeeShops = [
//   { name: 'Starbucks1', lat: 37.5665, lon: 126.9780 },
//   { name: 'Starbucks2', lat: 37.5668, lon: 126.9782 },
//   { name: 'Starbucks3', lat: 37.5671, lon: 126.9784 },
// ];

// const CoffeeShopMap = () => {
//     useEffect(() => {
//         const script = document.createElement('script');
//         //const distance = kakao.maps.geometry.spherical.computeDistanceBetween(options.center, shopPosition);

//         script.async = true;
//         script.src =
//         '//dapi.kakao.com/v2/maps/sdk.js?appkey=b2826541e3bd29bd2b5d53d57a63fb12&autoload=false';
    
    


//         document.head.appendChild(script);

//         script.onload = () => {
//             /* eslint-disable no-undef */
//             kakao.maps.load(() => {

//                 // Get current location
//                 navigator.geolocation.getCurrentPosition((position) => {

//                     let container = document.getElementById('map');
//                     let options = {
//                         center: new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude),
//                         level: 3,
//                     };

//                     const map = new kakao.maps.Map(container, options);

//                     // 가장 가까운 스타벅스
//                     let nearestShop;
//                     let minDistance = Number.MAX_VALUE;

//                     coffeeShops.forEach((shop) => {
//                         const shopPosition = new kakao.maps.LatLng(shop.lat, shop.lon);
//                         const distance =
//                             kakao.maps.services.Util.distance(
//                                 options.center,
//                                 shopPosition
//                             );

//                         if (distance < minDistance) {
//                             minDistance = distance;
//                             nearestShop = shop;
//                         }

//                         // 스타벅스 위치 만들기
//                         new kakao.maps.Marker({
//                             map,
//                             position : shopPosition
//                         });
                        
//                          var infowindow=new kakao.maps.InfoWindow({zIndex :1});
                         
//                          var contentString ="<div style='padding-top :5px; padding-left :5px; padding-right :5px'>"+shop.name+"</div>";
                         
//                          infowindow.setContent(contentString);
                         
//                          infowindow.open(map);
//                     });

//                     // Show nearest Starbucks
//                     if (nearestShop) {
//                         alert(`Nearest Starbucks is ${nearestShop.name} at distance of ${minDistance} meters.`);
//                     }
//                 });
//             });
//             /* eslint-enable no-undef */
//         };
//     }, []);

//     return <div id="map" className='mapping'></div>;
// };

// export default CoffeeShopMap;
import React, { useEffect } from 'react';
import axios from 'axios';
import "../../style/kakaoApi/kakaomap.scss"
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

                // 현재위치 
                navigator.geolocation.getCurrentPosition((position) => {

                    let container = document.getElementById('map');
                    let options = {
                        center: new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude),
                        level: 3,
                    };

                    const map = new kakao.maps.Map(container, options);

                    //구글 api 적용
                    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
                        params: {
                            key: "AIzaSyC6g5WD6-Nu49aA2EmEL5W3ON6S0MGPLKQ",
                            location: `${position.coords.latitude},${position.coords.longitude}`,
                            radius: 5000,
                            keyword: 'Starbucks'
                        }
                     }).then(response => {
                         response.data.results.forEach(place => {

                             // 카페 마커생성
                             new kakao.maps.Marker({
                                 map,
                                 position : new kakao.maps.LatLng(place.geometry.location.lat, place.geometry.location.lng)
                             });
                             
                             var infowindow=new kakao.maps.InfoWindow({zIndex :1});
                             
                             var contentString ="<div style='padding-top :5px; padding-left :5px; padding-right :5px'>"+place.name+"</div>";
                             
                             infowindow.setContent(contentString);
                             
                             infowindow.open(map);
                         });
                     }).catch(error => console.error(error));
                 });
             });
             /* eslint-enable no-undef */
         };
     }, []);

     return <div id="map" className='mapping'></div>;
 };

 export default CoffeeShopMap;
