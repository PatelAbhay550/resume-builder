import Link from 'next/link';
import React from 'react';

const Hero = () => {
  return (
    <main className="bg-[#181818] text-white min-h-screen">
        <div className="header-nav h-[60px] bg-[#181818] border-b-[1px] border-[#2D2D2D]">
            <nav className="flex items-center justify-between px-6 py-4">
                <div className="logo">
                <Link href="/">
                    <p className="text-2xl font-bold">Resume Builder</p>
                </Link>
                </div>
                <ul className="nav-links flex items-center gap-8">
               
                <li>
                    <Link href="/dashboard">
                    <p className="text-[#F3F8FB] font-bold px-4 py-1 rounded-md bg-transparent hover:border-2 border-2 hover:border-[#F3F8FB] border-[#F3F8FB] transition-all duration-300 ease-in-out tracking-wide">Start Making Resume</p>
                    </Link>
                </li>
                </ul>
            </nav>
        </div>
      <div className="sc1 flex h-[100vh - 60px] items-center py-16">
        {/* Text Section */}
        <div className="txt px-6 ml-7 flex flex-col items-start justify-center h-full w-1/2 space-y-8">
          <h1 className="text-6xl font-bold leading-[1.1] -mb-6">
            Professional <span className="make-highlight bg-[#F3F8FB] text-zinc-900">Resume</span> <br /> For Your Dream Job
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Create Free Resume for free. <span className="make-highlight bg-[#F3F8FB] text-zinc-900"> No Signup required.</span>
          </p>
          <div className="cta flex items-center gap-8">
            <Link href="/dashboard">
              <button className="text-[#F3F8FB] font-bold px-10 py-3 rounded-md bg-transparent hover:border-2 border-2 hover:border-[#F3F8FB] border-[#F3F8FB] transition-all duration-300 ease-in-out tracking-wide">
                Watch Demo First
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="bg-[#F3F8FB] text-zinc-900 font-bold px-10 py-3 rounded-md hover:bg-transparent hover:border-2 border-2 border-transparent hover:border-[#F3F8FB] hover:text-[#F3F8FB] transition-all duration-300 ease-in-out tracking-wide">
                Start Now For Free
              </button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="img w-1/2 pt-9 h-full flex items-center justify-center">
          <div className="mask-of-image-container from-transparent to-slate-400/20 bg-gradient-to-br w-[50%] h-full rounded-lg overflow-hidden">
            <img
              className="w-full h-[65vh] object-cover"
              src="https://pbs.twimg.com/media/GfEtqaRaUAAHqp4?format=png&name=small"
              alt="person looking left"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
