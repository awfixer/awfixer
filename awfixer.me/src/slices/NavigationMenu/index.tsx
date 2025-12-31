"use client";

import { type FC, useState } from "react";
import { type Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { type SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";

/**
 * Props for `NavigationMenu`.
 */
type NavigationMenuProps = SliceComponentProps<Content.NavigationMenuSlice>;

/**
 * Component for `NavigationMenu` Slices.
 */
const NavigationMenu: FC<NavigationMenuProps> = ({ slice }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.container}>
        <div className={styles.navHeader}>
          <button
            className={styles.mobileToggle}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>

        <ul
          className={`${styles.navList} ${isMobileMenuOpen ? styles.navListOpen : ""}`}
        >
          {slice.primary.menu_items.map((item, index) => (
            <li key={index} className={styles.navItem}>
              <PrismicNextLink
                field={item.link}
                className={styles.navLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </PrismicNextLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationMenu;
