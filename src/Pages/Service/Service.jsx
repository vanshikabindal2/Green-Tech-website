
import React, { useState } from "react";
import "./Service.css";

import indoorwall from "../../assets/indoorwall.jpg";
import outdoorwall from "../../assets/outdoorwall.jpg";
import herowall from "../../assets/herowall.jpg";
import artificialgrass from "../../assets/artificialgrass.jpg";
import { Link } from "react-router-dom";
const categories = [
  { id: "misting", icon: "💧", title: "Misting Systems", color: "cat-green" },
  { id: "fogging", icon: "☁️", title: "High Pressure Fogging", color: "cat-blue" },
  { id: "dust", icon: "🌬️", title: "Dust Suppression", color: "cat-purple" },
  { id: "cooling", icon: "❄️", title: "Mist Cooling", color: "cat-cyan" },
  { id: "outdoor", icon: "☀️", title: "Outdoor Cooling", color: "cat-orange" },
];

const services = [
  // MISTING SYSTEMS
  {
    id: 1,
    category: "misting",
    name: "High Pressure Misting System",
    image: outdoorwall,
    price: "₹1,00,000",
    unit: "Starting price",
    pressure: "High Pressure",
    coverage: "Up to 500 sq ft",
  
    color: "mint",
    tag: "BEST SELLER",
  },
  {
    id: 2,
    category: "misting",
    name: "Outdoor Misting System",
    image: outdoorwall,
    price: "₹70,000",
    unit: "Starting price",
    pressure: "Medium Pressure",
    coverage: "500-1500 sq ft",

    color: "peach",
    tag: "OUTDOOR",
  },
  {
    id: 3,
    category: "misting",
    name: "Low Pressure Misting System",
    image: indoorwall,
    price: "₹50,000",
    unit: "Starting price",
    pressure: "Low Pressure",
    coverage: "Up to 500 sq ft",
    
    color: "blue",
    tag: "ECO FRIENDLY",
  },
  {
    id: 4,
    category: "misting",
    name: "Industrial Misting System",
    image: herowall,
    price: "₹1,00,000",
    unit: "Starting price",
    pressure: "High Pressure",
    coverage: "Large Industrial Areas",
   
    color: "purple",
    tag: "INDUSTRIAL",
  },
  {
    id: 5,
    category: "misting",
    name: "Residential Misting System",
    image: artificialgrass,
    price: "₹80,000",
    unit: "Starting price",
    pressure: "High Pressure",
    coverage: "Up to 500 sq ft",
   
    color: "yellow",
    tag: "HOME SOLUTION",
  },

  // HIGH PRESSURE FOGGING
  {
    id: 6,
    category: "fogging",
    name: "80LPH High Pressure Fogging System",
    image: outdoorwall,
    price: "₹2,00,000",
    unit: "Piece",
    pressure: "High Pressure",
    coverage: "Capacity: 80LPH | Material: SS",
    icon: "💧",
    color: "mint",
    tag: "80 LPH",
  },
  {
    id: 7,
    category: "fogging",
    name: "10LPH High Pressure Fogging System",
    image: indoorwall,
    price: "₹46,000",
    unit: "Piece",
    pressure: "High Pressure",
    coverage: "Capacity: 10 LPH | Material: SS",
    icon: "💧",
    color: "blue",
    tag: "10 LPH",
  },
  {
    id: 8,
    category: "fogging",
    name: "5LPH High Pressure Fogging System",
    image: herowall,
    price: "₹36,000",
    unit: "Piece",
    pressure: "High Pressure",
    coverage: "Capacity: 5 LPH | Material: SS",
    icon: "💧",
    color: "peach",
    tag: "5 LPH",
  },
  {
    id: 9,
    category: "fogging",
    name: "55LPH High Pressure Fogging System",
    image: artificialgrass,
    price: "₹1,50,000",
    unit: "Piece",
    pressure: "High Pressure",
    coverage: "Capacity: 55LPH | Material: SS",
    icon: "💧",
    color: "purple",
    tag: "55 LPH",
  },
  {
    id: 10,
    category: "fogging",
    name: "15LPH High Pressure Fogging System",
    image: outdoorwall,
    price: "₹55,000",
    unit: "Piece",
    pressure: "High Pressure",
    coverage: "Capacity: 15 LPH | Material: SS",
    icon: "💧",
    color: "yellow",
    tag: "15 LPH",
  },

  // DUST SUPPRESSION
  {
    id: 11,
    category: "dust",
    name: "8 HP Dust Suppression System",
    image: outdoorwall,
    price: "₹75,000",
    unit: "Piece",
    pressure: "Power: 8 HP",
    coverage: "Material: Mild Steel | Color: Gray",
    
    color: "yellow",
    tag: "8 HP",
  },
  {
    id: 12,
    category: "dust",
    name: "6 HP Dust Suppression System",
    image: indoorwall,
    price: "₹55,000",
    unit: "Piece",
    pressure: "Power: 6 HP",
    coverage: "Material: Mild Steel | Color: Gray",
   
    color: "mint",
    tag: "6 HP",
  },
  {
    id: 13,
    category: "dust",
    name: "5 HP Dust Suppression System",
    image: herowall,
    price: "₹45,000",
    unit: "Piece",
    pressure: "Power: 5 HP",
    coverage: "Material: Mild Steel | Color: Gray",
    icon: "🌬️",
    color: "purple",
    tag: "5 HP",
  },
  {
    id: 14,
    category: "dust",
    name: "4 HP Dust Suppression System",
    image: artificialgrass,
    price: "₹30,000",
    unit: "Piece",
    pressure: "Power: 4 HP",
    coverage: "Material: Mild Steel | Color: Gray",
    
    color: "blue",
    tag: "4 HP",
  },
  {
    id: 15,
    category: "dust",
    name: "10 HP Dust Suppression System",
    image: outdoorwall,
    price: "₹86,500",
    unit: "Piece",
    pressure: "Power: 10 HP",
    coverage: "Material: Stainless Steel | Color: Silver",

    color: "peach",
    tag: "10 HP",
  },
// Mist Cooling
{
    id: 16,
    category: "cooling",
    name: "Indoor Mist Cooling System",
    image: outdoorwall,
    price: "₹75,000",
    unit: "Piece",
    pressure: "High Pressure",
    coverage: "50-1500 sq",
    
    color: "yellow",
    tag: "8 HP",
  },
  {
    id: 17,
    category: "cooling",
    name: "Garden Mist Cooling System",
    image: indoorwall,
    price: "₹75,000",
    unit: "Piece",
     pressure: "High Pressure",
    coverage: "50-1500 sq",
    color: "mint",
    tag: "6 HP",
  },
  {
    id: 18,
    category: "cooling",
    name: "Yard Mist Cooling System",
    image: herowall,
    price: "₹85,000",
    unit: "Piece",
      pressure: "High Pressure",
    coverage: "50-1500 sq",
    color: "purple",
    tag: "5 HP",
  },
  {
    id: 19,
    category: "cooling",
    name: "Agricultural Mist Cooling System",
    image: artificialgrass,
    price: "₹35,000",
    unit: "Piece",
     pressure: "High Pressure",
    coverage: "50-1500 sq",
   
    color: "blue",
    tag: "4 HP",
  },
  {
    id: 20,
    category: "cooling",
    name: "Roof Mist Cooling System",
    image: outdoorwall,
    price: "₹95,500",
    unit: "Piece",
   method:'Misting',

    color: "peach",
    tag: "10 HP",
  },

  // Outdoor Cooling
    {
    id: 21,
    category: "outdoor",
    name: "Outdoor Water Mist System",
    image: indoorwall,
    price: "₹1,25,000",
    unit: "Piece",
    coverage: "50-1500 sq",
    color: "purple",
    tag: "6 HP",
  },
  {
    id: 22,
    category: "outdoor",
    name: "Outdoor Patio Cooling System",
    image: herowall,
    price: "₹65,000",
    unit: "Piece",
    color: "peach",
    tag: "5 HP",
  },
  {
    id: 23,
    category: "outdoor",
    name: "Terrace Cooling System",
    image: indoorwall,
    price: "₹55,000",
    unit: "Piece",
    coverage: "50-1500 sq ft",
    color: "blue",
    tag: "6 HP",
  },
  {
    id: 24,
    category: "outdoor",
    name: "Yard Mist Cooling System",
    image: herowall,
    price: "₹85,000",
    unit: "Piece",
    
    color: "mint",
    tag: "5 HP",
  },];

