import NavBar from "@/components/NavigationBar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import videoH from "../assets/Hero Image.jpg"

export default function AboutUs() {
  return (
    <>
      <NavBar />
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid lg:grid-cols-[1fr_500px] gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Discover Our Sustainable Fashion Collection
            </h1>
            <p className="text-gray-500 md:text-xl dark:text-gray-400">
              Elevate your style with our eco-friendly apparel, crafted with premium natural
              materials and ethical practices.
            </p>
            <Button size="lg">Shop the Collection</Button>
          </div>
          <img
            alt="Hero Product"
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
            height="550"
            src="placeholder.svg"
            width="550"
          />
        </div>
      </section>

      <div className="w-full max-w-6xl mx-auto py-12 md:py-48 px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-3xl font-bold mb-4">About Us</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Welcome to SportPulse, your ultimate destination for premium nutrition supplements and
              protein products. At SportPulse, we are dedicated to fueling your passion for fitness,
              sports, and a healthy lifestyle. Our mission is to provide you with the highest
              quality supplements that help you achieve your performance and wellness goals.
            </p>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Our Story</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  SportPulse was born out of a commitment to excellence in sports nutrition. We
                  understand that every athlete, fitness enthusiast, and health-conscious individual
                  needs the right support to reach their peak potential. That’s why we have curated
                  a range of products that are not only effective but also safe and scientifically
                  backed.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  At SportPulse, we believe that nutrition is the heartbeat of a healthy and active
                  lifestyle. We are committed to delivering products that you can trust, with a
                  focus on transparency and customer satisfaction. Our goal is to support you every
                  step of the way, helping you to push your limits and achieve greatness.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">What We Offer</h2>
                <ul className="list-disc pl-6 text-gray-500 dark:text-gray-400">
                  <li>
                    Premium Supplements: From protein powders to vitamins, we offer a wide variety
                    of products designed to enhance your strength, endurance, and recovery.
                  </li>
                  <li>
                    Expert Guidance: Our team of nutrition experts and fitness enthusiasts is here
                    to help you make informed choices. Whether you’re just starting your fitness
                    journey or are a seasoned athlete, we provide the insights you need.
                  </li>
                  <li>
                    Quality Assurance: We source our products from trusted manufacturers who adhere
                    to the highest standards of quality and safety. Every product is rigorously
                    tested to ensure it meets our stringent criteria.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="space-y-7">
            <div>
              <h2 className="text-2xl font-bold mb-2">Our Office</h2>
              <div className="text-gray-500 dark:text-gray-400">
                <p>ALOlia Main St.</p>
                <p>Riyadh, KSA 45637</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
              <div className="text-gray-500 dark:text-gray-400">
                <p>Phone: (966) 456-7890</p>
                <p>Email: info@SportPulse.com</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Business Hours</h2>
              <div className="text-gray-500 dark:text-gray-400">
                <p>Sunday - Thursday: 9am - 5pm</p>
                <p>Friday - Saturday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
