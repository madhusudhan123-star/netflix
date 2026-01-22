import React from "react";
import { Link } from "react-router-dom";
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

export default function Home() {
  return (
    <div className="bg-black">
      <div className="min-h-screen text-white bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/51c1d7f7-3179-4a55-93d9-704722898999/be90e543-c951-40d0-9ef5-e067f3e33d16/IN-en-20240610-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] bg-cover bg-center">
        <div className="bg-custom-gradient">
          <div className="bg-black bg-opacity-40">
            <nav className="flex items-center justify-between px-4 sm:px-8 py-4 bg-transparent">
              <div>
                <Link to="/">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                    alt="Netflix Logo"
                    className="w-20 sm:w-32"
                  />
                </Link>
              </div>
              <div>
                <button className="bg-red-600 text-white px-3 py-1 rounded-md">
                  <Link to="/login">Sign In</Link>
                </button>
              </div>
            </nav>
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
              <h1 className="text-2xl sm:text-4xl font-black mb-4">
                Unlimited movies, TV shows and more
              </h1>
              <p className="text-lg mb-5">Watch anywhere. Cancel anytime.</p>
              <p className="mb-4">
                Ready to watch? Enter your email to create or restart your
                membership.
              </p>
              <div className="mt-3">
                <button className="bg-red-600 text-white py-2 px-4 rounded">
                  <Link to="/sign_start">Get Started</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-2 bg-gray-800"></div>
      
      <div className="py-16 px-4 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:mr-10 mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-white text-2xl sm:text-4xl font-extrabold mb-4">
              Enjoy on your TV
            </h2>
            <p className="text-white text-lg font-normal md:w-4/5">
              Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray
              players and more.
            </p>
          </div>
          <div className="relative max-w-md">
            <img
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
              alt="TV"
              className="w-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <video
                className="w-[73%] h-[55%]"
                autoPlay
                playsInline
                muted
                loop
              >
                <source
                  src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-in-0819.m4v"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-2 bg-gray-800"></div>
      
      <div className="py-16 px-4 sm:px-8">
        <div className="flex flex-col md:flex-row-reverse items-center justify-center">
          <div className="md:ml-10 mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-white text-2xl sm:text-4xl font-extrabold mb-4">
              Watch everywhere
            </h2>
            <p className="text-white text-lg font-normal md:w-4/5">
              Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.
            </p>
          </div>
          <div className="relative max-w-md">
            <img
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile-in.png"
              alt="Devices"
              className="w-full"
            />
            <div className="absolute top-[20%] left-[17%] w-[65%]">
              <video
                autoPlay
                playsInline
                muted
                loop
                className="w-full"
              >
                <source
                  src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices-in.m4v"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-2 bg-gray-800"></div>
      
      <div className="py-16 px-4 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:mr-10 mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-white text-2xl sm:text-4xl font-extrabold mb-4">
              Create profiles for kids
            </h2>
            <p className="text-white text-lg font-normal md:w-4/5">
              Send children on adventures with their favorite characters in a space made just for them—free with your membership.
            </p>
          </div>
          <div className="max-w-md">
            <img
              src="https://occ-0-1973-2164.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABVr8nYuAg0xDpXDv0VI9HUoH7r2aGp4TKRCsKNQrMwxzTtr-NlwOHeS8bCI2oeZddmu3nMYr3j9MjYhHyjBASb1FaOGYZNYvPBCL.png?r=54d"
              alt="Kids Profile"
              className="w-full"
            />
          </div>
        </div>
      </div>
      
      <div className="h-2 bg-gray-800 mt-10"></div>
      
      <div className="py-16 px-4 sm:px-8">
        <h2 className="text-white text-2xl sm:text-4xl font-extrabold mb-8 text-center">
          Frequently asked questions
        </h2>
        <AccordionPrimitive.Root type="single" collapsible className="w-full max-w-3xl mx-auto">
          {[
            { question: "What is Netflix?", answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices." },
            { question: "How much does Netflix cost?", answer: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts." },
            { question: "Where can I watch?", answer: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles." },
            { question: "How do I cancel?", answer: "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime." },
            { question: "What can I watch on Netflix?", answer: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want." },
            { question: "Is Netflix good for kids?", answer: "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space." }
          ].map((item, index) => (
            <AccordionPrimitive.Item key={index} value={`item-${index + 1}`} className="mb-2 border-b border-gray-600 last:border-none">
              <AccordionPrimitive.Header>
                <AccordionPrimitive.Trigger className="flex justify-between items-center py-4 w-full text-white text-left">
                  <span>{item.question}</span>
                  <ChevronDownIcon className="w-6 h-6 text-white" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content className="py-4 text-white">
                {item.answer}
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </div>
      
      <footer className="bg-black py-8 mt-10 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <p className="text-gray-400 mb-4 md:mb-0">
              Questions? Call <a href="tel:6309792221" className="underline">6309792221</a>
            </p>
            <div className="flex flex-wrap justify-center space-x-4">
              <a href="https://help.netflix.com/support/412" className="text-gray-400 underline mb-2">FAQ</a>
              <a href="https://www.netflix.com/cookiePreferences" className="text-gray-400 underline mb-2">Cookie Preferences</a>
              <a href="https://www.netflix.com/gift-cards" className="text-gray-400 underline mb-2">Gift Card Terms</a>
              <a href="https://help.netflix.com/legal/termsofuse" className="text-gray-400 underline mb-2">Legal Notices</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}