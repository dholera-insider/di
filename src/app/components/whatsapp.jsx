// "use client";

// import { FaWhatsapp } from "react-icons/fa";
// import { usePathname } from "next/navigation";

// const WHATSAPP_URL =
//   "https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details.";

// export default function Whatsapp() {
//   const pathname = usePathname();
//   const hasMobileActionBar =
//     pathname === "/investor/dubai" || pathname === "/investor/saudi-arabia";

//   const handleWhatsappClick = () => {
//     if (typeof window === "undefined") {
//       return;
//     }

//     window.dataLayer = window.dataLayer || [];
//     window.dataLayer.push({
//       event: "whatsapp",
//       lead_type: "whatsapp",
//       device: "mobile",
//     });
//   };

//   return (
//     <a
//       href={WHATSAPP_URL}
//       target="_blank"
//       rel="noopener noreferrer"
//       onClick={handleWhatsappClick}
//       aria-label="Chat with a Dholera expert on WhatsApp"
//       title="Chat on WhatsApp"
//       className={`fixed right-4 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(5,26,58,0.3)] transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#051A3A] focus-visible:ring-offset-2 md:hidden ${
//         hasMobileActionBar
//           ? "bottom-[calc(5rem+env(safe-area-inset-bottom))]"
//           : "bottom-[calc(1rem+env(safe-area-inset-bottom))]"
//       }`}
//     >
//       <FaWhatsapp className="h-8 w-8" aria-hidden="true" />
//     </a>
//   );
// }


// "use client";

// import { useEffect, useRef, useState } from "react";
// import { FaWhatsapp } from "react-icons/fa";
// import { usePathname } from "next/navigation";

// const WHATSAPP_URL =
//   "https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details.";

// const BUTTON_SIZE = 56;
// const SCREEN_PADDING = 12;
// const LONG_PRESS_DURATION = 400;
// const MOVEMENT_THRESHOLD = 8;

// export default function Whatsapp() {
//   const pathname = usePathname();
//   const buttonRef = useRef(null);

//   const longPressTimerRef = useRef(null);
//   const dragOffsetRef = useRef({ x: 0, y: 0 });
//   const startPointerRef = useRef({ x: 0, y: 0 });

//   const isDraggingRef = useRef(false);
//   const longPressActivatedRef = useRef(false);
//   const suppressClickRef = useRef(false);

//   const [isDragging, setIsDragging] = useState(false);
//   const [hasCustomPosition, setHasCustomPosition] = useState(false);

//   const [position, setPosition] = useState({
//     x: 0,
//     y: 0,
//   });

//   const hasMobileActionBar =
//     pathname === "/investor/dubai" ||
//     pathname === "/investor/saudi-arabia";

//   /*
//    * Keep dragged button inside viewport
//    */
//   const clampPosition = (x, y) => {
//     if (typeof window === "undefined") {
//       return { x, y };
//     }

//     const maxX = Math.max(
//       SCREEN_PADDING,
//       window.innerWidth - BUTTON_SIZE - SCREEN_PADDING
//     );

//     const maxY = Math.max(
//       SCREEN_PADDING,
//       window.innerHeight - BUTTON_SIZE - SCREEN_PADDING
//     );

//     return {
//       x: Math.min(Math.max(x, SCREEN_PADDING), maxX),
//       y: Math.min(Math.max(y, SCREEN_PADDING), maxY),
//     };
//   };

//   /*
//    * Start detecting long press
//    */
//   const handlePointerDown = (event) => {
//     if (event.pointerType === "mouse" && event.button !== 0) {
//       return;
//     }

//     const button = buttonRef.current;

//     if (!button) {
//       return;
//     }

//     startPointerRef.current = {
//       x: event.clientX,
//       y: event.clientY,
//     };

//     longPressActivatedRef.current = false;
//     suppressClickRef.current = false;

//     /*
//      * Calculate where inside the button
//      * the user pressed.
//      */
//     const rect = button.getBoundingClientRect();

//     dragOffsetRef.current = {
//       x: event.clientX - rect.left,
//       y: event.clientY - rect.top,
//     };

//     clearTimeout(longPressTimerRef.current);

//     longPressTimerRef.current = setTimeout(() => {
//       longPressActivatedRef.current = true;
//       isDraggingRef.current = true;
//       suppressClickRef.current = true;

//       setIsDragging(true);

