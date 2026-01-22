/**
 * Warm Minimalist Glass - React Component Examples
 *
 * Copy these components to your project and customize as needed.
 * Assumes design-tokens.css is imported in your app.
 */

import React from 'react';

// ============================================
// GLASS CARD
// ============================================

export function GlassCard({
  children,
  variant = 'default',
  className = '',
  ...props
}) {
  const variantStyles = {
    default: {
      background: 'rgba(255, 255, 255, 0.65)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    },
    solid: {
      background: 'rgba(255, 255, 255, 0.75)',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
    },
    light: {
      background: 'rgba(255, 255, 255, 0.45)',
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
    },
    subtle: {
      background: 'rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(12px) saturate(150%)',
      WebkitBackdropFilter: 'blur(12px) saturate(150%)',
    },
  };

  const baseStyles = {
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: `
      0 4px 24px rgba(44, 40, 37, 0.08),
      0 1px 2px rgba(44, 40, 37, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.5)
    `,
    transition: 'all 0.2s ease',
    ...variantStyles[variant],
  };

  return (
    <div style={baseStyles} className={className} {...props}>
      {children}
    </div>
  );
}

// ============================================
// BUTTONS
// ============================================

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const sizeStyles = {
    sm: { padding: '0.5rem 1rem', fontSize: '0.75rem' },
    md: { padding: '0.75rem 1.5rem', fontSize: '0.875rem' },
    lg: { padding: '1rem 2rem', fontSize: '1rem' },
  };

  const variantStyles = {
    primary: {
      background: '#C4856A',
      color: 'white',
      border: 'none',
      boxShadow: '0 2px 8px rgba(196, 133, 106, 0.3)',
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.5)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      color: '#2C2825',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    },
    outline: {
      background: 'transparent',
      color: '#C4856A',
      border: '1px solid #C4856A',
    },
    ghost: {
      background: 'transparent',
      color: '#4A4238',
      border: 'none',
    },
  };

  const baseStyles = {
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontWeight: 500,
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  const handleMouseEnter = (e) => {
    if (variant === 'primary') {
      e.target.style.background = '#B5765B';
      e.target.style.boxShadow = '0 4px 12px rgba(196, 133, 106, 0.4)';
      e.target.style.transform = 'translateY(-1px)';
    } else if (variant === 'glass') {
      e.target.style.background = 'rgba(255, 255, 255, 0.7)';
      e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    } else if (variant === 'outline') {
      e.target.style.background = 'rgba(196, 133, 106, 0.1)';
    } else if (variant === 'ghost') {
      e.target.style.background = 'rgba(74, 66, 56, 0.05)';
    }
  };

  const handleMouseLeave = (e) => {
    Object.assign(e.target.style, variantStyles[variant], { transform: 'none' });
  };

  return (
    <button
      style={baseStyles}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
}

// ============================================
// INPUT
// ============================================

export function Input({
  label,
  error,
  className = '',
  ...props
}) {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  };

  const labelStyles = {
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#4A4238',
  };

  const inputStyles = {
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: `1px solid ${error ? '#C47070' : '#E8E2D9'}`,
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: '1rem',
    color: '#2C2825',
    transition: 'all 0.2s ease',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  };

  const errorStyles = {
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: '0.75rem',
    color: '#C47070',
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = '#C4856A';
    e.target.style.boxShadow = '0 0 0 3px rgba(196, 133, 106, 0.15)';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = error ? '#C47070' : '#E8E2D9';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={containerStyles}>
      {label && <label style={labelStyles}>{label}</label>}
      <input
        style={inputStyles}
        className={className}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {error && <span style={errorStyles}>{error}</span>}
    </div>
  );
}

// ============================================
// TYPOGRAPHY
// ============================================

