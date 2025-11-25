import React from 'react';

interface TestimonialCardProps {
    quote: string;
    author: string;
    handle: string;
    rating: number;
    avatar?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
    quote,
    author,
    handle,
    rating,
    avatar = 'https://randomuser.me/api/portraits/men/32.jpg'
}) => {
    return (
        <div className="testimonial-card">
            <div className="mb-4">
                <span className="badge">[Testimonial]</span>
            </div>

            <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-4 h-4 ${i < rating ? 'text-orange' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                ))}
            </div>

            <blockquote className="text-base mb-4 leading-relaxed">
                "{quote}"
            </blockquote>

            <div className="flex items-center">
                <img
                    src={avatar}
                    alt={author}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div>
                    <p className="font-medium text-sm">{author}</p>
                    <p className="text-xs text-gray-500">@{handle}</p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
