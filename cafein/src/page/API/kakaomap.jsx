// import React, { useEffect } from "react"
// import axios from "axios"
// import "../../style/kakaoApi/kakaomap.scss"

// const JSAPIKey = "84b336534898286eb05c9564060de18b" // 여기에 본인의 Kakao Map API 키를 입력하세요.
// const RestAPIKey = "6eaec46b97664b8bbd4f9ab66ce60627"

// const CoffeeShopMap = () => {
//   const handleCafeButtonClick = (keyword) => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const container = document.getElementById("map")
//       const options = {
//         center: new window.kakao.maps.LatLng(
//           position.coords.latitude,
//           position.coords.longitude
//         ),
//         level: 3,
//       }

//       const map = new window.kakao.maps.Map(container, options)

//       // 카페 검색
//       axios
//         .get(`https://dapi.kakao.com/v2/local/search/keyword.json`, {
//           headers: {
//             Authorization: `KakaoAK ${RestAPIKey}`,
//           },
//           params: {
//             query: keyword,
//             x: position.coords.longitude,
//             y: position.coords.latitude,
//             radius: 3000, // 3km 반경
//           },
//         })
//         .then((response) => {
//           response.data.documents.forEach((place) => {
//             // 카페 마커 생성
//             const marker = new window.kakao.maps.Marker({
//               map,
//               position: new window.kakao.maps.LatLng(place.y, place.x),
//             })

//             const infowindow = new window.kakao.maps.InfoWindow({
//               zIndex: 1,
//             })

//             const contentString = `<div style='padding-top: 5px; padding-left: 5px; padding-right: 5px'>${place.place_name}</div>`

//             infowindow.setContent(contentString)

//             window.kakao.maps.event.addListener(marker, "click", function () {
//               infowindow.open(map, marker)
//             })
//           })
//         })
//         .catch((error) => console.error(error))
//     })
//   }

//   useEffect(() => {
//     const script = document.createElement("script")
//     script.async = true
//     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${JSAPIKey}&autoload=false`
//     document.head.appendChild(script)

//     script.onload = () => {
//       window.kakao.maps.load(() => {
//         navigator.geolocation.getCurrentPosition((position) => {
//           const container = document.getElementById("map")
//           const options = {
//             center: new window.kakao.maps.LatLng(
//               position.coords.latitude,
//               position.coords.longitude
//             ),
//             level: 3,
//           }

//           const map = new window.kakao.maps.Map(container, options)

//           // 버튼들에 대한 클릭 이벤트 추가
//           const cafeButtons = document.querySelectorAll(".cafe-button")
//           cafeButtons.forEach((button) => {
//             button.addEventListener("click", () => {
//               handleCafeButtonClick(button.dataset.keyword)
//             })
//           })
//         })
//       })
//     }
//   }, [])

//   return (
//     <div>
//       <div id="map" style={{ width: "500px", height: "500px" }}></div>
//       <div>
//         {/* 카페 버튼들 */}
//         <button className="cafe-button" data-keyword="스타벅스">
//           스타벅스
//         </button>
//         <button className="cafe-button" data-keyword="할리스">
//           할리스
//         </button>
//         <button className="cafe-button" data-keyword="메가커피">
//           메가커피
//         </button>
//         <button className="cafe-button" data-keyword="이디야">
//           이디야
//         </button>
//         <button className="cafe-button" data-keyword="백다방">
//           백다방
//         </button>
//       </div>
//     </div>
//   )
// }

// export default CoffeeShopMap

// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import "../../style/kakaoApi/kakaomap.scss"

// const JSAPIKey = "84b336534898286eb05c9564060de18b"
// const RestAPIKey = "6eaec46b97664b8bbd4f9ab66ce60627"

// const CoffeeShopMap = () => {
//   const [userMarker, setUserMarker] = useState(null)
//   const [cafeMarker, setCafeMarker] = useState(null)

//   const handleCafeButtonClick = (keyword) => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const container = document.getElementById("map")
//       const options = {
//         center: new window.kakao.maps.LatLng(
//           position.coords.latitude,
//           position.coords.longitude
//         ),
//         level: 3,
//       }

