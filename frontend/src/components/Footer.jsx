import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 text-sm text-gray-700">
            <div className="max-w-7xl py-2 sm:py-12 grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-4 sm:gap-10">
                <div>
                    <p className="text-[16px] sm:text-[20px] font-bold text-[#1677ff] mb-4">CareerCrafter.AI</p>
                    <p className="text-gray-600">
                        Your AI-powered career partner. Get expert tools to build resumes, analyze goals,
                        prepare for interviews, and land your dream job.
                    </p>
                    <p className="text-gray-600 mt-2">
                        Empower your career journey with intelligent tools designed for modern professionals.
                    </p>

                </div>

                <div>
                    <p className="text-[16px] sm:text-[20px] font-bold text-[#1677ff] mb-4">Company</p>
                    <ul className="space-y-2 text-gray-600">
                        <li>
                            <Link to="/" className="hover:text-[#1677ff] transition">Home</Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-[#1677ff] transition">About Us</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-[#1677ff] transition">Contact</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <p className="text-[16px] sm:text-[20px] font-bold text-[#1677ff] mb-4">Get In Touch</p>
                    <ul className="space-y-2 text-gray-600">
                        <li>📞 +1-212-246-5543</li>
                        <li>📧 contact@careercrafter.ai</li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-200 py-5 text-center text-gray-500 text-xs">
                © 2024 CareerCrafter.AI — All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
