import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import logoImg from "../assets/mdcat.svg"

const Navbar = ({user, setUser, isLanding, isEnrollmentFinished}) => {
  let name = user?.name;
  name = name?.split(' ')?.map(n => n[0].toUpperCase()).slice(0,2);

  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark');
  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('mdcatemy-theme', next);
    setTheme(next);
  };

  const logOutWebsite = async () => {
    const exists = document.querySelector('.exam-taking-screen');

    if(exists) return;

    const res = await fetch(`${API_URL}/users/logout`,{
      method: 'POST',
      credentials: 'include'
    });

    // console.log(res);
    if(res?.status === 200){
      navigate('/');
      setUser(null);
    }
  }

  const examGoingChecker = (e) => {
    const exists = document.querySelector('.exam-taking-screen');

    if(exists){
      e.preventDefault();
      return;
    }
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  return (
    <nav
      className="sticky top-0 left-0 right-0 z-100"
      style={{
        background: isLanding ? "#121212" : "rgb(var(--ui-bg-rgb, 18 18 18) / 1)",
        backdropFilter: "blur(24px) saturate(180%)",
        borderBottom: "1px solid rgb(var(--ui-text-rgb) / 0.08)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3" style={{ minHeight: "72px" }}>
          <Link to="/" 
            onClick={examGoingChecker} 
            className="flex h-full items-center flex-shrink-0">
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

          {
            isLanding ?
            <div className="hidden lg:flex items-center gap-8 ml-auto">
              <Link to="/" onClick={() => document.getElementById("about").scrollIntoView({behavior: 'smooth'})} className="text-sm font-medium hover:text-white transition-colors" style={{ color: "white", textDecoration: "none" }}>About</Link>
              <Link to="/tests-series-enrollment" className="text-sm font-medium hover:text-white transition-colors" style={{ color: "white", textDecoration: "none" }}>Test Session</Link>
            </div> 
            : 
            <button
              type="button"
              onClick={toggleTheme}
              className="ml-auto inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] p-2 text-white/90 transition hover:bg-white/[0.08] lg:ml-0"
              aria-label="Toggle theme"
              title={theme === 'light' ? 'Switch to dark' : 'Switch to light'}
            >
              {theme === 'light' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              )}
            </button>
          }

          <div className="hidden lg:flex items-center gap-3 ml-6">
            {
              user?.payment_status === 'VERIFIED' || user?.role === 'ADMIN' ?
              <>
                <button onClick={logOutWebsite} type="button" style={{backgroundColor: theme === 'dark' ? "" : "#FFC600", cursor: 'pointer' ,border: `1px solid ${theme === 'dark' ? "#FFC600" : "#000000"}`, borderRadius: "8px", padding: "0.5rem 1.25rem", color: theme === 'dark' ? "#FFC600" : "#000000", fontSize: "0.875rem", fontWeight: 500, display: "inline-flex", alignItems: "center", height: "38px", textDecoration: "none" }}>Logout</button>
                <button type="button" className="cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#FFC600]/40 bg-[#FFC600]/15 text-sm font-black text-[#FFC600]" aria-label="Profile initials">
                  {name}
                </button>
              </>
              : 
              <>
              <Link to="/login" style={{ border: "1px solid #FFC600", borderRadius: "8px", padding: "0.5rem 1.25rem", color: "#FFC600", fontSize: "0.875rem", fontWeight: 500, display: "inline-flex", alignItems: "center", height: "38px", textDecoration: "none" }}>Login</Link>
                {
                  !isEnrollmentFinished ?
                  <Link to="/batch-enrollment" style={{ background: "#FFC600", borderRadius: "8px", padding: "0.5rem 1.25rem", color: "#181A18", fontSize: "0.875rem", fontWeight: 600, display: "inline-flex", alignItems: "center", height: "38px", textDecoration: "none" }}>Enroll Now</Link>
                  : ''
                }
              </>
            }
          </div>

          <details className="relative lg:hidden">
            <summary className="list-none cursor-pointer rounded-lg border border-white/15 bg-white/[0.04] p-2 text-white/90 transition hover:bg-white/[0.08]" aria-label="Open menu">
              <span className="flex h-6 w-6 flex-col items-center justify-center gap-1">
                <span className="block h-0.5 w-5 rounded bg-white/90"></span>
                <span className="block h-0.5 w-5 rounded bg-white/90"></span>
                <span className="block h-0.5 w-5 rounded bg-white/90"></span>
              </span>
            </summary>

            <div className="absolute right-0 top-12 w-[min(18rem,90vw)] rounded-xl border border-white/10 bg-[#161616] p-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
              <div className="flex flex-col gap-1.5">
                {
                  isLanding ?
                  <>
                    <Link to="/" onClick={() => document.getElementById("about").scrollIntoView({behavior: 'smooth'})} className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/[0.06] hover:text-white">About</Link>
                    <Link to="/tests-series-enrollment" className="text-sm font-medium hover:text-white transition-colors" style={{ color: "white", textDecoration: "none" }}>Test Session</Link>
                  </> : ''
                }
                <div className="my-1 h-px bg-white/10"></div>
                {
                  user?.payment_status === 'VERIFIED' ? 
                  <>
                    <button type="button" className="rounded-lg border border-white/20 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/[0.08] hover:text-white">Logout</button>
                    <button type="button" className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg border border-[#FFC600]/40 bg-[#FFC600]/10 px-3 py-2 text-sm font-semibold text-[#FFC600]" aria-label="Profile initials">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#FFC600]/40 bg-[#FFC600]/15 text-xs font-black">{name}</span>
                      <span>Profile</span>
                    </button>
                  </> :
                  <>
                  <Link to="/login" className="rounded-lg bg-[#FFC600] px-3 py-2 text-center text-sm font-black uppercase tracking-wide text-[#181A18]">Login</Link>
                  {
                    !isEnrollmentFinished ?
                    <Link to="/batch-enrollment" className="rounded-lg bg-[#FFC600] px-3 py-2 text-center text-sm font-black uppercase tracking-wide text-[#181A18]">Enroll Now</Link>
                    : ''
                  }
                  </>
                }
              </div>
            </div>
          </details>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
