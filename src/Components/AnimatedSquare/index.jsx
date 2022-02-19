import {useEffect, useState, useMemo} from 'react'

const vectorGenerator = (stepX, stepY, longitude) => {
  const array = []
  for(let i = 0; i < longitude; i++){
    array.push({top: stepX * i, left: stepY * i})
  }

  return array
}

const useAutoMoveEffect = (vector, interval = 50, startPosition, endPosition = Infinity) => {
  const [position, setPosition] = useState(startPosition)

  useEffect(() => {
    const handler = setInterval(() => {
      setPosition(position + 1)
    }, interval)

    if (position === (vector.length - 1) || position === endPosition) {
      clearInterval(handler)
    }

    return () => clearInterval(handler)
  }, [vector, setPosition, endPosition, position])

  return vector[position]
}

function AnimatedSquare() {
  const vectorArray = useMemo(() => vectorGenerator(1,1, 40000), [])
  const autoCoords = useAutoMoveEffect(vectorArray, 20, 0)

  return (
    <section
      className="block"
      style={{top: autoCoords.top + 'px', left: autoCoords.left + 'px'}}
    >
      Y: {autoCoords.top}
      <br/>
      X: {autoCoords.left}
    </section>
  )
}

export default AnimatedSquare
