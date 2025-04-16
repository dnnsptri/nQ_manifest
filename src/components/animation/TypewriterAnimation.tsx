'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaMedium } from 'react-icons/fa6';
import styles from './TypewriterAnimation.module.css';

const text = [
  "A new era, a new collective",
  "United by the same purpose:",
  "Build Open Source Decentralized AI,",
  "with humanities best interest at its core.",
  " ",
  "Our commitment:",
  "The highest APRs",
  "Cutting edge models",
  "The best research",
  "And real-world adoption for Bittensor subnets.",
  " ",
  "Stake with us and be part of the movement",
];

const TypewriterAnimation: React.FC = () => {
  const [displayText, setDisplayText] = useState<string[]>(Array(text.length).fill(''));
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const maxDuration = 5000; // 5 seconds maximum

    const typingInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      
      // Force complete if we're approaching max duration
      if (elapsedTime >= maxDuration) {
        setDisplayText(text);
        setIsComplete(true);
        clearInterval(typingInterval);
        return;
      }

      if (currentLine < text.length) {
        if (currentChar < text[currentLine].length) {
          setDisplayText(prev => {
            const newText = [...prev];
            newText[currentLine] = text[currentLine].substring(0, currentChar + 1);
            return newText;
          });
          setCurrentChar(prev => prev + 1);
        } else {
          setCurrentLine(prev => prev + 1);
          setCurrentChar(0);
        }
      } else {
        setIsComplete(true);
        clearInterval(typingInterval);
      }
    }, 25); // Reduced from 50ms to 25ms for 2x speed

    return () => clearInterval(typingInterval);
  }, [currentLine, currentChar]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image
          src="/images/nQ_icon.gif"
          alt="NeuralTeq Logo"
          width={92}
          height={92}
          priority
          unoptimized
        />
      </div>
      
      <div className={styles.content}>
        <div className={styles.textContainer}>
          {displayText.map((line, index) => (
            <div 
              key={index} 
              className={styles.line}
              style={{ 
                opacity: 1 - (Math.max(0, currentLine - index - 1) * 0.1)
              }}
            >
              {line}
              {((index === currentLine && !isComplete) || (index === text.length - 1 && isComplete)) && 
                showCursor && <span className={styles.cursor}>_</span>}
            </div>
          ))}
        </div>
        
        {isComplete && (
          <div className={styles.callToAction}>
            <p className={styles.callToActionText}>Let's get down to business and jump straight into:</p>
            <div className={styles.buttons}>
              <button className={`${styles.button} ${styles.primaryButton}`}>stake now</button>
              <button className={styles.button}>validator</button>
              <a href="#" className={styles.textLink}>Straight to the homepage</a>
            </div>
          </div>
        )}
      </div>

      <div className={styles.socialIcons}>
        <a 
          href="https://discord.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.icon} 
          aria-label="Discord"
        >
          <FaDiscord size={24} />
        </a>
        <a 
          href="https://x.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.icon} 
          aria-label="X (Twitter)"
        >
          <FaXTwitter size={24} />
        </a>
        <a 
          href="https://medium.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.icon} 
          aria-label="Medium"
        >
          <FaMedium size={24} />
        </a>
      </div>

      <a 
        href="https://www.dennispetri.nl" 
        className={`${styles.skipLink} ${isComplete ? styles.hidden : ''}`}
      >
        Skip this, go directly to the Neuralteq homepage
      </a>

      <footer className={`${styles.footer} ${isComplete ? styles.visible : ''}`}>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>Privacy Policy</a>
          <a href="#" className={styles.footerLink}>Terms of Service</a>
          <a href="mailto:info@neuralteq.com" className={styles.footerLink}>Get in touch</a>
        </div>
        <div>© {new Date().getFullYear()} Neuralteq. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default TypewriterAnimation; 