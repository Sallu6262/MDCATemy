import { Link, useNavigate } from "react-router-dom"
import logoImg from "../assets/mdcat.svg"

const Navbar = ({user, setUser}) => {
  let name = user?.name;
  name = name?.split(' ')?.map(n => n[0].toUpperCase());

  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const logOutWebsite = async () => {
    const res = await fetch(`${API_URL}/users/logout`,{
      method: 'POST',
      credentials: 'include'
    });

    if(res?.status === 200){
      setUser(null);
      navigate('/');
    }
  }

  return (
    <nav className="sticky top-0 left-0 right-0 z-50" style={{ background: "rgba(18,18,18,0.88)", backdropFilter: "blur(24px) saturate(180%)", borderBottom: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.25)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3" style={{ minHeight: "72px" }}>
          <Link onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex h-full items-center flex-shrink-0">
            <img
              src={logoImg}
              alt="MDCATEMY"
              style={{
                width: "clamp(150px, 36vw, 320px)",
                height: "44px",
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
            {
              user?.payment_status === 'VERIFIED' ?
              <>
                <button onClick={logOutWebsite} type="button" style={{cursor: 'pointer' ,border: "1px solid #FFC600", borderRadius: "8px", padding: "0.5rem 1.25rem", color: "#FFC600", fontSize: "0.875rem", fontWeight: 500, display: "inline-flex", alignItems: "center", height: "38px", textDecoration: "none" }}>Logout</button>
                <button type="button" className="cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#FFC600]/40 bg-[#FFC600]/15 text-sm font-black text-[#FFC600]" aria-label="Profile initials">
                  {name}
                </button>
              </>
              : 
              <>
                <Link to="/login" style={{ border: "1px solid #FFC600", borderRadius: "8px", padding: "0.5rem 1.25rem", color: "#FFC600", fontSize: "0.875rem", fontWeight: 500, display: "inline-flex", alignItems: "center", height: "38px", textDecoration: "none" }}>Login</Link>
                <Link to="/signup" style={{ background: "#FFC600", borderRadius: "8px", padding: "0.5rem 1.25rem", color: "#181A18", fontSize: "0.875rem", fontWeight: 600, display: "inline-flex", alignItems: "center", height: "38px", textDecoration: "none" }}>Join today</Link>
              </>
            }
          </div>

          <details className="relative ml-auto lg:hidden">
            <summary className="list-none cursor-pointer rounded-lg border border-white/15 bg-white/[0.04] p-2 text-white/90 transition hover:bg-white/[0.08]" aria-label="Open menu">
              <span className="flex h-6 w-6 flex-col items-center justify-center gap-1">
                <span className="block h-0.5 w-5 rounded bg-white/90"></span>
                <span className="block h-0.5 w-5 rounded bg-white/90"></span>
                <span className="block h-0.5 w-5 rounded bg-white/90"></span>
              </span>
            </summary>
            <div className="absolute right-0 top-12 w-[min(18rem,90vw)] rounded-xl border border-white/10 bg-[#161616] p-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
              <div className="flex flex-col gap-1.5">
                <Link to="/books" className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/[0.06] hover:text-white">Books</Link>
                <Link to="/tests" className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/[0.06] hover:text-white">Tests</Link>
                <Link to="/pricing" className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/[0.06] hover:text-white">Pricing</Link>
                <Link to="/contact" className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/[0.06] hover:text-white">About Us</Link>
                <div className="my-1 h-px bg-white/10"></div>
                <Link to="/login" className="rounded-lg border border-[#FFC600]/60 px-3 py-2 text-center text-sm font-semibold text-[#FFC600]">Login</Link>
                <Link to="/join-today" className="rounded-lg bg-[#FFC600] px-3 py-2 text-center text-sm font-black uppercase tracking-wide text-[#181A18]">Join today</Link>
                <Link to="/login" className="rounded-lg border border-[#FFC600]/60 px-3 py-2 text-center text-sm font-semibold text-[#FFC600]">Login As Admin</Link>
                <button type="button" className="rounded-lg border border-white/20 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/[0.08] hover:text-white">Logout</button>
                <button type="button" className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg border border-[#FFC600]/40 bg-[#FFC600]/10 px-3 py-2 text-sm font-semibold text-[#FFC600]" aria-label="Profile initials">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#FFC600]/40 bg-[#FFC600]/15 text-xs font-black">UN</span>
                  <span>Profile</span>
                </button>
              </div>
            </div>
          </details>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