//       const map = new window.kakao.maps.Map(container, options)

//       // 사용자의 현재 위치를 빨간 핀으로 표시
//       displayUserMarker(map, position.coords)

//       // 카페 검색
//       searchCafes(map, keyword, position.coords)
//     })
//   }

//   const displayUserMarker = (map, coords) => {
//     // 사용자의 현재 위치를 빨간 핀으로 표시
//     const userPosition = new window.kakao.maps.LatLng(
//       coords.latitude,
//       coords.longitude
//     )

//     if (userMarker) {
//       // 기존 빨간 핀이 있다면 제거
//       userMarker.setMap(null)
//     }

//     setUserMarker(
//       new window.kakao.maps.Marker({
//         map,
//         position: userPosition,
//         title: "현재 위치",
//         image: new window.kakao.maps.MarkerImage(
//           "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
//           new window.kakao.maps.Size(30, 30),
//           { offset: new window.kakao.maps.Point(15, 15) }
//         ),
//       })
//     )
//   }

//   const displayCafeMarker = (map, coords) => {
//     // 카페 위치를 파란 마커로 표시
//     const cafePosition = new window.kakao.maps.LatLng(
//       coords.latitude,
//       coords.longitude
//     )

//     if (cafeMarker) {
//       // 기존 파란 마커가 있다면 제거
//       cafeMarker.setMap(null)
//     }

//     setCafeMarker(
//       new window.kakao.maps.Marker({
//         map,
//         position: cafePosition,
//         title: "카페 위치",
//         image: new window.kakao.maps.MarkerImage(
//           "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png",
//           new window.kakao.maps.Size(30, 30),
//           { offset: new window.kakao.maps.Point(15, 15) }
//         ),
//       })
//     )
//   }

//   const searchCafes = (map, keyword, coords) => {
//     axios
//       .get(`https://dapi.kakao.com/v2/local/search/keyword.json`, {
//         headers: {
//           Authorization: `KakaoAK ${RestAPIKey}`,
//         },
//         params: {
//           query: keyword,
//           x: coords.longitude,
//           y: coords.latitude,
//           radius: 3000, // 3km 반경
//         },
//       })
//       .then((response) => {
//         response.data.documents.forEach((place) => {
//           // 카페 마커 생성
//           const marker = new window.kakao.maps.Marker({
//             map,
//             position: new window.kakao.maps.LatLng(place.y, place.x),
//           })

//           const infowindow = new window.kakao.maps.InfoWindow({
//             zIndex: 1,
//           })

//           const contentString = `<div style='padding-top: 5px; padding-left: 5px; padding-right: 5px'>${place.place_name}</div>`

//           infowindow.setContent(contentString)

//           window.kakao.maps.event.addListener(marker, "click", function () {
//             infowindow.open(map, marker)
//           })
//         })

//         // 첫 번째 카페 위치에 파란 마커로 표시
//         if (response.data.documents.length > 0) {
//           displayCafeMarker(map, response.data.documents[0])
//         }
//       })
//       .catch((error) => console.error(error))
//   }

//   useEffect(() => {
//     const script = document.createElement("script")
//     script.async = true
//     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${JSAPIKey}&autoload=false`
//     document.head.appendChild(script)

//     script.onload = () => {
//       window.kakao.maps.load(() => {
//         navigator.geolocation.getCurrentPosition((position) => {
//           const container = document.getElementById("map")
//           const options = {
//             center: new window.kakao.maps.LatLng(
//               position.coords.latitude,
//               position.coords.longitude
//             ),
//             level: 3,
//           }

//           const map = new window.kakao.maps.Map(container, options)

//           // 사용자의 현재 위치를 빨간 핀으로 표시
//           displayUserMarker(map, position.coords)

//           // 버튼들에 대한 클릭 이벤트 추가
//           const cafeButtons = document.querySelectorAll(".cafe-button")
//           cafeButtons.forEach((button) => {
//             button.addEventListener("click", () => {
//               handleCafeButtonClick(button.dataset.keyword)
//             })
//           })
//         })
//       })
//     }
//   }, [])

