import { Lock, ArrowRight } from 'lucide-react';

const LoginRequired = ({ onLogin }) => {
  const styles = {
    wrapper: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
      padding: '2rem',
    },
    card: {
      maxWidth: '420px',
      width: '100%',
      borderRadius: '1rem',
      border: '1px solid #e0e0e0',
      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
      background: '#ffffff',
      padding: '2.5rem 2rem',
      textAlign: 'center',
    },
    iconWrapper: {
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      background: '#f0f7ff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1.5rem',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '700',
      marginBottom: '0.75rem',
      color: '#000000',
    },
    description: {
      fontSize: '0.95rem',
      color: '#6b7280',
      marginBottom: '2rem',
    },
    button: {
      width: '100%',
      background: '#1e40af',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.75rem',
      padding: '0.9rem 1rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'background 0.2s ease',
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.iconWrapper}>
          <Lock size={28} style={{ color: '#1e40af' }} />
        </div>

        <h2 style={styles.title}>Login Required</h2>
        <p style={styles.description}>
          Please log in to continue with your booking and securely complete the payment.
        </p>

        <button
          style={styles.button}
          onClick={onLogin}
          onMouseOver={(e) => (e.currentTarget.style.background = '#1e3a8a')}
          onMouseOut={(e) => (e.currentTarget.style.background = '#1e40af')}
        >
          Go to Login
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
export default LoginRequired;