import React from 'react';
import { motion } from 'motion/react';
import DecorativeElements from './DecorativeElements';

const About = () => {
    const features = [
        {
            title: "Blockchain Transparency",
            description: "Every booking is recorded on the Ethereum blockchain, ensuring complete transparency and immutable proof of your travel arrangements."
        },
        {
            title: "Secure Payments",
            description: "Pay with cryptocurrency for instant, secure transactions without intermediaries or hidden fees."
        },
        {
            title: "Global Reach",
            description: "Access exclusive travel experiences worldwide, all verified and secured through smart contracts."
        },
        {
            title: "Decentralized Trust",
            description: "No central authority controls your bookings. Your travel data is yours, stored securely on-chain."
        }
    ];

    return (
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <DecorativeElements type="badge" text="[ABOUT US]" variant="outline" />
                        <DecorativeElements type="asterisk" />
                    </div>

                    <h2 className="display-md mb-6">
                        redefining <br />
                        travel with <br />
                        <span className="text-orange">web3</span> <DecorativeElements type="asterisk" />
                    </h2>

                    <p className="body-lg text-gray-600 mb-8">
                        Voyage is pioneering the future of travel by combining blockchain technology with unforgettable experiences. We believe in transparency, security, and putting control back in the hands of travelers.
                    </p>

                    <p className="body-md text-gray-600 mb-8">
                        Founded in 2024, we're building a decentralized travel platform where every booking is verifiable, every transaction is secure, and every journey is extraordinary.
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="border-l-2 border-orange pl-4"
                            >
                                <h4 className="font-bold mb-2">{feature.title}</h4>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <a href="#destinations" className="btn-primary">
                        Explore Destinations
                    </a>
                </motion.div>

                {/* Right Image Grid */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-2 gap-4"
                >
                    <div className="space-y-4">
                        <img
                            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1935&auto=format&fit=crop"
                            alt="Travel destination"
                            className="rounded-2xl w-full h-64 object-cover"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
                            alt="Beach paradise"
                            className="rounded-2xl w-full h-48 object-cover"
                        />
                    </div>
                    <div className="space-y-4 pt-8">
                        <img
                            src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2070&auto=format&fit=crop"
                            alt="Mountain adventure"
                            className="rounded-2xl w-full h-48 object-cover"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop"
                            alt="Scenic view"
                            className="rounded-2xl w-full h-64 object-cover"
                        />
                    </div>

                    {/* Floating Stats Card */}
                    <div className="col-span-2 bg-black text-white rounded-2xl p-6">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-3xl font-bold text-orange">50+</p>
                                <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">Countries</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-orange">10K+</p>
                                <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">Travelers</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-orange">100%</p>
                                <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">Blockchain</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
