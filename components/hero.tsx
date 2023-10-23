"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { Button } from "./ui/button";
import { Info, Play } from "lucide-react";

interface HeroProps {
  data: Discover;
}

const Hero = ({ data }: HeroProps) => {
  return (
    <section>
      <h1>Hero</h1>
    </section>
  );
};

export default Hero;
