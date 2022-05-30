import React, { useRef, useState } from "react";

const useResize = (
  containerRef,
  panelRef,
  initialWidth,
  minWidth = 0,
) => {

  const [panelWidth, setPanelWidth] = useState(initialWidth);

  const onResizeStart = () => {
    if (panelRef.current) {
      panelRef.current.style.pointerEvents = "none";
      panelRef.current.style.userSelect = "none";
    }
    if (containerRef.current) {
      containerRef.current.classList.add("resizing");
      containerRef.current.style.cursor = "ew-resize";
    }
    window.addEventListener("pointermove", onResize);
    window.addEventListener("pointerup", onResizeEnd);
  };

  const onResize = (e) => {
    if (containerRef.current) {
      const bounds = containerRef.current.getBoundingClientRect();
      const newWidth = e.clientX - bounds.left;
      if (newWidth >= minWidth) {
        setPanelWidth(newWidth);
      } else {
        setPanelWidth(minWidth);
      }
    }
  };

  const onResizeEnd = () => {
    if (panelRef.current) {
      panelRef.current.style.pointerEvents = "auto";
      panelRef.current.style.userSelect = "auto";
    }
    if (containerRef.current) {
      containerRef.current.classList.remove("resizing");
      containerRef.current.style.cursor = "auto";
    }
    window.removeEventListener("pointermove", onResize);
    window.removeEventListener("pointerup", onResizeEnd);
  };

  return { panelWidth, onResizeStart };
}

const ResizablePanels = () => {
  const containerRef = useRef(null);
  const panelRef = useRef(null);
  const handleWidth = 16;
  const maxContainerWidth = 736;

  const { panelWidth, onResizeStart } = useResize(
    containerRef,
    panelRef,
    maxContainerWidth,
  );

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        maxWidth: `${maxContainerWidth}px`,
        height: "400px",
        backgroundColor: "#6b7280",
      }}
    >
      <div
        ref={panelRef}
        style={{
          position: "relative",
          width: `${panelWidth}px`,
          maxWidth: "100%",
          height: "100%",
          paddingRight: `${handleWidth}px`,
          backgroundColor: "#f1f2f4",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            height: "100%",
            width: `${handleWidth}px`,
            backgroundColor: "#f3f4f6",
            borderLeft: "1px solid #e5e7eb",
            cursor: "ew-resize",
          }}
          onPointerDown={onResizeStart}
        ></div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="App" style={{
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "100vh",
      padding: "0 16px"
    }}>
      <ResizablePanels />
    </div>
  );
}

export default App;
