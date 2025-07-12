import { useLocation, useNavigate } from "react-router-dom";
import TestimonialData from "../data/TestimonialData";

export default function Home(){
    return(
        <>

            <div className="container-fluid py-1 pt-4">

              {/* community start */}
              <div className="container">
                  <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h6 className="section-title1 bg-white text-center text-primary px-3">
                      Community
                    </h6>
                    <h1 className="mb-5">Our Valued Community</h1>
                  </div>
                  <div className="row g-4">
                    <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                      <div className="service-item rounded pt-3">
                        <div className="p-4">
                        <img
                                  src='/assets/img/testimonial-1.jpg'
                                  alt="unable to load"
                                  className="rounded-circle shadow mb-3"
                                  style={{ width: "80px", height: "80px" }}
                                />
                          <h5>Daisy | <i className="fa-solid fa-location-dot m-1 fs-6 text-danger"></i>London</h5>
                          <p>
                            Wanderlust-filled traveler capturing moments, exploring cultures, and chasing sunsets across the globe.
                          </p>

                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                      <div className="service-item rounded pt-3">
                        <div className="p-4">
                        <img
                                  src='/assets/img/testimonial-4.jpg'
                                  alt="unable to load"
                                  className="rounded-circle shadow mb-3"
                                  style={{ width: "80px", height: "80px" }}
                                />
                          <h5>Pragati  | <i className="fa-solid fa-location-dot m-1 fs-6 text-danger"></i>Australia</h5>
                          <p>
                            Passionate explorer discovering new places, meeting locals, and collecting memories, not things.
                          </p>

                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                      <div className="service-item rounded pt-3">
                        <div className="p-4">
                        <img
                                  src='/assets/img/testimonial-3.jpg'
                                  alt="unable to load"
                                  className="rounded-circle shadow mb-3"
                                  style={{ width: "80px", height: "80px" }}
                                />
                          <h5>Aman  | <i className="fa-solid fa-location-dot m-1 fs-6 text-danger"></i>America</h5>
                          <p>
                            Always planning the next trip, fueled by adventure, culture, and breathtaking landscapes.
                          </p>

                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                      <div className="service-item rounded pt-3">
                        <div className="p-4">
                        <img
                                  src='/assets/img/testimonial-4.jpg'
                                  alt="unable to load"
                                  className="rounded-circle shadow mb-3"
                                  style={{ width: "80px", height: "80px" }}
                                />
                          <h5>Kritika  | <i className="fa-solid fa-location-dot m-1 fs-6 text-danger"></i>Denmark</h5>
                          <p>
                            Journeying across continents to experience food, stories, traditions, and unforgettable moments.
                          </p>

                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                      <div className="service-item rounded pt-3">
                        <div className="p-4">
                        <img
                                  src='/assets/img/testimonial-1.jpg'
                                  alt="unable to load"
                                  className="rounded-circle shadow mb-3"
                                  style={{ width: "80px", height: "80px" }}
                                />
                          <h5>Param  | <i className="fa-solid fa-location-dot m-1 fs-6 text-danger"></i>New York</h5>
                          <p>
                            Living for passport stamps, cultural exchanges, spontaneous journeys, and stories worth telling forever.


                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                      <div className="service-item rounded pt-3">
                        <div className="p-4">
                        <img
                                  src='/assets/img/testimonial-2.jpg'
                                  alt="unable to load"
                                  className="rounded-circle shadow mb-3"
                                  style={{ width: "80px", height: "80px" }}
                                />
                          <h5>Varun  | <i className="fa-solid fa-location-dot m-1 fs-6 text-danger"></i>Italy</h5>
                          <p>
                            Finding joy in getting lost, discovering beauty in unexpected places every day.
                          </p>

                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                      <div className="service-item rounded pt-3">
                        <div className="p-4">
                        <img
                                  src='/assets/img/testimonial-1.jpg'
                                  alt="unable to load"
                                  className="rounded-circle shadow mb-3"
                                  style={{ width: "80px", height: "80px" }}
                                />
                          <h5>Shanaya  | <i className="fa-solid fa-location-dot m-1 fs-6 text-danger"></i>Arezo</h5>
                          <p>
                            Travel isn’t a hobby—it’s my lifestyle, my escape, my greatest teacher.
                          </p>

                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                      <div className="service-item rounded pt-3">
                        <div className="p-4">
                        <img
                                  src='/assets/img/testimonial-2.jpg'
                                  alt="unable to load"
                                  className="rounded-circle shadow mb-3"
                                  style={{ width: "80px", height: "80px" }}
                                />
                          <h5>Rohit  | <i className="fa-solid fa-location-dot m-1 fs-6 text-danger"></i>India</h5>
                          <p>
                            Embracing every journey, learning from each path, and loving every culture I meet.
                          </p>

                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            {/* Community End */}

            {/* Destination Start */}
            <div className="container-xxl py-5 destination">
                <div className="container">
                  <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h6 className="section-title1 bg-white text-center text-primary px-3">
                      Destination
                    </h6>
                    <h1 className="mb-5">Top Destinations</h1>
                  </div>
                  <div className="row g-3">
                    <div className="col-lg-7 col-md-6">
                      <div className="row g-3">
                        <div
                          className="col-lg-12 col-md-12 wow zoomIn"
                          data-wow-delay="0.1s"
                        >
                          <a className="position-relative d-block overflow-hidden" href="">
                            <img className="img-fluid" src="/assets/img/destination-1.jpg" alt="" />
                            {/* <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                              30% OFF
                            </div> */}
                            <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                              Thailand
                            </div>
                          </a>
                        </div>
                        <div
                          className="col-lg-6 col-md-12 wow zoomIn"
                          data-wow-delay="0.3s"
                        >
                          <a className="position-relative d-block overflow-hidden" href="">
                            <img className="img-fluid" src="/assets/img/destination-2.jpg" alt="" />
                            {/* <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                              25% OFF
                            </div> */}
                            <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                              Malaysia
                            </div>
                          </a>
                        </div>
                        <div
                          className="col-lg-6 col-md-12 wow zoomIn"
                          data-wow-delay="0.5s"
                        >
                          <a className="position-relative d-block overflow-hidden" href="">
                            <img className="img-fluid" src="/assets/img/destination-3.jpg" alt="" />
                            {/* <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                              35% OFF
                            </div> */}
                            <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                              Australia
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-lg-5 col-md-6 wow zoomIn"
                      data-wow-delay="0.7s"
                      style={{ minHeight: 350 }}
                    >
                      <a
                        className="position-relative d-block h-100 overflow-hidden"
                        href=""
                      >
                        <img
                          className="img-fluid position-absolute w-100 h-100"
                          src="/assets/img/destination-4.jpg"
                          alt=""
                          style={{ objectFit: "cover" }}
                        />
                        {/* <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                          20% OFF
                        </div> */}
                        <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                          Indonesia
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
            </div>
            {/* Destination End */}
            
            {/* Testimonial Start */}
            <TestimonialData/>
            {/* Testimonial End */}

              
            {/* Back to Top */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
              <i className="bi bi-arrow-up" />
            </a>
        </>
    )
}