import { useState, useCallback, useRef } from 'react'

function DraggableSquare() {
  const insideRectRef = useRef(null);
  const rootElementRef = useRef(null);

  const handleDragStart = useCallback((e) => {
    const rect = e.target.getBoundingClientRect();
    insideRectRef.current = {top: e.clientY - rect.top, left: e.clientX - rect.left};
  }, []);

  const handleDragEnd = useCallback(() => {
    insideRectRef.current = null;
  }, [])

  const handleDragBlock = useCallback((e) => {
    if (insideRectRef.current && rootElementRef.current){
      const top = e.clientY - insideRectRef.current.top;
      const left = e.clientX - insideRectRef.current.left;

      rootElementRef.current.style.top = top + 'px';
      rootElementRef.current.style.left = left + 'px';

      rootElementRef.current.innerText = (
          `Y: ${top}
          X: ${left}`
      );
    }


  }, [])

  return (
      <section
        ref={rootElementRef}
        className="block"
        style={{top: '250px', left: '250px'}}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragBlock}
        onMouseUp={handleDragEnd}
        onMouseOut={handleDragEnd}
      >
        Y: 250
        <br/>
        X: 250
      </section>
  )
}

export default DraggableSquare
