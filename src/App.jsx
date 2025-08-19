import React, { useMemo, useRef, useState, useEffect } from "react";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import * as TbIcons from "react-icons/tb";
import * as DiIcons from "react-icons/di";
import { projects, experience, education, courses, skills } from "./data";
import emailjs from "emailjs-com";
import { motion, useMotionValue, useSpring, useTransform, useAnimation } from "framer-motion";
// Hook pentru animare la scroll (reveal)
function useInViewAnimation(threshold = 0.2) {
  const ref = React.useRef();
  const controls = useAnimation();
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({ opacity: 1, y: 0, scale: 1 });
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls, threshold]);
  return [ref, controls];
}
import { Github, Linkedin, Mail, Download, ExternalLink, MapPin, Phone, Sparkles, Rocket, GraduationCap, Briefcase, Code2, ArrowRight } from "lucide-react";
import { Calendar } from "lucide-react";

// === UI PRIMITIVE COMPONENTS ===
const Button = ({ children, variant = "default", className = "", asChild = false, ...props }) => {
  const base = "inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl transition";
  const variants = {
    default: "bg-emerald-600 hover:bg-emerald-700 text-white",
    secondary: "bg-zinc-700 hover:bg-zinc-600 text-white",
    outline: "border border-zinc-700 text-zinc-200 hover:bg-zinc-800/50",
    ghost: "text-zinc-300 hover:text-white"
  };
  const cls = `${base} ${variants[variant] || variants.default} ${className}`;
  if (asChild) {
    return React.cloneElement(children, { className: `${cls} ${children.props.className || ""}`, ...props });
  }
  return <button className={cls} {...props}>{children}</button>;
};

const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium border ${className}`}>
    {children}
  </span>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-3 py-2 rounded-xl text-sm bg-zinc-900 border border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${className}`}
    {...props}
  />
);

const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`w-full px-3 py-2 rounded-xl text-sm bg-zinc-900 border border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[120px] ${className}`}
    {...props}
  />
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-zinc-800 bg-zinc-950/70 shadow ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-4 py-3 border-b border-zinc-800 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-white ${className}`}>{children}</h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-4 py-3 text-zinc-300 ${className}`}>{children}</div>
);

// ===== Utility components =====
const Section = ({ id, title, icon: Icon, children, right }) => (
  <section id={id} className="relative w-full max-w-6xl mx-auto px-4 md:px-8 py-14">
    <div className="flex items-end justify-between gap-4 mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-zinc-800 to-black border border-zinc-700/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <Icon className="w-5 h-5 text-zinc-200" />
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-100 flex items-center gap-2">
          {title}
          <Sparkles className="w-4 h-4 text-zinc-400" />
        </h2>
      </div>
      {right}
    </div>
    {children}
  </section>
);

// 3D tilt card
const TiltCard = ({ children, className = "" }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rX = useTransform(y, [0, 1], [10, -10]);
  const rY = useTransform(x, [0, 1], [-10, 10]);
  const sRX = useSpring(rX, { stiffness: 200, damping: 20 });
  const sRY = useSpring(rY, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = () => el.getBoundingClientRect();
    const onMouseMove = (e) => {
      const r = rect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      x.set(px);
      y.set(py);
    };
    const onLeave = () => {
      x.set(0.5);
      y.set(0.5);
    };
    onLeave();
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: sRX, rotateY: sRY, transformStyle: "preserve-3d" }}
      className={`relative will-change-transform ${className}`}
    >
      {/* subtle glare */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl" style={{ transform: "translateZ(30px)" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-3xl" />
      </div>
      {children}
    </motion.div>
  );
};

// Glass card shell
const Glass = ({ children, className = "" }) => (
  <div className={`rounded-3xl border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-10px_rgba(0,0,0,0.7)] ${className}`}>
    {children}
  </div>
);