//       /*
//        * Convert default bottom/right position
//        * into an explicit x/y position before dragging.
//        */
//       if (!hasCustomPosition) {
//         const currentRect = button.getBoundingClientRect();

//         setPosition({
//           x: currentRect.left,
//           y: currentRect.top,
//         });

//         setHasCustomPosition(true);
//       }

//       try {
//         button.setPointerCapture(event.pointerId);
//       } catch {
//         // Pointer capture might not be available on some browsers.
//       }

//       /*
//        * Small vibration feedback on supported phones.
//        */
//       if (
//         typeof navigator !== "undefined" &&
//         typeof navigator.vibrate === "function"
//       ) {
//         navigator.vibrate(30);
//       }
//     }, LONG_PRESS_DURATION);
//   };

//   /*
//    * Drag button after long press
//    */
//   const handlePointerMove = (event) => {
//     const deltaX = Math.abs(
//       event.clientX - startPointerRef.current.x
//     );

//     const deltaY = Math.abs(
//       event.clientY - startPointerRef.current.y
//     );

//     /*
//      * If user moves before long press activates,
//      * cancel the long press.
//      */
//     if (
//       !longPressActivatedRef.current &&
//       (deltaX > MOVEMENT_THRESHOLD ||
//         deltaY > MOVEMENT_THRESHOLD)
//     ) {
//       clearTimeout(longPressTimerRef.current);
//       return;
//     }

//     if (!isDraggingRef.current) {
//       return;
//     }

//     event.preventDefault();

//     const nextX =
//       event.clientX - dragOffsetRef.current.x;

//     const nextY =
//       event.clientY - dragOffsetRef.current.y;

//     setPosition(clampPosition(nextX, nextY));
//   };

//   /*
//    * Stop dragging
//    */
//   const handlePointerUp = (event) => {
//     clearTimeout(longPressTimerRef.current);

//     if (isDraggingRef.current) {
//       suppressClickRef.current = true;

//       isDraggingRef.current = false;
//       setIsDragging(false);

//       try {
//         buttonRef.current?.releasePointerCapture(
//           event.pointerId
//         );
//       } catch {
//         // Ignore unsupported browsers.
//       }

//       /*
//        * Keep click suppressed briefly because
//        * browsers may fire click after pointerup.
//        */
//       setTimeout(() => {
//         suppressClickRef.current = false;
//       }, 250);

//       return;
//     }

//     longPressActivatedRef.current = false;
//   };

//   const handlePointerCancel = () => {
//     clearTimeout(longPressTimerRef.current);

//     isDraggingRef.current = false;
//     longPressActivatedRef.current = false;

//     setIsDragging(false);
//   };

//   /*
//    * WhatsApp normal click
//    */
//   const handleWhatsappClick = (event) => {
//     /*
//      * Prevent WhatsApp from opening after dragging.
//      */
//     if (
//       suppressClickRef.current ||
//       isDraggingRef.current ||
//       longPressActivatedRef.current
//     ) {
//       event.preventDefault();
//       event.stopPropagation();

//       longPressActivatedRef.current = false;

//       return;
//     }

//     if (typeof window === "undefined") {
//       return;
//     }

//     window.dataLayer = window.dataLayer || [];

//     window.dataLayer.push({
//       event: "whatsapp",
//       lead_type: "whatsapp",
//       device: "mobile",
//     });
//   };

//   /*
//    * Keep dragged icon inside screen when
//    * orientation or window size changes.
//    */
//   useEffect(() => {
//     const handleResize = () => {
//       if (!hasCustomPosition) {
//         return;
//       }

