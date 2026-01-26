"use client";

import { useEffect, useRef } from "react";

const BLOCK_SIZE = 50;

export default function CursorParticles() {
  const blocksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blockContainer = blocksRef.current;
    if (!blockContainer) return;

    const createBlocks = () => {
      blockContainer.innerHTML = "";
      const numCols = Math.ceil(window.innerWidth / BLOCK_SIZE);
      const numRows = Math.ceil(window.innerHeight / BLOCK_SIZE);
      const numBlocks = numCols * numRows;

      for (let i = 0; i < numBlocks; i++) {
        const block = document.createElement("div");
        block.classList.add("cursor-block");
        blockContainer.appendChild(block);
      }
      return numCols;
    };

    let numCols = createBlocks();

    const highlightBlock = (event: MouseEvent) => {
      const rect = blockContainer.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const col = Math.floor(x / BLOCK_SIZE);
      const row = Math.floor(y / BLOCK_SIZE);
      const index = row * numCols + col;

      const block = blockContainer.children[index] as HTMLElement;
      if (block) {
        block.classList.add("cursor-highlight");
        setTimeout(() => block.classList.remove("cursor-highlight"), 300);
      }
    };

    const handleResize = () => {
      numCols = createBlocks();
    };

    window.addEventListener("mousemove", highlightBlock);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("mousemove", highlightBlock);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        <div
          ref={blocksRef}
          className="flex flex-wrap w-[105vw] h-[105vh] align-content-start"
        />
      </div>
      <style jsx global>{`
        .cursor-block {
          width: 50px;
          height: 50px;
          border: 0.5px solid transparent;
          transition: border-color 0.4s ease;
        }
        .cursor-highlight {
          border-color: var(--racing-green, #004225) !important;
          box-shadow: inset 0 0 10px rgba(0, 66, 37, 0.15);
        }
      `}</style>
    </>
  );
}