//   return (
//     <div>
//       <div id="map" style={{ width: "500px", height: "500px" }}></div>
//       <div>
//         {/* 카페 버튼들 */}
//         <button className="cafe-button" data-keyword="스타벅스">
//           스타벅스
//         </button>
//         <button className="cafe-button" data-keyword="할리스">
//           할리스
//         </button>
//         <button className="cafe-button" data-keyword="메가커피">
//           메가커피
//         </button>
//         <button className="cafe-button" data-keyword="이디야">
//           이디야
//         </button>
//         <button className="cafe-button" data-keyword="백다방">
//           백다방
//         </button>
//       </div>
//     </div>
//   )
// }

// export default CoffeeShopMap

// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import "../../style/kakaoApi/kakaomap.scss"

// const JSAPIKey = "84b336534898286eb05c9564060de18b"
// const RestAPIKey = "6eaec46b97664b8bbd4f9ab66ce60627"

// const CoffeeShopMap = () => {
//   const [userMarker, setUserMarker] = useState(null)
//   const [cafeMarker, setCafeMarker] = useState(null)

//   const handleCafeButtonClick = (keyword) => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const container = document.getElementById("map")
//       const options = {
//         center: new window.kakao.maps.LatLng(
//           position.coords.latitude,
//           position.coords.longitude
//         ),
//         level: 3,
//       }

//       const map = new window.kakao.maps.Map(container, options)

//       // 사용자의 현재 위치를 빨간 핀으로 표시
//       displayUserMarker(map, position.coords)

//       // 카페 검색
//       searchCafes(map, keyword, position.coords)
//     })
//   }

//   const displayUserMarker = (map, coords) => {
//     // 사용자의 현재 위치를 빨간 핀으로 표시
//     const userPosition = new window.kakao.maps.LatLng(
//       coords.latitude,
//       coords.longitude
//     )

//     if (userMarker) {
//       // 기존 빨간 핀이 있다면 제거
//       userMarker.setMap(null)
//     }

//     setUserMarker(
//       new window.kakao.maps.Marker({
//         map,
//         position: userPosition,
//         title: "현재 위치",
//         image: new window.kakao.maps.MarkerImage(
//           "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
//           new window.kakao.maps.Size(30, 30),
//           { offset: new window.kakao.maps.Point(15, 15) }
//         ),
//       })
//     )
//   }

//   const displayCafeMarker = (map, coords, cafeName) => {
//     // 기존 파란 마커가 있다면 제거
//     if (cafeMarker) {
//       cafeMarker.setMap(null)
//     }

//     // 카페 위치를 파란 마커로 표시
//     const cafePosition = new window.kakao.maps.LatLng(
//       coords.latitude,
//       coords.longitude
//     )

//     // setCafeMarker를 사용하여 상태 업데이트
//     const newCafeMarker = new window.kakao.maps.Marker({
//       map,
//       position: cafePosition,
//       title: cafeName,
//       image: new window.kakao.maps.MarkerImage(
//         "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png",
//         new window.kakao.maps.Size(30, 30),
//         { offset: new window.kakao.maps.Point(15, 15) }
//       ),
//     })

//     setCafeMarker(newCafeMarker)

//     // 마커 클릭 이벤트
//     window.kakao.maps.event.addListener(newCafeMarker, "click", function () {
//       const startCoords = userMarker.getPosition() // 빨간 핀의 좌표를 출발지로 설정
//       const endCoords = newCafeMarker.getPosition() // 파란 핀의 좌표를 목적지로 설정

//       drawPathWithRoad(map, startCoords, endCoords)
//     })
//   }

//   const searchCafes = (map, keyword, coords) => {
//     axios
//       .get(`https://dapi.kakao.com/v2/local/search/keyword.json`, {
//         headers: {
//           Authorization: `KakaoAK ${RestAPIKey}`,
//         },
//         params: {
//           query: keyword,
//           x: coords.longitude,
//           y: coords.latitude,
//           radius: 3000, // 3km 반경
//         },
//       })
//       .then((response) => {
//         response.data.documents.forEach((place) => {
//           // 카페 마커 생성
//           const marker = new window.kakao.maps.Marker({
//             map,
//             position: new window.kakao.maps.LatLng(place.y, place.x),
//           })

