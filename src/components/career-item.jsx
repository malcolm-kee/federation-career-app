import cx from 'classnames';
import Briefcase from 'heroicons/react/solid/Briefcase';
import ChevronRight from 'heroicons/react/solid/ChevronRight';
import * as React from 'react';

export const CareerItem = ({
  jobTitle,
  department,
  level,
  isLoading,
  className,
}) => (
  <a
    href="#"
    className={cx(
      'block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out',
      isLoading && 'animate-pulse',
      className
    )}
  >
    <div className="px-4 py-4 flex items-center sm:px-6">
      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
            {jobTitle}{' '}
            {isLoading && (
              <span className="inline-block bg-gray-300 w-36 h-5" />
            )}
            <span className="ml-1 font-normal text-gray-500">
              in {department}{' '}
              {isLoading && (
                <span className="inline-block bg-gray-300 w-24 h-5" />
              )}
            </span>
          </div>
          <div className="mt-2 flex">
            <div className="flex items-center text-sm leading-5 text-gray-500">
              <Briefcase className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
              <span>
                Level: {level}{' '}
                {isLoading && (
                  <span className="inline-block bg-gray-300 w-20 h-4" />
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex-shrink-0 sm:mt-0">
          {!isLoading && (
            <div className="flex overflow-hidden">
              <img
                className="inline-block h-6 w-6 rounded-full text-white shadow-solid"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="-ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="-ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="-ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
          )}
        </div>
      </div>
      <div className="ml-5 flex-shrink-0">
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  </a>
);
