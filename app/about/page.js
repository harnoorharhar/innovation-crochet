// import Image from "next/image";

// export const metadata = {
//   title: "About Us | Crochet",
//   description: "Learn more about our crochet brand and handmade creations.",
// };

// export default function Page() {
//   return (
//     <main className="min-h-screen bg-brand-cream">
//       <section className="relative overflow-hidden bg-[#172554] pt-20 pb-28">
//         <div className="absolute top-6 left-10 h-3 w-3 rounded-full bg-[#FDBA9A]" />

//         <div className="absolute top-24 left-24 h-6 w-6 rounded-full border-2 border-[#3B82F6]" />

//         <div className="absolute top-40 left-16 h-3 w-3 rounded-full bg-[#F9A8D4]" />

//         <div className="absolute top-28 right-36 h-8 w-8 rounded-full bg-[#FDBA9A]" />

//         <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-[#1E3A8A]/40" />

//         <div className="absolute -right-16 top-20 h-52 w-52 rounded-full bg-[#3B82F6]/20" />

//         <div className="relative z-10 flex flex-col items-center">
//           <span className="font-serif text-5xl font-bold text-white md:text-[50px]">
//             About Us
//           </span>

//           <div className="mt-5 flex items-center gap-3 text-sm">
//             <span className="text-[#3B82F6]">⌂</span>

//             <span className="text-[#FFF7ED]/70">Crochet</span>

//             <span className="text-xl text-white/70">›</span>

//             <span className="text-[#FDBA9A]">About Us</span>
//           </div>
//         </div>

//         <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
//           <svg
//             className="relative block h-[90px] w-full md:h-[115px]"
//             viewBox="0 0 1200 120"
//             preserveAspectRatio="none"
//           >
//             <path
//               d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z"
//               fill="#1E3A8A"
//               fillOpacity="0.7"
//             />

//             <path
//               d="M0,25 C200,100 450,10 700,75 C950,140 1050,30 1200,60 L1200,120 L0,120 Z"
//               fill="#3B82F6"
//               fillOpacity="0.45"
//             />

//             <path
//               d="M0,55 C300,120 600,20 900,85 C1050,115 1150,70 1200,80 L1200,120 L0,120 Z"
//               fill="#FFF7ED"
//             />
//           </svg>
//         </div>
//       </section>

//       <section className="px-6 pt-6 pb-20 lg:px-24 lg:pt-8">
//         <div className="mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-2">
//           <div className="relative mx-auto h-[480px] w-full max-w-[620px]">
//             <div
//               className="
//                 absolute
//                 left-4
//                 top-12
//                 h-[385px]
//                 w-[440px]
//                 rounded-[24px]
//                 bg-[#FDBA9A]
//                 sm:left-8
//                 sm:w-[450px]
//               "
//             />

//             <div
//               className="
//                 absolute
//                 left-8
//                 top-8
//                 h-[390px]
//                 w-[450px]
//                 max-w-[calc(100%-32px)]
//                 overflow-hidden
//                 rounded-[24px]
//                 bg-[#F9A8D4]
//                 shadow-sm
//               "
//             >
//               <Image
//                 src="/hero-img.png"
//                 alt="Handmade crochet creation"
//                 fill
//                 priority
//                 sizes="(max-width: 1024px) 450px, 450px"
//                 className="object-cover"
//               />
//             </div>

//             <div
//               className="
//                 absolute
//                 right-2
//                 top-24
//                 z-20
//                 flex
//                 h-[145px]
//                 w-[145px]
//                 rotate-[-7deg]
//                 flex-col
//                 items-center
//                 justify-center
//                 rounded-full
//                 border-[5px]
//                 border-[#FDBA9A]
//                 bg-[#FFF7ED]
//                 shadow-md
//               "
//             >
//               <span className="text-4xl font-bold text-brand-navy">2+</span>

//               <span className="mt-1 text-center text-sm font-semibold leading-4 text-[#172554]">
//                 Years of
//                 <br />
//                 Experience
//               </span>
//             </div>
//           </div>

//           <div className="max-w-[600px]">
//             <p className="mb-5 text-sm font-semibold uppercase tracking-[2px] text-[#DC2626]">
//               About Us
//             </p>

//             <h2 className="font-serif text-4xl font-bold leading-[1.15] text-[#172554] md:text-5xl">
//               Creating with Love,
//               <br />
//               Inspiring <span className="text-brand-pink">Creativity</span>
//             </h2>

//             <p className="mt-7 text-[16px] leading-7 text-[#172554]/70">
//               We create beautiful handmade crochet pieces designed with care,
//               creativity, and attention to detail. Every piece is made to bring
//               warmth, personality, and a little bit of joy into your everyday
//               life.
//             </p>

//             <p className="mt-4 text-[16px] leading-7 text-[#172554]/70">
//               From cozy accessories to unique handmade creations, every item is
//               thoughtfully crafted using quality materials and a whole lot of
//               love.
//             </p>

//             <button
//               className="
//                 mt-8
//                 rounded-full
//                 bg-brand-navy
//                 px-8
//                 py-4
//                 font-semibold
//                 text-white
//                 shadow-lg
//                 transition
//                 duration-300
//                 hover:bg-brand-pink
//                 hover:shadow-xl
//               "
//             >
//               Discover More
//             </button>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }
