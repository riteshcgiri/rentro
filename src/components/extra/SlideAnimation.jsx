import React, { useEffect, useState } from 'react';
import Title from '../Title';
import { corolaCross, GrandVitara, Ducati, Farari, LemboAve } from '../../assets/cars';
import { motion, AnimatePresence } from 'framer-motion';

const carImgs = [
  corolaCross,
  GrandVitara,
  Ducati,
  Farari,
  LemboAve
];

const ImageSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % carImgs.length);
    }, 10000); // 10 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-xl shadow-lg">
      <AnimatePresence mode="wait">
        <motion.img
          key={carImgs[index]}
          src={carImgs[index]}
          alt={`Car ${index + 1}`}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 1 }}
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
};

export default ImageSlider;
