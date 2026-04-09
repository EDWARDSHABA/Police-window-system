import React from "react";

const Footer = () => {
  return (
    <footer className="relative left-1/2 -translate-x-1/2 w-screen">

      {/* Top Blue Bar */}
      <div className="bg-blue-900 text-white text-center text-sm py-1">
        Developed By Finale G34, 2026
      </div>

      {/* Main Footer */}
      <div className="bg-yellow-600 text-white px-10 py-6 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li className="hover:underline cursor-pointer">Vacancies</li>
            <li className="hover:underline cursor-pointer">Rules and Policies</li>
            <li className="hover:underline cursor-pointer">Report</li>
          </ul>
        </div>

        {/* Our Pillars */}
        <div>
          <h3 className="font-semibold mb-2">Our Pillars</h3>
          <ul className="space-y-1">
            <li className="hover:underline cursor-pointer">Crime Prevention</li>
            <li className="hover:underline cursor-pointer">Law Enforcement</li>
            <li className="hover:underline cursor-pointer">Investigation</li>
            <li className="hover:underline cursor-pointer">Community Policing</li>
            <li className="hover:underline cursor-pointer">Traffic Management</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="font-semibold mb-2">Contact Us</h3>
          <ul className="space-y-1">
            <li> Headquarters, Zomba</li>
            <li> +265 997 631 984</li>
            <li>info@malawi.police.mw</li>
          </ul>
        </div>

        {/* Ranks */}
        <div>
          <h3 className="font-semibold mb-2">Ranks</h3>
          <ul className="space-y-1">
            <li>Commissioner, Deputy Inspector General</li>
            <li>Inspector General</li>
            <li>Superintendent</li>
            <li>Inspector, Chief Inspector</li>
            <li>Constableand Sub Inspector </li>
            <li></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-yellow-700 text-white text-center text-xs py-2">
        © 2026 Malawi Police Service. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;