// Animated starfield background
const Stars = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(80,80,80,0.25),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(120,120,120,0.2),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(140,140,140,0.18),transparent_40%)]" />
    <div className="absolute inset-0" style={{ backgroundImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1400\" height=\"800\"><defs><radialGradient id=\"g\" cx=\"50%\" cy=\"50%\" r=\"50%\"><stop stop-color=\"white\" stop-opacity=\"0.6\"/><stop offset=\"1\" stop-color=\"white\" stop-opacity=\"0\"/></radialGradient></defs>${Array.from({length: 180}).map(()=>`<circle cx=\"${Math.random()*1400}\" cy=\"${Math.random()*800}\" r=\"${Math.random()*1.2+0.2}\" fill=\"url(#g)\"/>`).join('')}</svg>`)}')`, opacity: 0.7 }} />
    <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] rounded-full blur-3xl opacity-30 bg-[conic-gradient(from_30deg,rgba(255,255,255,0.07),rgba(0,0,0,0)_60%)] animate-spin-slower" />
  </div>
);

// Key facts / header bar
const TopBar = () => (
  <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/40 border-b border-zinc-800/60">
    <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between h-14">
      <div className="flex items-center gap-3">
        <div className="size-2 rounded-full bg-emerald-400 animate-pulse" />
  <span className="text-zinc-300 text-sm">Available for projects 2025</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" asChild>
          <a href="#projects">Projects</a>
        </Button>
        <Button variant="ghost" asChild>
          <a href="#experience">Experience</a>
        </Button>
        <Button variant="ghost" asChild>
          <a href="#contact">Contact</a>
        </Button>
      </div>
    </div>
  </div>
);

