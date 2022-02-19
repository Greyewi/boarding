import { useState, useCallback } from 'react'

function DraggableSquare() {
  const [vertical, setVertical] = useState(250)
  const [horizontal, setHorizontal] = useState(250)
  const [insideRect, setInsideRect] = useState(null)

  const handleDragStart = useCallback((e) => {
    const rect = e.target.getBoundingClientRect()
    const cursorDefaultCoords = {top: e.clientY - rect.top, left: e.clientX - rect.left}
    setInsideRect(cursorDefaultCoords)
  }, [setInsideRect])

  const handleDragEnd = useCallback(() => {
    setInsideRect(null)
  }, [setInsideRect])

  const handleDragBlock = useCallback((e) => {
    if(insideRect){
      setVertical(e.clientY - (insideRect.top))
      setHorizontal(e.clientX - insideRect.left)
    }
  }, [setVertical, setHorizontal, insideRect])

  return (
      <section
        className="block"
        style={{top: vertical + 'px', left: horizontal + 'px'}}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragBlock}
        onMouseUp={handleDragEnd}
        onMouseOut={handleDragEnd}
      >
        Y: {vertical}
        <br/>
        X: {horizontal}
      </section>
  )
}

export default DraggableSquare
