import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Netflix</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://about.netflix.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  About Netflix
                </a>
              </li>
              <li>
                <a href="https://about.netflix.com/en/newsroom" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Newsroom
                </a>
              </li>
              <li>
                <a href="https://jobs.netflix.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Jobs
                </a>
              </li>
              <li>
                <a href="https://www.netflix.com/gift-cards" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Gift Cards
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Get Help</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://help.netflix.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Help Center
                </a>
              </li>
              <li>
                <a href="https://www.netflix.com/youraccount" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Account
                </a>
              </li>
              <li>
                <a href="https://media.netflix.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Media Center
                </a>
              </li>
              <li>
                <a href="https://ir.netflix.net/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Investor Relations
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">More</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://devices.netflix.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Ways to Watch
                </a>
              </li>
              <li>
                <a href="https://www.netflix.com/redeem" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Redeem Gift Cards
                </a>
              </li>
              <li>
                <a href="https://help.netflix.com/legal/termsofuse" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="https://help.netflix.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.facebook.com/netflix" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com/netflix" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/netflix" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/netflix" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-sm">
          <p>&copy; {new Date().getFullYear()} Netflix, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;