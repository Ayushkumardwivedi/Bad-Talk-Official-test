import { motion } from "framer-motion";
import React from "react";
import eventvideo from "/videopast.mp4";
import medicapsImage from "/logo.png";

export default function PastEvents() {
  return (
    <main className="h-full w-full  max-w-7xl mx-auto py-8">
      <div className="relative w-fit mx-auto mb-16">
        <span className="h-[1px] w-36 bg-white absolute -bottom-2 -right-9" />
        <span className="h-[1px] w-36 bg-white absolute -top-2 -left-9" />
        <h1 className="text-center font-bold text-5xl">
          Past <span className="text-red-700">Events</span>
        </h1>
      </div>
      <section
        className="h-full w-full gap-12  flex flex-col
        min-[800px]:flex-row mx-auto py-12 px-4"
      >
        <div className="w-full hidden min-[1180px]:flex  min-[1230px]:pr-16">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="border rounded-2xl h-full w-full overflow-hidden"
          >
            <video
              className="h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={eventvideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
        <div className="flex flex-1  flex-col items-end">
          <div className="flex flex-col w-full min-[800px]:max-w-96 pt-3 pb-6">
            <h2 className="text-3xl font-semibold">
              Pas<span className="text-red-600">t Ev</span>
              ents
            </h2>
            <p>
              From inspiring keynote speakers to interactive workshops, our past
              college events brought together bright minds, bold ideas, and
              boundless energy—sparking innovation, collaboration, and
              unforgettable experiences for students and leaders alike!{" "}
            </p>
          </div>
          <div className="aspect-[16/11] w-full lg:w-96 bg-slate-700 rounded-2xl p-4 relative flex flex-col justify-between">
            <div className="absolute top-4 left-4">
              <img
                src={medicapsImage}
                alt="IPS Academy"
                className="w-20 h-20 rounded-full object-cover border-2 border-red-500"
              />
            </div>
            <div className="h-fit mt-auto">
              <h4 className="font-semibold text-xl">IPS ACADEMY</h4>
              <p className="text-neutral-200 text-sm">
                At IPS Academy, B.A.D. Talks brought the buzz! From CEO stories
                to hands-on workshops, students connected, learned, and left
                fired up to chase their entrepreneurial dreams with fresh
                ideas!.
              </p>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="flex flex-1 flex-col gap-12"
        >
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="aspect-[16/11] w-full lg:w-96 bg-slate-700 rounded-2xl p-4 relative flex flex-col justify-between"
          >
            <div className="absolute top-4 left-4">
              <img
                src={medicapsImage}
                alt="Medicaps University"
                className="w-20 h-20 rounded-full object-cover border-2 border-red-500"
              />
            </div>
            <div className="h-fit mt-auto">
              <h4 className="font-semibold text-xl">MEDICAPS UNIVERSITY</h4>
              <p className="text-neutral-200 text-sm">
                At MediCaps University, B.A.D. Talks turned ideas into action!
                From CEO secrets to success to lively sessions sparking
                innovation, it was a day where dreams met determination and
                magic happened.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="aspect-[16/11] w-full lg:w-96 bg-slate-700 rounded-xl p-4 relative flex flex-col justify-between"
          >
            <div className="absolute top-4 left-4">
              <img
                src={medicapsImage}
                alt="IPS Academy"
                className="w-20 h-20 rounded-full object-cover border-2 border-red-500"
              />
            </div>
            <div className="h-fit mt-auto">
              <h4 className="font-semibold text-xl">IPS ACADEMY</h4>
              <p className="text-neutral-200 text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod
                consequatur, corporis quidem rem culpa veniam perspiciatis
                pariatur ad optio hic magnam tempore voluptatibus voluptate quo!
                Voluptas perspiciatis provident quas nobis?
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