//           const infowindow = new window.kakao.maps.InfoWindow({
//             zIndex: 1,
//           })

//           const contentString = `<div style='padding-top: 5px; padding-left: 5px; padding-right: 5px'>${place.place_name}</div>`

//           infowindow.setContent(contentString)

//           window.kakao.maps.event.addListener(marker, "click", function () {
//             infowindow.open(map, marker)
//             // 클릭한 카페 위치까지의 최단 거리를 도로를 따라 선으로 표시
//             drawPathWithRoad(map, coords, {
//               latitude: marker.getPosition().getLat(),
//               longitude: marker.getPosition().getLng(),
//             })
//           })
//         })

//         // 첫 번째 카페 위치에 파란 마커로 표시
//         if (response.data.documents.length > 0) {
//           displayCafeMarker(
//             map,
//             response.data.documents[0],
//             response.data.documents[0].place_name
//           )
//         }
//       })
//       .catch((error) => console.error(error))
//   }

//   const drawPathWithRoad = async (map, startCoords, endCoords) => {
//     // 출발지(origin), 목적지(destination)의 좌표를 문자열로 변환합니다.
//     const origin = `${startCoords.longitude},${startCoords.latitude},name=출발지`
//     const destination = `${endCoords.longitude},${endCoords.latitude},name=목적지`

//     // 요청 헤더를 추가합니다.
//     const headers = {
//       Authorization: `KakaoAK ${RestAPIKey}`,
//       "Content-Type": "application/json",
//     }

//     // 요청 파라미터를 설정합니다.
//     const queryParams = new URLSearchParams({
//       origin: origin,
//       destination: destination,
//     })

//     // API를 호출할 URL을 생성합니다.
//     const apiUrl = `https://apis-navi.kakaomobility.com/v1/directions?${queryParams}`

//     try {
//       const response = await fetch(apiUrl, {
//         method: "GET",
//         headers: headers,
//       })

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`)
//       }

//       const data = await response.json()

//       // 여기서부터는 data를 이용하여 폴리라인을 그리는 로직을 추가합니다.
//       // 예시로 data의 구조를 콘솔에 출력
//       console.log(data)

//       // data를 이용하여 폴리라인을 그리는 로직을 추가합니다.
//       const linePath = []
//       data.routes[0].sections[0].roads.forEach((router) => {
//         router.vertexes.forEach((vertex, index) => {
//           // x, y 좌표가 번갈아가면서 들어옵니다. 그래서 인덱스가 짝수일 때만 linePath에 넣어봅시다.
//           if (index % 2 === 0) {
//             linePath.push(new window.kakao.maps.LatLng(vertex[1], vertex[0]))
//           }
//         })
//       })

//       const polyline = new window.kakao.maps.Polyline({
//         path: linePath,
//         strokeWeight: 5,
//         strokeColor: "#000000",
//         strokeOpacity: 0.7,
//         strokeStyle: "solid",
//       })

//       polyline.setMap(map)
//     } catch (error) {
//       console.error("Error:", error)
//     }
//   }

//   useEffect(() => {
//     const script = document.createElement("script")
//     script.async = true
//     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${JSAPIKey}&autoload=false`
//     document.head.appendChild(script)

//     script.onload = () => {
//       window.kakao.maps.load(() => {
//         navigator.geolocation.getCurrentPosition((position) => {
//           const container = document.getElementById("map")
//           const options = {
//             center: new window.kakao.maps.LatLng(
//               position.coords.latitude,
//               position.coords.longitude
//             ),
//             level: 3,
//           }

//           const map = new window.kakao.maps.Map(container, options)

//           // 사용자의 현재 위치를 빨간 핀으로 표시
//           displayUserMarker(map, position.coords)