export function Heading({
  level = 1,
  children,
  className = '',
  ...props
}) {
  const Tag = `h${level}`;

  const styles = {
    1: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: '2.25rem',
      fontWeight: 400,
      lineHeight: 1.2,
      letterSpacing: '0.02em',
      color: '#4A4238',
      margin: 0,
    },
    2: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: '1.75rem',
      fontWeight: 400,
      lineHeight: 1.25,
      letterSpacing: '0.02em',
      color: '#4A4238',
      margin: 0,
    },
    3: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.3,
      color: '#2C2825',
      margin: 0,
    },
  };

  return (
    <Tag style={styles[level]} className={className} {...props}>
      {children}
    </Tag>
  );
}

export function Text({
  size = 'body',
  muted = false,
  children,
  className = '',
  ...props
}) {
  const styles = {
    body: {
      fontFamily: "'Inter', -apple-system, sans-serif",
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
      color: muted ? '#9B9386' : '#2C2825',
    },
    small: {
      fontFamily: "'Inter', -apple-system, sans-serif",
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
      color: muted ? '#9B9386' : '#2C2825',
    },
    tiny: {
      fontFamily: "'Inter', -apple-system, sans-serif",
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#9B9386',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
  };

  return (
    <p style={{ ...styles[size], margin: 0 }} className={className} {...props}>
      {children}
    </p>
  );
}

// ============================================
// BADGE
// ============================================

export function Badge({
  variant = 'default',
  children,
  className = '',
  ...props
}) {
  const variantStyles = {
    default: {
      background: 'rgba(155, 147, 134, 0.15)',
      color: '#9B9386',
    },
    success: {
      background: 'rgba(143, 168, 139, 0.15)',
      color: '#6B8B67',
    },
    warning: {
      background: 'rgba(187, 168, 126, 0.15)',
      color: '#9A8A5E',
    },
    error: {
      background: 'rgba(196, 112, 112, 0.15)',
      color: '#B35555',
    },
    info: {
      background: 'rgba(196, 133, 106, 0.15)',
      color: '#B5765B',
    },
  };

  const baseStyles = {
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: '0.75rem',
    fontWeight: 500,
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    ...variantStyles[variant],
  };

  return (
    <span style={baseStyles} className={className} {...props}>
      {children}
    </span>
  );
}

// ============================================
// DIVIDER
// ============================================

export function Divider({ className = '', ...props }) {
  const styles = {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #E8E2D9 20%, #E8E2D9 80%, transparent)',
    border: 'none',
    margin: '1.5rem 0',
  };

  return <hr style={styles} className={className} {...props} />;
}

// ============================================
// EXAMPLE USAGE
// ============================================

export function ExamplePage() {
  return (
    <div style={{
      background: '#FAF7F2',
      minHeight: '100vh',
      padding: '3rem'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Heading level={1}>Warm Minimalist Glass</Heading>
        <Text muted style={{ marginTop: '0.5rem' }}>
          A design system combining iOS 26 Liquid Glass with warm serif aesthetics
        </Text>

        <Divider />

        <GlassCard>
          <Heading level={2}>Glass Card Example</Heading>
          <Text style={{ marginTop: '1rem' }}>
            This card uses the default glass variant with blur and saturation effects.
          </Text>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <Badge variant="success">Active</Badge>
            <Badge variant="info">New</Badge>
            <Badge variant="warning">Pending</Badge>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <Button variant="primary">Primary Action</Button>
            <Button variant="glass">Glass Button</Button>
            <Button variant="outline">Outline</Button>
          </div>
        </GlassCard>

        <GlassCard variant="light" style={{ marginTop: '1.5rem' }}>
          <Heading level={3}>Form Example</Heading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <Input label="Full Name" placeholder="Enter your name" />
            <Input label="Email" type="email" placeholder="you@example.com" />
            <Input
              label="Password"
              type="password"
              error="Password must be at least 8 characters"
            />
          </div>
          <Button variant="primary" style={{ marginTop: '1.5rem', width: '100%' }}>
            Submit
          </Button>
        </GlassCard>
      </div>
    </div>
  );
}
