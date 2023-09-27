import React from 'react'
import { useParams } from 'react-router-dom'
import { cafename, coffee } from './coffeedata';
import coffeeData from './Data.json'
function CoffeeDatail() {
    const {coffeeId,cafename} = useParams();
    const CafeImg = coffeeData.find((tag) => tag.cafe === cafename &&tag.Id === parseInt(coffeeId) )?.img
    console.log(CafeImg)
  return (
    <div>
       {CafeImg}
        coffeeDatail: {coffeeId}
         coffeename : {cafename}
        
    </div>
  )
}

export default CoffeeDatail