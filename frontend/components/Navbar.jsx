import { Link } from "react-router-dom"
import logoImg from "../assets/mdcat.svg"

const Navbar = ({isLoggedIn}) => {
  return (
    <nav className="sticky top-0 left-0 right-0 z-50" style={{ background: "rgba(18,18,18,0.88)", backdropFilter: "blur(24px) saturate(180%)", borderBottom: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.25)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between" style={{ height: "72px" }}>
          <Link onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex h-full items-center flex-shrink-0">
            <img
              src={logoImg}
              alt="MDCATEMY"
              style={{
                width: "clamp(200px, 28vw, 320px)",
                height: "48px",
                objectFit: "contain",
                objectPosition: "left center",
              }}
            />
          </Link>
          <div className="hidden lg:flex items-center gap-8 ml-auto">
            <Link to="/books" className="text-sm font-medium hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>Books</Link>
            <Link to="/tests" className="text-sm font-medium hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>Tests</Link>
            <Link to="/pricing" className="text-sm font-medium hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>Pricing</Link>
            <Link to="/contact" className="text-sm font-medium hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>About Us</Link>
          </div>
          <div className="hidden lg:flex items-center gap-2 ml-6">
            <Link to="/login" style={{ border: "1px solid #FFC600", borderRadius: "8px", padding: "0.5rem 1.25rem", color: "#FFC600", fontSize: "0.875rem", fontWeight: 500, display: "inline-flex", alignItems: "center", height: "38px", textDecoration: "none" }}>Login</Link>
            <Link to="/join-today" style={{ background: "#FFC600", borderRadius: "8px", padding: "0.5rem 1.25rem", color: "#181A18", fontSize: "0.875rem", fontWeight: 600, display: "inline-flex", alignItems: "center", height: "38px", textDecoration: "none" }}>Join today</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
