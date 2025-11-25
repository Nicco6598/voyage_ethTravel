import React from 'react';

interface DecorativeElementsProps {
    type: 'asterisk' | 'arrow' | 'badge';
    text?: string;
    variant?: 'default' | 'orange' | 'outline';
    className?: string;
}

const DecorativeElements: React.FC<DecorativeElementsProps> = ({
    type,
    text = '',
    variant = 'default',
    className = ''
}) => {
    if (type === 'asterisk') {
        return <span className={`asterisk ${className}`}>*</span>;
    }

    if (type === 'arrow') {
        return (
            <span className={`arrow-link ${className}`}>
                {text}
                <svg className="arrow-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </span>
        );
    }

    if (type === 'badge') {
        const badgeClass = variant === 'orange' ? 'badge-orange' : variant === 'outline' ? 'badge-outline' : 'badge';
        return <span className={`badge ${badgeClass} ${className}`}>{text}</span>;
    }

    return null;
};

export default DecorativeElements;
