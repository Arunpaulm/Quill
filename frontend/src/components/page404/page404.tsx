import React, { FC, useRef, useEffect } from "react";
// import { Page404Wrapper } from "./page404.styled";
// import "typeface-righteous";

// interface Page404Props {}
// const canvasRef = useRef<HTMLCanvasElement>(null);
// const cordcanvasRef = useRef<HTMLCanvasElement>(null);

// function runAnimation() {
//   function drawVisor() {
//     // if (canvasRef.current) {
//     const canvas = canvasRef.current as HTMLCanvasElement;
//     const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

//     ctx.beginPath();
//     ctx.moveTo(5, 45);
//     ctx.bezierCurveTo(15, 64, 45, 64, 55, 45);

//     ctx.lineTo(55, 20);
//     ctx.bezierCurveTo(55, 15, 50, 10, 45, 10);

//     ctx.lineTo(15, 10);

//     ctx.bezierCurveTo(15, 10, 5, 10, 5, 20);
//     ctx.lineTo(5, 45);

//     ctx.fillStyle = "#2f3640";
//     ctx.strokeStyle = "#f5f6fa";
//     ctx.fill();
//     ctx.stroke();
//     // }
//   }

//   const cordcanvas = cordcanvasRef.current as HTMLCanvasElement;
//   const ctx = cordcanvas.getContext("2d") as CanvasRenderingContext2D;

//   let y1 = 160;
//   let y2 = 100;
//   let y3 = 100;

//   let y1Forward = true;
//   let y2Forward = false;
//   let y3Forward = true;

//   function animate() {
//     requestAnimationFrame(animate);
//     const { innerWidth: width, innerHeight: height } = window;
//     ctx.clearRect(0, 0, width, height);

//     ctx.beginPath();
//     ctx.moveTo(130, 170);
//     ctx.bezierCurveTo(250, y1, 345, y2, 400, y3);

//     ctx.strokeStyle = "white";
//     ctx.lineWidth = 8;
//     ctx.stroke();

//     if (y1 === 100) {
//       y1Forward = true;
//     }

//     if (y1 === 300) {
//       y1Forward = false;
//     }

//     if (y2 === 100) {
//       y2Forward = true;
//     }

//     if (y2 === 310) {
//       y2Forward = false;
//     }

//     if (y3 === 100) {
//       y3Forward = true;
//     }

//     if (y3 === 317) {
//       y3Forward = false;
//     }

//     y1Forward ? (y1 += 1) : (y1 -= 1);
//     y2Forward ? (y2 += 1) : (y2 -= 1);
//     y3Forward ? (y3 += 1) : (y3 -= 1);
//   }

//   drawVisor();
//   animate();
// }

// const Page404: FC<Page404Props> = () => {
//   useEffect(() => {
//     runAnimation();
//   }, []);

//   return (
//     <Page404Wrapper>
//       <div className="NoPage" data-testid="NoPage">
//         <div className="moon"></div>
//         <div className="moon__crater moon__crater1"></div>
//         <div className="moon__crater moon__crater2"></div>
//         <div className="moon__crater moon__crater3"></div>

//         <div className="star star1"></div>
//         <div className="star star2"></div>
//         <div className="star star3"></div>
//         <div className="star star4"></div>
//         <div className="star star5"></div>

//         <div className="error">
//           <div className="error__title">404</div>
//           <div className="error__subtitle">Hmmm...</div>
//           <div className="error__description">
//             It looks like the developer fell asleep
//           </div>
//         </div>

//         <div className="astronaut">
//           <div className="astronaut__backpack"></div>
//           <div className="astronaut__body"></div>
//           <div className="astronaut__body__chest"></div>
//           <div className="astronaut__arm-left1"></div>
//           <div className="astronaut__arm-left2"></div>
//           <div className="astronaut__arm-right1"></div>
//           <div className="astronaut__arm-right2"></div>
//           <div className="astronaut__arm-thumb-left"></div>
//           <div className="astronaut__arm-thumb-right"></div>
//           <div className="astronaut__leg-left"></div>
//           <div className="astronaut__leg-right"></div>
//           <div className="astronaut__foot-left"></div>
//           <div className="astronaut__foot-right"></div>
//           <div className="astronaut__wrist-left"></div>
//           <div className="astronaut__wrist-right"></div>

//           <div className="astronaut__cord">
//             <canvas
//               ref={cordcanvasRef}
//               id="cord"
//               height="500px"
//               width="500px"
//             ></canvas>
//           </div>

//           <div className="astronaut__head">
//             <canvas
//               ref={canvasRef}
//               id="visor"
//               width="60px"
//               height="60px"
//             ></canvas>
//             <div className="astronaut__head-visor-flare1"></div>
//             <div className="astronaut__head-visor-flare2"></div>
//           </div>
//         </div>
//       </div>
//     </Page404Wrapper>
//   );
// };

// export default Page404;

export default function Example() {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </a>
            {/* <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a> */}
          </div>
        </div>
      </main>
    </>
  )
}