// ===== Main component =====
export default function App() {
  const [query, setQuery] = useState("");
  const contactForm = useRef();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState("");

  // projects, experience, education sunt importate din data.js

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return projects
      .filter(p => [p.title, p.description, ...p.tags].join(" ").toLowerCase().includes(q))
      .sort((a, b) => b.year - a.year);
  }, [projects, query]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSent(false);
    setError(null);
    setEmailError("");
    // Limitare: un email pe zi
    const lastSent = localStorage.getItem('lastContactEmail');
    if (lastSent && Date.now() - parseInt(lastSent, 10) < 24 * 60 * 60 * 1000) {
      setError('You can only send one message per day.');
      return;
    }
    const form = contactForm.current;
    const email = form.user_email.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Email invalid");
      return;
    }
    emailjs.sendForm(
      'service_ppjlfwb', // înlocuiește cu Service ID
      'template_sjcxyvy', // înlocuiește cu Template ID
      contactForm.current,
      'cyVW7lPc2bEO0FbNn' // înlocuiește cu Public Key
    )
      .then(
        (result) => {
          setSent(true);
          localStorage.setItem('lastContactEmail', Date.now().toString());
        },
        (error) => {
          setError('A apărut o eroare. Încearcă din nou!');
        }
      );
  };

  return (
    <div className="min-h-screen text-zinc-300 bg-black selection:bg-zinc-200 selection:text-black">
      <Stars />
      <TopBar />

      {/* HERO */}
      <header className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-20">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-black tracking-tight text-white">
                Marius‑Ionuț Dejan
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mt-4 text-lg md:text-xl text-zinc-400">
                Software Engineer 
              </motion.p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Badge className="bg-zinc-900 border border-zinc-700 text-zinc-200">Bucharest, RO</Badge>
                <Badge className="bg-zinc-900 border border-zinc-700 text-zinc-200">Available Remote / Hybrid</Badge>
                <Badge className="bg-zinc-900 border border-zinc-700 text-zinc-200">Romanian · English</Badge>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 sm:flex-nowrap sm:justify-start justify-center items-center">
                <Button className="rounded-2xl" asChild>
                  <a href="#contact"><Mail className="w-4 h-4 mr-2"/>Contact me</a>
                </Button>
                <Button variant="secondary" className="rounded-2xl" asChild>
                  <a href="#projects"><Rocket className="w-4 h-4 mr-2"/>View projects</a>
                </Button>
                <Button variant="outline" className="rounded-2xl border-zinc-700 text-zinc-200" asChild>
                    <a href="/Resume.pdf" download><Download className="w-4 h-4 mr-2"/>Download CV</a>
                </Button>
              </div>

              <div className="mt-6 flex gap-4">
                <a className="group inline-flex items-center gap-2 text-zinc-400 hover:text-white" href="https://github.com/dejanmarius/" target="_blank" rel="noreferrer">
                  <Github className="w-5 h-5"/>
                  <span className="text-sm">GitHub</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition"/>
                </a>
                <a className="group inline-flex items-center gap-2 text-zinc-400 hover:text-white" href="https://www.linkedin.com/in/marius-ionut-dejan-6422a8267/" target="_blank" rel="noreferrer">
                  <Linkedin className="w-5 h-5"/>
                  <span className="text-sm">LinkedIn</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition"/>
                </a>
              </div>
            </div>

            <div className="md:col-span-2">
              <TiltCard>
                <Glass className="p-1">
                  <div className="relative rounded-3xl p-6 overflow-hidden" style={{ transform: "translateZ(40px)" }}>
                    <div className="absolute inset-0 bg-[conic-gradient(at_70%_30%,rgba(255,255,255,0.1),rgba(0,0,0,0)_30%)]" />
                    <div className="relative">
                      <div className="size-32 md:size-40 rounded-2xl border border-zinc-700/70 overflow-hidden shadow-2xl">
                        <img src="https://avatars.githubusercontent.com/u/9919?s=200&v=4" alt="Avatar" className="w-full h-full object-cover"/>
                      </div>
                      <div className="mt-4 space-y-2 text-sm text-zinc-300">
                        <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-zinc-400"/> +40 752 420 635</div>
                        <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-zinc-400"/> mariusdejan6@gmail.com</div>
                      </div>
                    </div>
                  </div>
                </Glass>
              </TiltCard>
            </div>
          </div>
        </div>
      </header>

      {/* SKILLS */}
      <Section id="skills" title="Skills & Stack" icon={Code2}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((box) => (
            <Card key={box.category} className="hover:border-zinc-700/80 transition">
              <CardHeader>
                <CardTitle>{box.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {box.items.map((k) => (
                    <Badge key={k} className="bg-zinc-900/60 border-zinc-700/70 text-zinc-200">{k}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section
        id="projects"
        title="Projects"
        icon={Rocket}
        right={
          <div className="w-full max-w-[280px]">
            <Input placeholder="Search project..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        }
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, idx) => (
            <Card key={p.title} className="group hover:border-zinc-700/80 transition h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{p.title}</span>
                  <span className="text-xs text-zinc-400 font-normal">{p.year}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <p className="text-sm text-zinc-400 mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map((t) => (
                    <Badge key={t} className="bg-emerald-600/90 border-emerald-300 text-white">{t}</Badge>
                  ))}
                </div>
                <div className="flex-1 flex items-end">
                  <div className="w-full flex justify-center">
                    <Button variant="outline" asChild>
                      <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center">
                        <ExternalLink className="w-4 h-4 mr-2" /> Details
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-zinc-400">No project found for “{query}”.</div>
          )}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" title="Experience" icon={Briefcase}>
        <div className="relative pl-6 before:content-[''] before:absolute before:top-0 before:left-2 before:w-1 before:h-full before:bg-zinc-800 before:rounded-full">
          {experience.map((e, idx) => {
            const [ref, controls] = useInViewAnimation();
            // Grupare specială pentru Firma X cu două roluri consecutive
            if (e.company === "Societatea Națională de Informatică SA" && e.roles) {
              return (
                <motion.div
                  key={e.company}
                  ref={ref}
                  initial={{ opacity: 0, y: 60, scale: 0.95 }}
                  animate={controls}
                  transition={{ duration: 0.7, delay: idx * 0.15, type: 'spring', bounce: 0.25 }}
                  className="relative mb-10"
                >
                  <span className="absolute -left-1.5 top-4 w-3 h-3 bg-emerald-500 border-4 border-zinc-950 rounded-full shadow-lg"></span>
                  <Card className="ml-4">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-white mb-1">{e.company}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-4">
                        {e.roles.map((r, i) => (
                          <motion.div
                            key={r.role}
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            className={`relative pl-4 py-3 border-l-4 ${i === 0 ? 'border-emerald-500' : 'border-emerald-700'} bg-zinc-900/40 rounded-xl mb-2`}
                          >
                            <div className="flex items-center justify-between mb-1 pr-2">
                              <span className="font-semibold text-white">{r.role}</span>
                              <span className="flex items-center gap-1 text-xs text-zinc-400 font-normal whitespace-nowrap px-2 py-1 rounded-md bg-zinc-950/70 ml-2" style={{marginRight: 0}}>
                                <Calendar className="w-4 h-4 text-emerald-500" />
                                {r.period}
                              </span>
                            </div>
                            {r.technologies && (
                              <div className="flex flex-wrap gap-2 mb-2">
                                {r.technologies.map((tech, idx3) => {
                                  let Icon = null;
                                  if (tech.icon?.startsWith('Fa')) {
                                    Icon = FaIcons[tech.icon];
                                  } else if (tech.icon?.startsWith('Si')) {
                                    Icon = SiIcons[tech.icon];
                                  } else if (tech.icon?.startsWith('Tb')) {
                                    Icon = TbIcons[tech.icon];
                                  } else if (tech.icon?.startsWith('Di')) {
                                    Icon = DiIcons[tech.icon];
                                  }
                                  return (
                                    <span key={idx3} className="inline-flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded text-white text-xs font-mono">
                                      {Icon && <Icon size={16} color={tech.color} />}
                                      {tech.name}
                                    </span>
                                  );
                                })}
                              </div>
                            )}
                            <ul className="list-disc pl-5 space-y-2">
                              {r.bullets.map((b, idx2) => (
                                <li key={idx2}>{b}</li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            }
            // Restul experienței (roluri simple)
            return (
              <motion.div
                key={e.role + e.company}
                ref={ref}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={controls}
                transition={{ duration: 0.7, delay: idx * 0.15, type: 'spring', bounce: 0.25 }}
                className="relative mb-10 last:mb-0"
              >
                <span className="absolute -left-1.5 top-4 w-3 h-3 bg-emerald-500 border-4 border-zinc-950 rounded-full shadow-lg"></span>
                <Card className="ml-4">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{e.role} <span className="text-zinc-400 font-normal">· {e.company}</span></span>
                      <span className="flex items-center gap-1 text-xs text-zinc-400 font-normal whitespace-nowrap px-2 py-1 rounded-md bg-zinc-950/70 ml-2" style={{marginRight: 0}}>
                        <Calendar className="w-4 h-4 text-emerald-500" />
                        {e.period}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {e.technologies && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {e.technologies.map((tech, idx3) => {
                          let Icon = null;
                          if (tech.icon?.startsWith('Fa')) {
                            Icon = FaIcons[tech.icon];
                          } else if (tech.icon?.startsWith('Si')) {
                            Icon = SiIcons[tech.icon];
                          } else if (tech.icon?.startsWith('Tb')) {
                            Icon = TbIcons[tech.icon];
                          }
                          return (
                            <span key={idx3} className="inline-flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded text-white text-xs font-mono">
                              {Icon && <Icon size={16} color={tech.color} />}
                              {tech.name}
                            </span>
                          );
                        })}
                      </div>
                    )}
                    <ul className="list-disc pl-5 space-y-2">
                      {e.bullets.map((b, idx2) => (
                        <li key={idx2}>{b}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Section>


      {/* EDUCATION */}
      <Section id="education" title="Education" icon={GraduationCap}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {education.map((ed, idx) => {
            const [ref, controls] = useInViewAnimation();
            return (
              <motion.div
                key={ed.name}
                ref={ref}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={controls}
                transition={{ duration: 0.7, delay: idx * 0.15, type: 'spring', bounce: 0.25 }}
              >
                <Card className={(ed.inProgress ? 'border-emerald-500 shadow-emerald-200 ' : '') + 'h-full min-h-[180px] flex flex-col justify-between'}>
                  <CardHeader>
                    <CardTitle>{ed.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-between h-full">
                    <div className="text-sm text-zinc-400">{ed.org}</div>
                    <div className="text-xs text-zinc-500 mt-1 flex items-center gap-2">
                      {ed.period}
                      {ed.city && (
                        <span className="inline-flex items-center gap-1 ml-2">
                          <MapPin className="w-4 h-4 text-emerald-500" />
                          {ed.city.name}
                        </span>
                      )}
                      {ed.inProgress && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-emerald-100 via-emerald-50 to-white border border-emerald-200 text-emerald-700 text-xs font-semibold shadow-sm">
                          <svg className="w-3 h-3 text-emerald-500 animate-spin-slower" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" opacity=".2"/><path d="M8 1a7 7 0 0 1 7 7" stroke="currentColor" strokeWidth="2"/></svg>
                          in progress
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* COURSES */}
      <Section id="courses" title="Courses" icon={Sparkles}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, idx) => {
            const [ref, controls] = useInViewAnimation();
            return (
              <motion.div
                key={course.title}
                ref={ref}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={controls}
                transition={{ duration: 0.7, delay: idx * 0.15, type: 'spring', bounce: 0.25 }}
              >
                <Card className="h-full min-h-[180px] flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-between h-full">
                    <div className="text-sm text-zinc-400 mb-2">{course.description}</div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {course.stack.map((tech, idx2) => {
                        let Icon = null;
                        if (tech.icon?.startsWith('Fa')) {
                          Icon = FaIcons[tech.icon];
                        } else if (tech.icon?.startsWith('Si')) {
                          Icon = SiIcons[tech.icon];
                        } else if (tech.icon?.startsWith('Tb')) {
                          Icon = TbIcons[tech.icon];
                        } else if (tech.icon?.startsWith('Di')) {
                          Icon = DiIcons[tech.icon];
                        }
                        return (
                          <span key={idx2} className="inline-flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded text-white text-xs font-mono">
                            {Icon && <Icon size={16} color={tech.color} />}
                            {tech.name}
                          </span>
                        );
                      })}
                    </div>
                    <div className="text-xs text-zinc-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-500" />
                      {course.period}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact" icon={Mail}>
        {(() => {
          const [ref, controls] = useInViewAnimation();
          return (
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={controls}
              transition={{ duration: 0.7, type: 'spring', bounce: 0.25 }}
            >
              <div className="grid md:grid-cols-5 gap-6 items-start">
                <div className="md:col-span-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Send me a message</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form ref={contactForm} onSubmit={handleContactSubmit} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Input name="user_name" required placeholder="Name" />
                          <div>
                            <Input name="user_email" type="email" required placeholder="Email" />
                            {emailError && <span className="text-red-500 text-xs mt-1 block">{emailError}</span>}
                          </div>
                        </div>
                        <Textarea name="message" required placeholder="Your message..." />
                        <div className="flex justify-center gap-3">
                          <Button type="submit">Send</Button>
                        </div>
                        {sent && <p style={{color: 'green'}}>Message sent successfully!</p>}
                        {error && <p style={{color: 'red'}}>{error}</p>}
                      </form>
                    </CardContent>
                  </Card>
                </div>
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick info</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-zinc-400"/> +40 752 420 635</div>
                        <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-zinc-400"/> mariusdejan6@gmail.com</div>
                      </div>
                      <div className="mt-4 flex gap-3">
                        <Button variant="secondary" asChild>
                          <a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex items-center"><Github className="w-4 h-4 mr-2"/>GitHub</a>
                        </Button>
                        <Button variant="secondary" asChild>
                          <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex items-center"><Linkedin className="w-4 h-4 mr-2"/>LinkedIn</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          );
        })()}
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800/60 py-10 mt-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <div>© {new Date().getFullYear()} Marius‑Ionuț Dejan. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a className="hover:text-zinc-300" href="#skills">Skills</a>
            <a className="hover:text-zinc-300" href="#projects">Projects</a>
            <a className="hover:text-zinc-300" href="#experience">Experience</a>
            <a className="hover:text-zinc-300" href="#contact">Contact</a>
          </div>
        </div>
      </footer>

      {/* Extra styles */}
      <style>{`
        .animate-spin-slower { animation: spin 24s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

