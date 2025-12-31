import { type FC } from "react";
import { PrismicNextLink } from "@prismicio/next";
import { type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

/**
 * Props for `Footer`.
 */
type FooterProps = SliceComponentProps<any>;

/**
 * Component for `Footer` Slices.
 */
const Footer: FC<FooterProps> = ({ slice }) => {
  const getSocialIcon = (platform: string) => {
    const iconMap: Record<string, string> = {
      Twitter: "🐦",
      LinkedIn: "💼",
      GitHub: "🐙",
      Instagram: "📷",
      Facebook: "📘"
    };
    return iconMap[platform] || "🔗";
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Navigation Links */}
          {slice.primary.navigation_links?.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Navigation</h3>
              <ul className={styles.linkList}>
                {slice.primary.navigation_links.map((item: any, index: number) => (
                  <li key={index}>
                    <PrismicNextLink field={item.link} className={styles.link}>
                      {item.label}
                    </PrismicNextLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social Links */}
          {slice.primary.social_links?.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Follow Us</h3>
              <div className={styles.socialLinks}>
                {slice.primary.social_links.map((item: any, index: number) => (
                  <PrismicNextLink
                    key={index}
                    field={item.url}
                    className={styles.socialLink}
                    aria-label={item.platform}
                  >
                    <span className={styles.socialIcon}>
                      {getSocialIcon(item.platform)}
                    </span>
                    <span className={styles.socialText}>{item.platform}</span>
                  </PrismicNextLink>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p>{slice.primary.copyright_text || "© 2024 Your Company"}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;