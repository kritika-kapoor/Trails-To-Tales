import "./About.css"

export default function About(){
   return (
    <div className="about-container container py-5">
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <img
            src="/assets/img/about.jpg"
            alt="Travel"
            className="img-fluid rounded shadow about-img"
          />
        </div>
        <div className="col-md-6 text-md-start text-center">
          <h6 className="text-uppercase text-primary mb-2">About Us</h6>
          <h1 className="mb-4">
            Welcome to <span className="text-primary">Trails to Tales</span>
          </h1>
          <p>
            Trails to Tales is a vibrant travel community platform where adventurers connect,
            plan, and share their journeys. Whether you're organizing a trip, keeping travel
            journals, or exploring places with others, this is your go-to travel hub.
          </p>
          <p>
            Dive into seamless planning, stay motivated with to-do lists, and
            document your wanderlust with a built-in journal.
          </p>
        </div>
      </div>

 <div className="feature-section">
  <h2 className="text-center mb-4">Key Features</h2>
  <div className="row g-4 justify-content-center">
    {[
      { title: '👥 Travel Community', desc: 'Connect with other travelers, share tips, and plan adventures together.' },
      { title: '📝 Travel Journal', desc: 'Capture your journey with personal stories and memories.' },
      { title: '✅ To-Do Lists', desc: 'Keep everything in check with custom travel checklists.' },
      { title: '📅 Trip Planning', desc: 'Plan and organize trips efficiently with intuitive tools.' },
      { title: '🖼️ Photo Gallery', desc: 'Store and view your travel photos beautifully.' },
      { title: '✍️ Write Blogs', desc: 'Write travel blogs and inspire others with your experiences.' },
      { title: '📚 Book Guides', desc: 'Find and book reliable travel guides for your destination.' }
    ].map((feature, idx) => (
      <div className="col-md-5 col-lg-4" key={idx}>
        <div className="card feature-card h-100 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">{feature.title}</h5>
            <p className="card-text">{feature.desc}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  )
}