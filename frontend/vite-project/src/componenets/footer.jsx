import { FaLeaf, FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Predictions", path: "/predict-page" },
    { name: "Contact", path: "/contact" }
  ];

  const features = [
    { name: "Crop Prediction", path: "/predict-page/crop-predict" },
    { name: "Yield Prediction", path: "/predict-page/yield-predict" },
    { name: "Disease Detection", path: "/predict-page/disease-predict" }
  ];

  const socials = [
    { icon: <FaGithub className="w-5 h-5" />, link: "#" },
    { icon: <FaLinkedin className="w-5 h-5" />, link: "#" },
    { icon: <FaTwitter className="w-5 h-5" />, link: "#" }
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-emerald-50 border-t border-emerald-100">
      
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                <FaLeaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">AgroMind</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Empowering farmers with AI-driven insights for smarter agriculture.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-600 hover:text-emerald-600 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Features</h4>
            <ul className="space-y-3">
              {features.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-600 hover:text-emerald-600 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Connect</h4>
            <div className="flex gap-3">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:border-emerald-200 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-emerald-100">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            <p className="text-gray-600 text-sm">
              © {currentYear} AgroMind. All rights reserved.
            </p>

            <p className="text-gray-600 text-sm flex items-center gap-1">
              Made with <FaHeart className="w-4 h-4 text-rose-500" /> for Farmers
            </p>

          </div>
        </div>
      </div>

    </footer>
  );
}