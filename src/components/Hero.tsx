"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap"; // 型定義をインストールすればエラーは消えます

const ROWS = 6;
const COLS = 6;
const BLOCK_SIZE = 50;
const COOLDOWN = 1000;

export default function Hero() {
  const blocksRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const blockContainer = blocksRef.current;
    if (!blockContainer) return;

    // マウスエフェクト用ブロックの生成
    blockContainer.innerHTML = "";
    const numCols = Math.ceil(window.innerWidth / BLOCK_SIZE);
    const numRows = Math.ceil(window.innerHeight / BLOCK_SIZE);
    const numBlocks = numCols * numRows;

    for (let i = 0; i < numBlocks; i++) {
      const block = document.createElement("div");
      block.classList.add("block");
      blockContainer.appendChild(block);
    }

    const highlightBlock = (event: MouseEvent) => {
      const rect = blockContainer.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const col = Math.floor(x / BLOCK_SIZE);
      const row = Math.floor(y / BLOCK_SIZE);
      const index = row * numCols + col;

      const block = blockContainer.children[index] as HTMLElement;
      if (block) {
        block.classList.add("highlight");
        setTimeout(() => block.classList.remove("highlight"), 250);
      }
    };

    document.addEventListener("mousemove", highlightBlock);
    return () => document.removeEventListener("mousemove", highlightBlock);
  }, []);

  // 個別タイルのアニメーション
  const animateTile = (tile: HTMLElement, tiltY: number) => {
    gsap.timeline()
      .set(tile, { rotateX: isFlipped ? 180 : 0, rotateY: 0 })
      .to(tile, {
        rotateX: isFlipped ? 450 : 270,
        rotateY: tiltY,
        duration: 0.5,
        ease: "power2.out",
      })
      .to(tile, {
        rotateX: isFlipped ? 540 : 360,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
      }, "-=0.25");
  };

  const handleFlipAll = () => {
    const nextState = !isFlipped;
    setIsFlipped(nextState);
    const tiles = document.querySelectorAll(".tile");
    gsap.to(tiles, {
      rotateX: nextState ? 180 : 0,
      duration: 1,
      stagger: { amount: 0.5, from: "random" },
      ease: "power2.inOut",
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black font-sans">
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-8 z-10 pointer-events-none">
        <span className="text-white text-2xl font-bold pointer-events-auto">Codegrid</span>
        <button 
          onClick={handleFlipAll}
          className="pointer-events-auto border-none outline-none text-white bg-black rounded px-4 py-2 uppercase text-xl hover:bg-zinc-800 transition-colors"
        >
          Flip Tiles
        </button>
      </nav>

      <section className="board w-screen h-screen p-1 flex flex-col gap-1 perspective-1000 bg-black relative z-[1]">
        {[...Array(ROWS)].map((_, rowIndex) => (
          <div key={rowIndex} className="row flex flex-1 gap-1">
            {[...Array(COLS)].map((_, colIndex) => {
              const index = rowIndex * COLS + colIndex;
              // ESLint prefer-const 対策: 再代入しないため const を使用
              const tiltY = [ -40, -20, -10, 10, 20, 40 ][colIndex % 6];
              const bgPos = `${colIndex * 20}% ${rowIndex * 20}%`;

              return (
                <div 
                  key={colIndex} 
                  className="tile flex-1 relative preserve-3d"
                  onMouseEnter={(e) => animateTile(e.currentTarget, tiltY)}
                >
                  <div 
                    className="tile-face tile-front absolute inset-0 backface-hidden rounded-lg"
                    style={{ 
                      backgroundImage: 'url("/hero/front.jpg")',
                      backgroundSize: '600% 600%',
                      backgroundPosition: bgPos 
                    }}
                  />
                  <div 
                    className="tile-face tile-back absolute inset-0 backface-hidden rounded-lg rotate-x-180"
                    style={{ 
                      backgroundImage: 'url("/hero/back.jpg")',
                      backgroundSize: '600% 600%',
                      backgroundPosition: bgPos 
                    }}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </section>

      <div className="blocks-container fixed inset-0 pointer-events-none z-[2]">
        <div ref={blocksRef} id="blocks" className="flex flex-wrap w-[105vw] h-full align-content-start" />
      </div>
    </div>
  );
}