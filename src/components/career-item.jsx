import { BriefcaseIcon, ChevronRightIcon } from '@heroicons/react/solid';
import * as React from 'react';
import { prefixClasses as cx } from '../lib/prefix-classes';

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
      className={cx(
        'block transition-all focus:outline-none focus:bg-gray-100 hover:outline-none hover:bg-gray-100 group/careeritem',
        isLoading && 'animate-pulse',
        className
      )}
    >
      <div className={cx('flex items-center p-4 sm:px-6')}>
        <div
          className={cx(
            'flex-1 min-w-0 sm:flex sm:justify-between sm:items-center'
          )}
        >
          <div>
            <div className={cx('text-sm font-medium text-pink-600 truncate')}>
              {jobTitle}{' '}
              {isLoading && (
                <span className={cx('inline-block bg-gray-300 w-36 h-5')} />
              )}
              <span className={cx('ml-1 font-normal text-gray-500')}>
                in {department}
                {isLoading && (
                  <span className={cx('inline-block bg-gray-300 w-24 h-5')} />
                )}
              </span>
            </div>
            <div className={cx('flex items-center text-sm mt-2 text-gray-500')}>
              <BriefcaseIcon
                className={cx('h-5 w-5 text-gray-400 flex-shrink-0 mr-[6px]')}
              />
              <span>
                Level: {level}
                {isLoading && (
                  <span className={cx('inline-block bg-gray-300 w-20 h-4')} />
                )}
              </span>
            </div>
          </div>
          <div
            className={cx(
              'flex flex-row-reverse justify-end mt-4 flex-shrink-0 overflow-hidden transition-all gap-0 group-hover/careeritem:gap-2 sm:mt-0'
            )}
          >
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  className={cx(
                    'inline-block bg-gray-300 w-6 h-6 rounded-full outline-2 outline-white'
                  )}
                  key={index}
                />
              ))
            ) : (
              <>
                {images.map((src) => (
                  <img
                    className={cx(
                      'inline-block h-6 w-6 rounded-full text-white outline-2 outline-white'
                    )}
                    src={src}
                    alt=""
                    key={src}
                  />
                ))}
              </>
            )}
          </div>
        </div>
        <div className={cx('ml-5 flex-shrink-0')}>
          <ChevronRightIcon className={cx('h-5 w-5 text-gray-400')} />
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