//           // 버튼들에 대한 클릭 이벤트 추가
//           const cafeButtons = document.querySelectorAll(".cafe-button")
//           cafeButtons.forEach((button) => {
//             button.addEventListener("click", () => {
//               handleCafeButtonClick(button.dataset.keyword)
//             })
//           })
//         })
//       })
//     }
//   }, [])

//   return (
//     <div>
//       <div id="map" style={{ width: "500px", height: "500px" }}></div>
//       <div>
//         {/* 카페 버튼들 */}
//         <button className="cafe-button" data-keyword="스타벅스">
//           스타벅스
//         </button>
//         <button className="cafe-button" data-keyword="할리스">
//           할리스
//         </button>
//         <button className="cafe-button" data-keyword="메가커피">
//           메가커피
//         </button>
//         <button className="cafe-button" data-keyword="이디야">
//           이디야
//         </button>
//         <button className="cafe-button" data-keyword="백다방">
//           백다방
//         </button>
//       </div>
//     </div>
//   )
// }

// export default CoffeeShopMap

import React, { useEffect, useState } from "react"
import axios from "axios"
import "../../style/kakaoApi/kakaomap.scss"

const JSAPIKey = "84b336534898286eb05c9564060de18b"
const RestAPIKey = "6eaec46b97664b8bbd4f9ab66ce60627"