//       setPosition((currentPosition) =>
//         clampPosition(
//           currentPosition.x,
//           currentPosition.y
//         )
//       );
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener(
//         "resize",
//         handleResize
//       );
//     };
//   }, [hasCustomPosition]);

//   /*
//    * Clear long press timer when component unmounts.
//    */
//   useEffect(() => {
//     return () => {
//       clearTimeout(longPressTimerRef.current);
//     };
//   }, []);

//   /*
//    * Dynamic position after user drags.
//    */
//   const customPositionStyle = hasCustomPosition
//     ? {
//         left: `${position.x}px`,
//         top: `${position.y}px`,
//         right: "auto",
//         bottom: "auto",
//       }
//     : {};

//   return (
//     <a
//       ref={buttonRef}
//       href={WHATSAPP_URL}
//       target="_blank"
//       rel="noopener noreferrer"
//       onClick={handleWhatsappClick}
//       onPointerDown={handlePointerDown}
//       onPointerMove={handlePointerMove}
//       onPointerUp={handlePointerUp}
//       onPointerCancel={handlePointerCancel}
//       onContextMenu={(event) => event.preventDefault()}
//       aria-label="Chat with a Dholera expert on WhatsApp"
//       title="Chat on WhatsApp"
//       draggable={false}
//       style={{
//         ...customPositionStyle,
//         touchAction: "none",
//         userSelect: "none",
//         WebkitUserSelect: "none",
//         WebkitTouchCallout: "none",
//       }}
//       className={`
//         fixed
//         right-4
//         z-[60]
//         inline-flex
//         h-14
//         w-14
//         items-center
//         justify-center
//         rounded-full
//         bg-[#25D366]
//         text-white
//         shadow-[0_8px_24px_rgba(5,26,58,0.30)]
//         md:hidden

//         focus-visible:outline-none
//         focus-visible:ring-2
//         focus-visible:ring-[#051A3A]
//         focus-visible:ring-offset-2

//         ${
//           isDragging
//             ? "scale-110 cursor-grabbing shadow-[0_12px_35px_rgba(5,26,58,0.45)] transition-[transform,box-shadow] duration-150"
//             : "cursor-pointer transition-[transform,box-shadow] duration-200 hover:scale-105 active:scale-95"
//         }

//         ${
//           !hasCustomPosition
//             ? hasMobileActionBar
//               ? "bottom-[calc(5rem+env(safe-area-inset-bottom))]"
//               : "bottom-[calc(1rem+env(safe-area-inset-bottom))]"
//             : ""
//         }
//       `}
//     >
//       <FaWhatsapp
//         className="pointer-events-none h-8 w-8"
//         aria-hidden="true"
//       />
//     </a>
//   );
// }





"use client";

import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";

const WHATSAPP_URL =
  "https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details.";

const BUTTON_SIZE = 56;
const SCREEN_PADDING = 12;

// User must move at least this much before it becomes a drag.
// This prevents a normal tap from being treated as dragging.
const MOVEMENT_THRESHOLD = 6;

function clampPosition(x, y) {
  if (typeof window === "undefined") {
    return { x, y };
  }

  const maxX = Math.max(
    SCREEN_PADDING,
    window.innerWidth - BUTTON_SIZE - SCREEN_PADDING
  );

  const maxY = Math.max(
    SCREEN_PADDING,
    window.innerHeight - BUTTON_SIZE - SCREEN_PADDING
  );

  return {
    x: Math.min(Math.max(x, SCREEN_PADDING), maxX),
    y: Math.min(Math.max(y, SCREEN_PADDING), maxY),
  };
}

export default function Whatsapp() {
  const pathname = usePathname();

  const buttonRef = useRef(null);

  const startPointerRef = useRef({
    x: 0,
    y: 0,
  });

  const dragOffsetRef = useRef({
    x: 0,
    y: 0,
  });

  const isPointerDownRef = useRef(false);
  const isDraggingRef = useRef(false);
  const suppressClickRef = useRef(false);

  const [isDragging, setIsDragging] = useState(false);
  const [hasCustomPosition, setHasCustomPosition] =
    useState(false);

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const hasMobileActionBar =
    pathname?.replace(/\/+$/, "") === "/investor/dubai";

  /*
   * Pointer starts.
   *
   * We do NOT start dragging here.
   * This allows a normal click/tap to still open WhatsApp.
   */
  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const button = buttonRef.current;

    if (!button) {
      return;
    }

    isPointerDownRef.current = true;
    isDraggingRef.current = false;
    suppressClickRef.current = false;

    startPointerRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    const rect = button.getBoundingClientRect();

    /*
     * Remember exactly where inside the button
     * the user touched/clicked.
     *
     * This prevents the button from jumping when dragging starts.
     */
    dragOffsetRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    try {
      button.setPointerCapture(event.pointerId);
    } catch {
      // Pointer capture is not available in some browsers.
    }
  };

  /*
   * Start dragging as soon as the user moves.
   *
   * No long press is required.
   */
  const handlePointerMove = (event) => {
    if (!isPointerDownRef.current) {
      return;
    }

    const deltaX =
      event.clientX - startPointerRef.current.x;

    const deltaY =
      event.clientY - startPointerRef.current.y;

    const distance = Math.hypot(deltaX, deltaY);

    /*
     * Normal tiny finger/mouse movements should still
     * count as a normal click.
     */
    if (
      !isDraggingRef.current &&
      distance < MOVEMENT_THRESHOLD
    ) {
      return;
    }

    /*
     * Movement passed threshold:
     * switch into drag mode immediately.
     */
    if (!isDraggingRef.current) {
      isDraggingRef.current = true;
      suppressClickRef.current = true;

      setIsDragging(true);
      setHasCustomPosition(true);
    }

    event.preventDefault();

    const nextX =
      event.clientX - dragOffsetRef.current.x;

    const nextY =
      event.clientY - dragOffsetRef.current.y;

    setPosition(clampPosition(nextX, nextY));
  };

  /*
   * Pointer released.
   */
  const handlePointerUp = (event) => {
    isPointerDownRef.current = false;

    try {
      buttonRef.current?.releasePointerCapture(
        event.pointerId
      );
    } catch {
      // Ignore unsupported pointer capture.
    }

    /*
     * User dragged the button.
     *
     * Prevent the anchor click from opening WhatsApp.
     */
    if (isDraggingRef.current) {
      suppressClickRef.current = true;
      isDraggingRef.current = false;

      setIsDragging(false);

      /*
       * Browser normally fires click immediately after
       * pointerup. Keep click blocked briefly.
       */
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 250);

      return;
    }

    /*
     * No dragging happened.
     *
     * Allow the normal anchor click so WhatsApp opens.
     */
    suppressClickRef.current = false;
  };

  /*
   * Handle interrupted touch/pointer.
   */
  const handlePointerCancel = () => {
    isPointerDownRef.current = false;
    isDraggingRef.current = false;
    suppressClickRef.current = false;

    setIsDragging(false);
  };

  /*
   * Normal click:
   * WhatsApp opens.
   *
   * Drag:
   * Click is prevented.
   */
  const handleWhatsappClick = (event) => {
    if (
      suppressClickRef.current ||
      isDraggingRef.current
    ) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    /*
     * Normal click continues naturally because
     * this is still an <a href="..."> element.
     *
     * Your shared click tracker can continue
     * handling analytics as before.
     */
  };

  /*
   * Keep the icon inside the viewport when
   * orientation or screen size changes.
   */
  useEffect(() => {
    const handleResize = () => {
      if (!hasCustomPosition) {
        return;
      }

      setPosition((currentPosition) =>
        clampPosition(
          currentPosition.x,
          currentPosition.y
        )
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [hasCustomPosition]);

  /*
   * Once the user moves the icon,
   * use explicit left/top coordinates.
   */
  const customPositionStyle = hasCustomPosition
    ? {
        left: `${position.x}px`,
        top: `${position.y}px`,
        right: "auto",
        bottom: "auto",
      }
    : {};

  return (
    <>
      <a
        ref={buttonRef}
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsappClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onContextMenu={(event) =>
          event.preventDefault()
        }
        aria-label="Chat with a Dholera expert on WhatsApp"
        title="Chat on WhatsApp"
        draggable={false}
        style={{
          ...customPositionStyle,

          /*
           * Important for mobile dragging.
           */
          touchAction: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
          WebkitTouchCallout: "none",
        }}
        className={`
          fixed
          right-4
          z-[60]

          inline-flex
          h-14
          w-14
          items-center
          justify-center

          rounded-full
          bg-[#25D366]
          text-white

          shadow-[0_8px_24px_rgba(5,26,58,0.30)]

          md:hidden

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#051A3A]
          focus-visible:ring-offset-2

          ${
            isDragging
              ? `
                scale-110
                cursor-grabbing
                shadow-[0_12px_35px_rgba(5,26,58,0.45)]
                transition-[transform,box-shadow]
                duration-150
              `
              : `
                cursor-grab
                transition-[transform,box-shadow]
                duration-200
                hover:scale-105
                active:scale-95
              `
          }

          ${
            !hasCustomPosition
              ? hasMobileActionBar
                ? "bottom-[calc(5rem+env(safe-area-inset-bottom))]"
                : "bottom-[calc(1rem+env(safe-area-inset-bottom))]"
              : ""
          }
        `}
      >
        <FaWhatsapp
          className="pointer-events-none h-8 w-8"
          aria-hidden="true"
        />
      </a>

      {hasMobileActionBar && (
        <div
          aria-hidden="true"
          className="h-[calc(4.5rem+env(safe-area-inset-bottom))] sm:hidden"
        />
      )}
    </>
  );
}