import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className='pb-20 pt-4 text-center bg-slate-950 md:pb-4' style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.copyright}>
          © {new Date().getFullYear()} CPM Autos S.R.L. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  links: {
    marginBottom: '10px',
  },
  link: {
    color: '#fff',
    margin: '0 10px',
    textDecoration: 'none',
  },
  copyright: {
    fontSize: '14px',
  },
  
};

export default Footer;