import { FaGithub, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E7EB] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="font-editorial italic text-xl">Arya</span>
          <span className="text-sm font-bold">Ajisadda</span>
          <span className="text-xs text-neutral-400 ml-2">© 2026. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6 text-neutral-600 text-sm">
          <a href="https://github.com" target="_blank" rel="noopener" className="hover:text-black transition-colors flex items-center gap-1.5">
            <FaGithub className="text-base" /> GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener" className="hover:text-black transition-colors flex items-center gap-1.5">
            <FaLinkedin className="text-base" /> LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}