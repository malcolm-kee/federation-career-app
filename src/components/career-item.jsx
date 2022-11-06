import cx from 'classnames';
import { BriefcaseIcon, ChevronRightIcon } from '@heroicons/react/solid';
import styles from './career-item.module.css';
import * as React from 'react';

export const CareerItem = ({
  jobTitle,
  department,
  level,
  isLoading,
  className,
}) => {
  const [images] = React.useState(() => getRandomImages());

  return (
    <a
      href="#"
      className={cx(styles.root, isLoading && styles.rootLoading, className)}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            <div className={styles.title}>
              {jobTitle}{' '}
              {isLoading && (
                <span
                  className={cx(styles.placeholder, styles.titlePlaceholder)}
                />
              )}
              <span className={styles.department}>
                in {department}
                {isLoading && (
                  <span
                    className={cx(
                      styles.placeholder,
                      styles.departmentPlaceholder
                    )}
                  />
                )}
              </span>
            </div>
            <div className={styles.description}>
              <BriefcaseIcon className={cx(styles.icon, styles.descIcon)} />
              <span>
                Level: {level}
                {isLoading && (
                  <span
                    className={cx(styles.placeholder, styles.descPlaceholder)}
                  />
                )}
              </span>
            </div>
          </div>
          <div className={styles.applicants}>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  className={cx(
                    styles.placeholder,
                    styles.applicationPreviewPlaceholder
                  )}
                  key={index}
                />
              ))
            ) : (
              <>
                {images.map((src) => (
                  <img
                    className={styles.applicantPreview}
                    src={src}
                    alt=""
                    key={src}
                  />
                ))}
              </>
            )}
          </div>
        </div>
        <div className={styles.moreSection}>
          <ChevronRightIcon className={styles.icon} />
        </div>
      </div>
    </a>
  );
};

const getRandomImages = () => {
  const len = randomInt(1, applicationsImages.length);
  const result = shuffle(applicationsImages.slice()).slice(0, len);
  return result;
};

const applicationsImages = [
  'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
];

const randomInt = (min, max) => Math.random() * (max - min) + min;

/**
 *  Fisher-Yates (aka Knuth) Shuffle from https://stackoverflow.com/a/2450976
 */
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
