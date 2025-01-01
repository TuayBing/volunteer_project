import React from "react";
import { motion } from "framer-motion";

function Contactimage() {
  const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <div className="flex items-center justify-center">
      <motion.img
        src="/contact.svg"
        alt="contact"
        className="w-[700px] h-[700px] p-4"
        initial="hidden"
        animate="visible"
        variants={imageVariants}
      />
    </div>
  );
}

export default Contactimage;
