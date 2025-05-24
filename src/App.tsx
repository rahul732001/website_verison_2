import React, { useState, useEffect } from "react";
import {
  Heart,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import "./index.css";
const sheetWebhookUrl =
  "https://script.google.com/macros/s/AKfycbyW5YlCoHdgkWhk-CeUv19fXQeOUI1z8EwjXgZxKVQNUv9dTiN3npo4TJBHUHvjZZT4/exec";
type Event = {
  title: string;
  date: string;
  time: string;
  venue: string;
  mapLink: string;
  description: string;
};

const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    attending: "yes",
    guestCount: 1,
    events: {
      mehendi: true,
      haldi: true,
      wedding: true,
      vratam: true,
    },
  });

  const [submitted, setSubmitted] = useState(false);

  // Wedding date - August 16, 2025
  const weddingDate = new Date("2025-08-16T21:00:00");

  const events: Event[] = [
    {
      title: "Mehendi & Sangeet Night",
      date: "August 15, 2025",
      time: "5:00 PM",
      venue: "2240 E Blackjack Rd E, Pilot Point, TX 76258",
      mapLink:
        "https://maps.google.com/?q=2240+E+Blackjack+Rd+E,+Pilot+Point,+TX+76258",
      description:
        "A colorful celebration with henna artistry, music, and dance performances.",
    },
    {
      title: "Haldi Ceremony",
      date: "August 16, 2025",
      time: "9:00 AM",
      venue: "14012 Danesdale Dr, Pilot Point, TX 76258",
      mapLink:
        "https://maps.google.com/?q=14012+Danesdale+Dr,+Pilot+Point,+TX+76258",
      description:
        "A joyful turmeric ritual to bless the couple with glow and good fortune.",
    },
    {
      title: "Wedding Ceremony",
      date: "August 16, 2025",
      time: "7:00 PM",
      venue: "2240 E Blackjack Rd E, Pilot Point, TX 76258",
      mapLink:
        "https://maps.google.com/?q=2240+E+Blackjack+Rd+E,+Pilot+Point,+TX+76258",
      description:
        "Our sacred vows under South-Indian tradition. Witness the moment we become one.",
    },
    {
      title: "Satyanarayana Swami Vratam",
      date: "August 17, 2025",
      time: "9:00 AM",
      venue: "14012 Danesdale Dr, Pilot Point, TX 76258",
      mapLink:
        "https://maps.google.com/?q=14012+Danesdale+Dr,+Pilot+Point,+TX+76258",
      description: "A serene puja seeking divine guidance for our new journey.",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const now = new Date().getTime();
      const diff = weddingDate.getTime() - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? value.replace(/\D/g, "") : value,
    }));
  };

  const handleEventChange = (event: string) => {
    setFormData((prev) => ({
      ...prev,
      events: {
        ...prev.events,
        [event]: !prev.events[event as keyof typeof prev.events],
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const payload = {
      name: formData.name,
      phone: formData.phone,
      attending: formData.attending,
      guestCount: formData.guestCount,
      events: formData.events,
    };

    try {
      await fetch(sheetWebhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      alert("RSVP submitted—thank you!");

      // ✅ Reset form
      setFormData({
        name: "",
        phone: "",
        attending: "yes",
        guestCount: 1,
        events: {
          mehendi: true,
          haldi: true,
          wedding: true,
          vratam: true,
        },
      });

      setTimeout(() => {
        document
          .getElementById("confirmation")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error("RSVP error:", err);
      alert("Submission failed—please try again.");
    }
  };

  return (
    <div className="font-poppins">
      {/* Hero Section */}
      <section
        className="
    relative
    flex flex-col items-center justify-center
    min-h-screen
    px-6 py-24
    bg-[url('/background.jpg')]
    bg-cover bg-center
    text-center
    overflow-hidden
  "
      >
        {/* Soft white overlay for legibility */}
        <div className="absolute inset-0 bg-white/30"></div>

        {/* Content */}
        <div className="relative z-10 space-y-8 max-w-lg mx-auto">
          {/* Badge */}
          <div className="inline-block bg-gold/90 text-white py-3 px-8 rounded-md shadow-md">
            <h1 className="text-2xl sm:text-3xl font-cormorant tracking-wide">
              Wedding Invitation
            </h1>
          </div>

          {/* Ganesha */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-gold shadow-2xl bg-white overflow-hidden mx-auto">
            <img
              src="/god.png"
              alt="Lord Ganesha"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Couple’s Names */}
          <h2 className="text-4xl sm:text-5xl font-cormorant font-bold text-deep-brown">
            Apuroopa & Arvind
          </h2>

          {/* Date */}
          <p className="text-lg sm:text-xl text-gray-700">August 16, 2025</p>

          {/* Subtext */}
          <p className="text-base sm:text-lg italic text-gray-600 leading-relaxed">
            We’d be over the moon to celebrate with you — tap RSVP to save your
            seat.
          </p>

          {/* RSVP Button */}
          <button
            onClick={() =>
              document
                .getElementById("rsvp")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-gold text-white px-10 py-4 text-lg rounded-full font-semibold shadow hover:bg-gold-dark transition"
          >
            RSVP
          </button>
        </div>

        {/* Down Arrow */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
          <button
            onClick={() =>
              document
                .getElementById("invitation")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-black"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </section>

      {/* Invitation Section */}
      <section
        id="invitation"
        className="py-20 bg-light-gold border-b-4 border-gold"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-deep-brown font-cormorant leading-relaxed">
              <span className="text-4xl font-semibold block mb-4">
                With the blessings of our families
              </span>
              We're tying the knot! Join us on our journey from "me" to "we".
              Come make memories with us.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="py-16 bg-light-gold relative">
        <div className="container mx-auto px-4 relative z-10">
          <blockquote className="text-2xl md:text-4xl text-deep-brown text-center font-cormorant italic max-w-4xl mx-auto">
            "When two souls are meant to be together, nothing can keep them
            apart"
          </blockquote>
        </div>
      </section>

      {/* Family Section */}
      <section className="relative py-20 bg-[url('/background.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-white/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl text-center font-cormorant font-semibold mb-16 text-deep-brown">
            Our Families
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="mb-6 mx-auto w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg border-4 border-gold">
                <img
                  src="/bride.jpeg"
                  alt="Bride"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-cormorant font-semibold text-deep-brown mb-4">
                The Bride
              </h3>
              <p className="text-lg md:text-xl mb-2 font-medium">
                Lakshmi Sita Apuroopa Devarasetty
              </p>
              <div className="space-y-2">
                <p className="text-base md:text-lg">D/O</p>
                <p className="text-md md:text-lg font-cormorant font-semibold text-deep-brown">
                  Mr. Devarasetty Venkata Apparao
                </p>
                <p className="text-base md:text-lg">&</p>
                <p className="text-md md:text-lg font-cormorant font-semibold text-deep-brown">
                  Mrs. Pandu Ranga Vital Kumari
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="mb-6 mx-auto w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg border-4 border-gold">
                <img
                  src="/groom.jpeg"
                  alt="Groom"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-cormorant font-semibold text-deep-brown mb-4">
                The Groom
              </h3>
              <p className="text-lg md:text-xl mb-2 font-medium">
                Arvind Machavarapu
              </p>
              <div className="space-y-2">
                <p className="text-base md:text-lg">S/O</p>
                <p className="text-md md:text-lg font-cormorant font-semibold text-deep-brown">
                  Mr. Machavarapu Bhupathi Rao (Late)
                </p>
                <p className="text-base md:text-lg">&</p>
                <p className="text-md md:text-lg font-cormorant font-semibold text-deep-brown">
                  Mrs. Indira (Late)
                </p>
                <div className="mt-4">
                  <p className="text-md md:text-lg font-cormorant font-semibold text-deep-brown">
                    Brother: Machavarapu Vamsinadh
                  </p>
                  <p className="text-md md:text-lg font-cormorant font-semibold text-deep-brown">
                    Sister-in-law: Jaisree
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-lg mt-12 text-deep-brown italic font-semibold">
            We can't wait for you to meet the people who made us who we are.
          </p>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl text-center font-cormorant font-semibold mb-16 text-deep-brown">
            Wedding Events
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-white p-6 md:p-8 rounded-lg shadow-md transition duration-300 transform hover:-translate-y-1 hover:shadow-lg relative"
              >
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gold text-white rounded-full flex items-center justify-center text-xl font-semibold">
                  {index + 1}
                </div>

                <h3 className="text-xl md:text-2xl font-cormorant font-semibold mb-4 text-deep-brown">
                  {event.title}
                </h3>

                <div className="flex items-center mb-3">
                  <Calendar className="text-gold mr-2" size={18} />
                  <span className="text-sm md:text-base">{event.date}</span>
                </div>

                <div className="flex items-center mb-3">
                  <Clock className="text-gold mr-2" size={18} />
                  <span className="text-sm md:text-base">{event.time}</span>
                </div>

                <div className="flex items-start mb-4">
                  <MapPin
                    className="text-gold mr-2 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <span className="text-sm md:text-base">{event.venue}</span>
                </div>

                <p className="text-gray-700 mb-6 text-sm md:text-base">
                  {event.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={event.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gold hover:text-gold-dark text-sm md:text-base"
                  >
                    <span>Open in Maps</span>
                    <ArrowRight size={16} className="ml-1" />
                  </a>

                  <button
                    onClick={() =>
                      document
                        .getElementById("rsvp")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="inline-flex items-center text-gold hover:text-gold-dark ml-auto text-sm md:text-base"
                  >
                    <span>Save me a seat</span>
                    <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section
        id="rsvp"
        className="relative bg-[url('/background.jpg')] bg-cover bg-center py-20"
      >
        <div className="absolute inset-0 bg-white/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-4xl text-center font-cormorant font-semibold mb-6 text-deep-brown">
              RSVP once—done in 30 seconds.
            </h2>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit phone"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="attending"
                    className="block text-gray-700 mb-2"
                  >
                    Can we count you in?
                  </label>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="attending"
                        value="yes"
                        checked={formData.attending === "yes"}
                        onChange={handleChange}
                        className="form-radio text-gold"
                      />
                      <span className="ml-2">Yes!</span>
                    </label>

                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="attending"
                        value="no"
                        checked={formData.attending === "no"}
                        onChange={handleChange}
                        className="form-radio text-gold"
                      />
                      <span className="ml-2">Sadly can't</span>
                    </label>
                  </div>
                </div>

                {formData.attending === "yes" && (
                  <>
                    <div>
                      <label
                        htmlFor="guestCount"
                        className="block text-gray-700 mb-2"
                      >
                        Number of guests
                      </label>
                      <select
                        id="guestCount"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <p className="block text-gray-700 mb-2">
                        Which events will you attend?
                      </p>
                      <div className="space-y-2">
                        {Object.entries(formData.events).map(
                          ([key, value], index) => (
                            <label key={key} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={value}
                                onChange={() => handleEventChange(key)}
                                className="form-checkbox text-gold"
                              />
                              <span className="ml-2">
                                {events[index].title}
                              </span>
                            </label>
                          )
                        )}
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full bg-gold text-white font-medium py-3 px-4 rounded-md hover:bg-gold-dark transition duration-300"
                >
                  Lock in my spot
                </button>
              </form>
            ) : (
              <div id="confirmation" className="text-center py-8">
                <CheckCircle
                  size={64}
                  className="text-green-500 mx-auto mb-4"
                />
                <h3 className="text-2xl font-semibold mb-2">
                  You're on the guest list!
                </h3>
                <p className="text-gray-600">
                  We'll send you a text with all the details—see you on the
                  dance floor. 🎉
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-10 bg-deep-brown text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h3 className="text-lg md:text-2xl mb-4 md:mb-0 font-medium text-center md:text-left">
              Only {timeLeft.days} days left—please RSVP by July 15.
            </h3>

            <div className="flex gap-4 mb-4 md:mb-0">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">
                  {timeLeft.days}
                </div>
                <div className="text-xs md:text-sm">Days</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">
                  {timeLeft.hours}
                </div>
                <div className="text-xs md:text-sm">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">
                  {timeLeft.minutes}
                </div>
                <div className="text-xs md:text-sm">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">
                  {timeLeft.seconds}
                </div>
                <div className="text-xs md:text-sm">Seconds</div>
              </div>
            </div>

            <button
              onClick={() =>
                document
                  .getElementById("rsvp")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-gold text-white px-6 py-2 rounded-full font-medium transition hover:bg-gold-dark text-sm md:text-base"
            >
              I'm coming!
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-cream">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 italic text-sm md:text-base">
            Questions? Text Arvind at (469) 794-9099—happy to help!
          </p>
          <p className="text-sm md:text-base">
            {" "}
            We are excited to celebrate our special day with you!
          </p>
          <p className="mt-4 text-gold flex items-center justify-center">
            <Heart size={18} className="mr-1" /> Apuroopa & Arvind
          </p>
          <p className="mt-4 text-gold flex items-center justify-center">
            #Arupoo
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
