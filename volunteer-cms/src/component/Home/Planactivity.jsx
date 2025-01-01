import React from 'react';
import { motion } from 'framer-motion';

const PlanActivity = () => {
  return (
    <div>
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1E1E1E]"
        >
          แผนสำหรับกิจกรรมจิตอาสา
        </motion.h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-4 lg:gap-2">
        {[1, 2, 3, 4].map((activityNum) => (
          <motion.div
            key={activityNum}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: (activityNum - 1) * 0.2, duration: 0.5, ease: "easeOut" }}
            className="bg-white p-4 rounded-lg shadow-md w-full max-w-[300px] h-[300px] flex flex-col items-center justify-center cursor-pointer mx-auto"
          >
            <div className="bg-[#C1F1C6] rounded-full p-3 mb-4 flex justify-center items-center w-[140px] h-[140px]">
              <img
                src={`activity${activityNum}.svg`}
                alt={`Activity ${activityNum}`}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 text-[#1E1E1E] text-center">
              กิจกรรมแนะนำ {activityNum}
            </h3>
            <p className="text-[#4A4A4A] text-sm md:text-base text-center">
              สำหรับนักศึกษาปีที่ {activityNum}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PlanActivity;