const Service = () => {
  const [activeCategory, setActiveCategory] = useState("misting");

  const selectedCategory = categories.find(
    (category) => category.id === activeCategory
  );

  const filteredServices = services.filter(
    (service) => service.category === activeCategory
  );

 

  return (
    <section className="gt-services">

      {/* HERO SECTION */}
      <div className="gt-service-hero">

        <div className="gt-hero-decoration gt-circle-one"></div>
        <div className="gt-hero-decoration gt-circle-two"></div>

        <span className="gt-service-label">
          <span className="gt-label-dot"></span>
          OUR SERVICES
        </span>

        <h1>
          Professional <span>Misting &</span>
          <br />
          Cooling Systems
        </h1>

        <p>
          Complete range of misting, fogging, cooling, and dust
          suppression solutions for residential and commercial
          applications.
        </p>

        {/* CLICKABLE CATEGORIES */}
        <div className="gt-category-list">
          {categories.map((category) => (
            <button
              type="button"
              key={category.id}
              className={`gt-category-card ${category.color} ${
                activeCategory === category.id ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className="gt-category-icon">
                {category.icon}
              </div>

              <h4>{category.title}</h4>
            </button>
          ))}
        </div>

      </div>

      {/* FILTERED PRODUCTS */}
      <div className="gt-service-products">

        <div className="gt-products-heading">
          <div>
            <span className="gt-small-label">WHAT WE OFFER</span>

            <h2>{selectedCategory.title}</h2>

            <p>
              Explore our {selectedCategory.title.toLowerCase()} solutions.
            </p>
          </div>

          {/* <div className="gt-product-count">
            <span>{String(filteredServices.length).padStart(2, "0")}</span>
            <small>Available Solutions</small>
          </div> */}
        </div>

        <div className="gt-service-grid">

          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div
                className={`gt-service-card ${service.color}`}
                key={service.id}
              >

                <div className="gt-service-image">
                  <img src={service.image} alt={service.name} />

                  <span className="gt-service-tag">
                    {service.tag}
                  </span>

                  <div className="gt-image-icon">
                    {service.icon}
                  </div>
                </div>

                <div className="gt-service-content">

                  <h3>{service.name}</h3>

                  <div className="gt-price-area">
                    <div>
                      <span className="gt-price-label">
                        Starting From
                      </span>

                      <h2>{service.price}</h2>

                      <span className="gt-price-unit">
                        {service.unit}
                      </span>
                    </div>

                    <div className="gt-price-icon">₹</div>
                  </div>

                  <div className="gt-service-details">

                    <div className="gt-detail-box">
                      <span>⚙️</span>
                      <div>
                        <small>Specifications</small>
                        <strong>{service.pressure}</strong>
                      </div>
                    </div>

                    <div className="gt-detail-box">
                      <span>📐</span>
                      <div>
                        <small>Product Details</small>
                        <strong>{service.coverage}</strong>
                      </div>
                    </div>

                  </div>
{/* <Link to='/getquote'>
                  <button
                    className="gt-quote-button"
                  
                  >
                    Get Quote
                    <span>↗</span>
                  </button>
</Link> */}
<Link to="/getquote" className="gt-quote-link">
  <button type="button" className="gt-quote-button">
    Get Quote
    <span>↗</span>
  </button>
</Link>
                </div>
              </div>
            ))
          ) : (
            <div className="gt-no-products">
              <h3>Products Coming Soon!</h3>
              <p>
                Products for {selectedCategory.title} will be available soon.
                Please contact our team for more information.
              </p>
            </div>
          )}

        </div>

        {/* BOTTOM CTA */}
        <div className="gt-service-bottom">
          <div>
            <span className="gt-bottom-icon">🌱</span>

            <div>
              <h3>Need a Custom Cooling Solution?</h3>
              <p>
                Let's find the perfect solution for your space.
              </p>
            </div>
          </div>
<Link to='/contact'  >
          <button
            type="button"
         
          >
            Contact Our Team <span>→</span>
          </button>
          </Link>
        </div>

      </div>

    </section>
  );
};

export default Service;
