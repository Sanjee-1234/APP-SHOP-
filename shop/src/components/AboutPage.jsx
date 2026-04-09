function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="hero-tag">🌿 Our Story</div>
        <h1>Farm to Fork, <span>With Love</span></h1>
        <p>FreshMart was born from one simple belief — everyone deserves access to fresh, honest food.</p>
      </div>
      <div className="about-section">
        <div className="about-story">
          <h2>Who We Are</h2>
          <p>FreshMart started in 2021 in Coimbatore, Tamil Nadu, with a small team of farmers, foodies, and technologists who were tired of stale produce and middlemen. We set out to eliminate the gap between farm and kitchen.</p>
          <p>Today, we partner with over 200 farms across South India, delivering 10,000+ orders every week to households who care about what's on their plate.</p>
        </div>
        <div className="about-image-box">
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80" alt="Farm" />
        </div>
      </div>
      <div className="about-stats">
        {[{num:"200+",label:"Partner Farms"},{num:"10K+",label:"Weekly Orders"},{num:"4.8★",label:"Average Rating"},{num:"50+",label:"Cities Served"}].map(s => (
          <div className="about-stat" key={s.label}>
            <div className="about-stat-num">{s.num}</div>
            <div className="about-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="about-values">
        <h2>Our Values</h2>
        <div className="values-grid">
          {[
            {icon:"🌱",title:"Sustainability",desc:"We prioritise organic, eco-friendly farming practices that protect our soil and water."},
            {icon:"🤝",title:"Fair Trade",desc:"Farmers earn fair prices. We cut out middlemen so both farmers and customers benefit."},
            {icon:"🔬",title:"Quality First",desc:"Every batch is quality-checked by our team before it reaches your doorstep."},
            {icon:"❤️",title:"Community",desc:"We invest in rural communities, education, and women-led farming cooperatives."},
          ].map(v => (
            <div className="value-card" key={v.title}><div className="value-icon">{v.icon}</div><h4>{v.title}</h4><p>{v.desc}</p></div>
          ))}
        </div>
      </div>
      <div className="about-team">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          {[{name:"Arun Selvam",role:"Founder & CEO",emoji:"👨‍💼"},{name:"Meera Krishnan",role:"Head of Operations",emoji:"👩‍💼"},{name:"Vijay Raj",role:"Farm Relations Lead",emoji:"👨‍🌾"},{name:"Priya Nair",role:"Customer Experience",emoji:"👩‍💻"}].map(t => (
            <div className="team-card" key={t.name}><div className="team-avatar">{t.emoji}</div><h4>{t.name}</h4><span>{t.role}</span></div>
          ))}
        </div>
      </div>
      <div className="about-contact">
        <h2>Get in Touch</h2>
        <div className="contact-grid">
          <div className="contact-item"><span>📧</span><div><strong>Email</strong><p>support@freshmart.in</p></div></div>
          <div className="contact-item"><span>📞</span><div><strong>Phone</strong><p>+91 98765 43210</p></div></div>
          <div className="contact-item"><span>📍</span><div><strong>Address</strong><p>12, Race Course Rd, Coimbatore, TN</p></div></div>
          <div className="contact-item"><span>⏰</span><div><strong>Hours</strong><p>Mon–Sat: 8am – 9pm</p></div></div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
