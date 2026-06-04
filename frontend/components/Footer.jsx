import { Link } from "react-router-dom"

const Footer = () => {
  const navigateToComponent = (id) => {
    const url = window.location.href;
    if(url.includes('/batch-enrollment')){
      document.getElementById(id).scrollIntoView({behavior: 'smooth'});
    }
  }

  return (
    <footer
      className="site-footer"
      style={{
        background: "#181A18",
        borderTop: "1px solid #2E302E",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">

          <div className="col-span-2">
            <img src="/../assets/mdcat.svg" alt="MDCATEMY" style={{ height: "32px", width: "auto", marginBottom: "1.25rem" }} />
            <p className="max-w-xs text-sm leading-relaxed text-[#A8ACA8]">Pakistan&apos;s most intensive MDCAT preparation system. Built by a warrior, for warriors.</p>
            <div className="flex items-center gap-4 mt-6">
              <a href="https://instagram.com/mdcatemy" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-white/10" style={{ background: "rgb(var(--ui-text-rgb) / 0.06)", border: "1px solid rgb(var(--ui-text-rgb) / 0.1)", color: "rgb(var(--ui-text-rgb) / 0.6)" }} aria-label="Instagram">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://youtube.com/@mdcatemy" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-white/10" style={{ background: "rgb(var(--ui-text-rgb) / 0.06)", border: "1px solid rgb(var(--ui-text-rgb) / 0.1)", color: "rgb(var(--ui-text-rgb) / 0.6)" }} aria-label="YouTube">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
              </a>
              <a href="https://twitter.com/mdcatemy" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-white/10" style={{ background: "rgb(var(--ui-text-rgb) / 0.06)", border: "1px solid rgb(var(--ui-text-rgb) / 0.1)", color: "rgb(var(--ui-text-rgb) / 0.6)" }} aria-label="Twitter">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <ul className="space-y-3">
              <li><Link to="/batch-enrollment" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: "rgb(var(--ui-text-rgb) / 0.45)", textDecoration: "none" }}>Batch Enrollment</Link></li>
              <li><Link to="/" onClick={() => document.getElementById("study-material").scrollIntoView({behavior: 'smooth'})} className="text-sm transition-colors duration-200 hover:text-white" style={{ color: "rgb(var(--ui-text-rgb) / 0.45)", textDecoration: "none" }}>Study Material</Link></li>
              <li><Link to="/test-series-enrollment" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: "rgb(var(--ui-text-rgb) / 0.45)", textDecoration: "none" }}>Test Session</Link></li>
              <li><Link to="/quiz-builder-enrollment" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: "rgb(var(--ui-text-rgb) / 0.45)", textDecoration: "none" }}>Quiz Builder</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-white font-bold text-xs uppercase tracking-widest mb-5">Company</p>
            <ul className="space-y-3">
              <li><Link to="/" onClick={() => document.getElementById("about").scrollIntoView({behavior: 'smooth'})} className="text-sm transition-colors duration-200 hover:text-white" style={{ color: "rgb(var(--ui-text-rgb) / 0.45)", textDecoration: "none" }}>About Us</Link></li>
              <li><Link to="/batch-enrollment" onClick={() => navigateToComponent("scholarships")} state={!window.location.href.includes('/batch-enrollment') ? {comingFromFooter: true, id: "scholarships"} : null} className="text-sm transition-colors duration-200 hover:text-white" style={{ color: "rgb(var(--ui-text-rgb) / 0.45)", textDecoration: "none" }}>Scholarship</Link></li>
              <li><Link to="/batch-enrollment" onClick={() => navigateToComponent("contact")} state={!window.location.href.includes('/batch-enrollment') ? {comingFromFooter: true, id: "contact"} : null} className="text-sm transition-colors duration-200 hover:text-white" style={{ color: "rgb(var(--ui-text-rgb) / 0.45)", textDecoration: "none" }}>Contact</Link></li>
              <li><span className="text-[#FFFFFF] text-sm transition-colors duration-200 hover:text-white" style={{textDecoration: "underline" }}>mdcatemy@gmail.com</span></li>
            </ul>
          </div>

          <div>
            <p className="text-white font-bold text-xs uppercase tracking-widest mb-5">Legal</p>
            <ul className="space-y-3">
              <li><Link to="/privacy-policy" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: "rgb(var(--ui-text-rgb) / 0.45)", textDecoration: "none" }}>Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: "rgb(var(--ui-text-rgb) / 0.45)", textDecoration: "none" }}>Terms And Conditions</Link></li>
              <li><Link to="/batch-enrollment" onClick={() => navigateToComponent("refund")} state={!window.location.href.includes('/batch-enrollment') ? {comingFromFooter: true, id: "refund"} : null} className="text-sm transition-colors duration-200 hover:text-white" style={{ color: "rgb(var(--ui-text-rgb) / 0.45)", textDecoration: "none" }}>Refund Policy</Link></li>
              <li><Link to="/careers" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: "rgb(var(--ui-text-rgb) / 0.45)", textDecoration: "none" }}>Careers</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgb(var(--ui-text-rgb) / 0.08)" }}>
          <p className="text-sm" style={{ color: "rgb(var(--ui-text-rgb) / 0.25)" }}>&copy; 2026 MDCATEMY. All rights reserved.</p>
          <p className="text-xs font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.4)" }}>Train Like a Warrior. Score Like a Legend.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