const CoffeeShopMap = () => {
  const [userMarker, setUserMarker] = useState(null)
  const [cafeMarker, setCafeMarker] = useState(null)
  const [polyline, setPolyline] = useState(null)

  const handleCafeButtonClick = (keyword) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const container = document.getElementById("map")
      const options = {
        center: new window.kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        ),
        level: 3,
      }

      const map = new window.kakao.maps.Map(container, options)

      // 사용자의 현재 위치를 빨간 핀으로 표시
      displayUserMarker(map, position.coords)

      // 카페 검색
      searchCafes(map, keyword, position.coords)
    })
  }

  const displayUserMarker = (map, coords) => {
    // 사용자의 현재 위치를 빨간 핀으로 표시
    const userPosition = new window.kakao.maps.LatLng(
      coords.latitude,
      coords.longitude
    )

    if (userMarker) {
      // 기존 빨간 핀이 있다면 제거
      userMarker.setMap(null)
    }

    setUserMarker(
      new window.kakao.maps.Marker({
        map,
        position: userPosition,
        title: "현재 위치",
        image: new window.kakao.maps.MarkerImage(
          "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
          new window.kakao.maps.Size(30, 30),
          { offset: new window.kakao.maps.Point(15, 15) }
        ),
      })
    )
  }

  const displayCafeMarker = (map, coords, cafeName) => {
    // 기존 파란 마커가 있다면 제거
    if (cafeMarker) {
      cafeMarker.setMap(null)
    }

    // 카페 위치를 파란 마커로 표시
    const cafePosition = new window.kakao.maps.LatLng(
      coords.latitude,
      coords.longitude
    )

    // setCafeMarker를 사용하여 상태 업데이트
    const newCafeMarker = new window.kakao.maps.Marker({
      map,
      position: cafePosition,
      title: cafeName,
      image: new window.kakao.maps.MarkerImage(
        "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png",
        new window.kakao.maps.Size(30, 30),
        { offset: new window.kakao.maps.Point(15, 15) }
      ),
    })

    setCafeMarker(newCafeMarker)

    // 마커 클릭 이벤트
    window.kakao.maps.event.addListener(newCafeMarker, "click", function () {
      const startCoords = userMarker.getPosition() // 빨간 핀의 좌표를 출발지로 설정
      const endCoords = newCafeMarker.getPosition() // 파란 핀의 좌표를 목적지로 설정

      drawPathWithRoad(map, startCoords, endCoords)
    })
  }

  const searchCafes = (map, keyword, coords) => {
    axios
      .get(`https://dapi.kakao.com/v2/local/search/keyword.json`, {
        headers: {
          Authorization: `KakaoAK ${RestAPIKey}`,
        },
        params: {
          query: keyword,
          x: coords.longitude,
          y: coords.latitude,
          radius: 3000, // 3km 반경
        },
      })
      .then((response) => {
        response.data.documents.forEach((place) => {
          // 카페 마커 생성
          const marker = new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(place.y, place.x),
          })

          const infowindow = new window.kakao.maps.InfoWindow({
            zIndex: 1,
          })

          const contentString = `<div style='padding-top: 5px; padding-left: 5px; padding-right: 5px'>${place.place_name}</div>`

          infowindow.setContent(contentString)

          window.kakao.maps.event.addListener(marker, "click", function () {
            infowindow.open(map, marker)
            // 클릭한 카페 위치까지의 최단 거리를 도로를 따라 선으로 표시
            drawPathWithRoad(map, coords, {
              latitude: marker.getPosition().getLat(),
              longitude: marker.getPosition().getLng(),
            })
          })
        })

        // 첫 번째 카페 위치에 파란 마커로 표시
        if (response.data.documents.length > 0) {
          displayCafeMarker(
            map,
            response.data.documents[0],
            response.data.documents[0].place_name
          )
        }
      })
      .catch((error) => console.error(error))
  }

  const clearPolyline = () => {
    // 이전에 그려진 선이 있다면 제거
    if (polyline) {
      polyline.setMap(null)
      setPolyline(null)
    }
  }

  const drawPathWithRoad = async (map, startCoords, endCoords) => {
    const origin = `${startCoords.longitude},${startCoords.latitude},name=출발지`
    const destination = `${endCoords.longitude},${endCoords.latitude},name=목적지`

    const headers = {
      Authorization: `KakaoAK ${RestAPIKey}`,
      "Content-Type": "application/json",
    }

    const queryParams = new URLSearchParams({
      origin: origin,
      destination: destination,
    })

    const apiUrl = `https://apis-navi.kakaomobility.com/v1/directions?${queryParams}`

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: headers,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()

      console.log(data)

      if (data.routes && data.routes.length > 0) {
        const linePath = []

        data.routes[0].sections[0].roads.forEach((section) => {
          section.vertexes.forEach((vertex, index) => {
            if (index % 2 === 0) {
              linePath.push(
                new window.kakao.maps.LatLng(
                  section.vertexes[index + 1],
                  section.vertexes[index]
                )
              )
            }
          })
        })

        // 이전에 그려진 선이 있다면 제거
        clearPolyline()

        const newPolyline = new window.kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 5,
          strokeColor: "#000000",
          strokeOpacity: 0.7,
          strokeStyle: "solid",
        })

        // 새로운 선을 지도에 추가
        newPolyline.setMap(map)

        // 상태 업데이트
        setPolyline(newPolyline)
      } else {
        console.error("No route data available")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }
  useEffect(() => {
    const script = document.createElement("script")
    script.async = true
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${JSAPIKey}&autoload=false`
    document.head.appendChild(script)

    script.onload = () => {
      window.kakao.maps.load(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          const container = document.getElementById("map")
          const options = {
            center: new window.kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            ),
            level: 3,
          }

          const map = new window.kakao.maps.Map(container, options)

          // 사용자의 현재 위치를 빨간 핀으로 표시
          displayUserMarker(map, position.coords)

          // 버튼들에 대한 클릭 이벤트 추가
          const cafeButtons = document.querySelectorAll(".cafe-button")
          cafeButtons.forEach((button) => {
            button.addEventListener("click", () => {
              handleCafeButtonClick(button.dataset.keyword)
            })
          })
        })
      })
    }
  }, [])

  return (
    <div>
      <div id="map" style={{ width: "500px", height: "500px" }} />
      <div>
        {/* 카페 버튼들 */}
        <button className="cafe-button" data-keyword="스타벅스">
          스타벅스
        </button>
        <button className="cafe-button" data-keyword="할리스">
          할리스
        </button>
        <button className="cafe-button" data-keyword="메가커피">
          메가커피
        </button>
        <button className="cafe-button" data-keyword="이디야">
          이디야
        </button>
        <button className="cafe-button" data-keyword="백다방">
          백다방
        </button>
      </div>
    </div>
  )
}

export default CoffeeShopMap
