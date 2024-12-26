"use client";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const hero = [
	{
		image: "/hero-1.jpg",
	},
	{
		image: "/hero-2.jpg",
	},
	{
		image: "/hero-3.jpg",
	},
];

export default function HomeSlider() {
	const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
	return (
		<Carousel
			plugins={[plugin.current]}
			className="w-full relative"
			onMouseEnter={plugin.current.stop}
			onMouseLeave={plugin.current.reset}
		>
			<CarouselContent className="ml-0">
				{hero.map((item, index) => (
					<CarouselItem key={index} className="p-0 min-w-full">
						<Card className="border-none p-0">
							<CardContent className="min-w-full min-h-[70vh] lg:min-h-[80vh] xl:min-h-[100vh_-_100px] p-0 relative">
								<Image
									src={item.image}
									fill
									alt="banner"
									className="object-cover"
									sizes="(max-width: 768px) 100vw, 60vw"
									priority={index === 0}
								/>
							</CardContent>
						</Card>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="absolute left-8 z-3 text-white" />
			<CarouselNext className="absolute right-8 z-3 text-white" />
		</Carousel>
	);
}

// 'use client'

// import { useState, useEffect, useCallback } from 'react'
// import useEmblaCarousel from 'embla-carousel-react'
// import { Button } from "@/components/ui/button"
// import { ChevronLeft, ChevronRight } from 'lucide-react'

// const slides = [
//   {
//     title: "Convenient Home Lab Testing",
//     description: "Experience the comfort of professional lab testing without leaving your home. ACCESS brings certified phlebotomists to your doorstep in Calicut, Ernakulam, Palakkad, and Thrissur.",
// 	image: "/hero-1.jpg",
//   },
//   {
//     title: "Comprehensive Health Checkups",
//     description: "From COVID-19 tests to full body health packages, ACCESS offers a wide range of essential medical tests. Take control of your health with our convenient and reliable services.",
// 	image: "/hero-2.jpg",
//   },
//   {
//     title: "Fast, Secure Results",
//     description: "Your health information matters. Receive your test results quickly and securely via email or WhatsApp. Trust ACCESS for accurate, timely, and confidential lab testing.",
// 	image: "/hero-3.jpg",
//   },
// ]

// export default function HomeSlider() {
//   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
//   const [currentSlide, setCurrentSlide] = useState(0)

//   const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
//   const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

//   const onSelect = useCallback(() => {
//     if (!emblaApi) return
//     setCurrentSlide(emblaApi.selectedScrollSnap())
//   }, [emblaApi])

//   useEffect(() => {
//     if (!emblaApi) return
//     onSelect()
//     emblaApi.on('select', onSelect)
//   }, [emblaApi, onSelect])

//   return (
//     <div className="relative overflow-hidden" ref={emblaRef}>
//       <div className="flex">
//         {slides.map((slide, index) => (
//           <div key={index} className="flex-[0_0_100%] min-w-0">
//             <div className={`relative h-[500px] bg-[url('/${slide.image}')]`}>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="text-center px-4 max-w-4xl">
//                   <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-800">{slide.title}</h2>
//                   <p className="text-lg md:text-xl mb-8 text-blue-600">{slide.description}</p>
//                   <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
//                     Book a Test
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <Button
//         variant="outline"
//         size="icon"
//         className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-blue-600 hover:bg-blue-100"
//         onClick={scrollPrev}
//       >
//         <ChevronLeft className="h-4 w-4" />
//       </Button>
//       <Button
//         variant="outline"
//         size="icon"
//         className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-blue-600 hover:bg-blue-100"
//         onClick={scrollNext}
//       >
//         <ChevronRight className="h-4 w-4" />
//       </Button>
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {slides.map((_, index) => (
//           <div
//             key={index}
//             className={`w-3 h-3 rounded-full ${
//               currentSlide === index ? 'bg-blue-600' : 'bg-blue-300'
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }
