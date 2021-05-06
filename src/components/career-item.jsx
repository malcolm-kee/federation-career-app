import cx from 'classnames';
import { BriefcaseIcon, ChevronRightIcon } from '@heroicons/react/solid';

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
      'cr-block hover:cr-bg-gray-50 focus:cr-outline-none focus:cr-bg-gray-50 cr-transition cr-duration-150 cr-ease-in-out',
      isLoading && 'cr-animate-pulse',
      className
    )}
  >
    <div className="cr-px-4 cr-py-4 cr-flex cr-items-center sm:cr-px-6">
      <div className="cr-min-w-0 cr-flex-1 sm:cr-flex sm:cr-items-center sm:cr-justify-between">
        <div>
          <div className="cr-leading-5 cr-font-medium cr-text-blue-600 cr-truncate">
            {jobTitle}{' '}
            {isLoading && (
              <span className="cr-inline-block cr-bg-gray-300 cr-w-36 cr-h-5" />
            )}
            <span className="cr-ml-1 cr-font-normal cr-text-gray-500">
              in {department}{' '}
              {isLoading && (
                <span className="cr-inline-block cr-bg-gray-300 cr-w-24 cr-h-5" />
              )}
            </span>
          </div>
          <div className="cr-mt-2 cr-flex">
            <div className="cr-flex cr-items-center cr-text-sm cr-leading-5 cr-text-gray-500">
              <BriefcaseIcon className="cr-flex-shrink-0 cr-mr-1.5 cr-h-5 cr-w-5 cr-text-gray-400" />
              <span>
                Level: {level}{' '}
                {isLoading && (
                  <span className="cr-inline-block cr-bg-gray-300 cr-w-20 cr-h-4" />
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="cr-mt-4 cr-flex-shrink-0 sm:cr-mt-0">
          {!isLoading && (
            <div className="cr-flex cr-overflow-hidden">
              <img
                className="cr-inline-block cr-h-6 cr-w-6 cr-rounded-full cr-text-white cr-shadow-solid"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="cr--ml-1 cr-inline-block cr-h-6 cr-w-6 cr-rounded-full cr-text-white cr-shadow-solid"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="cr--ml-1 cr-inline-block cr-h-6 cr-w-6 cr-rounded-full cr-text-white cr-shadow-solid"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="cr--ml-1 cr-inline-block cr-h-6 cr-w-6 cr-rounded-full cr-text-white cr-shadow-solid"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
          )}
        </div>
      </div>
      <div className="cr-ml-5 cr-flex-shrink-0">
        <ChevronRightIcon className="cr-h-5 cr-w-5 cr-text-gray-400" />
      </div>
    </div>
  </a>
);
