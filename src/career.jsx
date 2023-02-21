import cx from 'classnames';
import * as React from 'react';
import { useQuery } from 'react-query';
import { CareerItem } from './components/career-item';

const Banner = React.lazy(() => import('marketing/banner'));

const getJobs = () => {
  return fetch('https://ecomm-service.fly.dev/job').then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res);
  });
};

export function Career() {
  const { data, isLoading } = useQuery(['careers'], () => getJobs());

  return (
    <div className={cx('max-w-6xl mx-auto p-2')}>
      <h1 className={cx('text-3xl mb-6 text-center font-bold sm:text-5xl')}>
        Careers
      </h1>
      <div className={cx('bg-white shadow')}>
        <ul>
          {isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <li
                className={cx('border-t border-t-gray-200 first:border-t-0')}
                key={i}
              >
                <CareerItem isLoading />
              </li>
            ))}
          {data &&
            data.map((job) => (
              <li
                className={cx('border-t border-t-gray-200 first:border-t-0')}
                key={job._id}
              >
                <CareerItem
                  jobTitle={job.title}
                  department={job.department}
                  level={job.level}
                />
              </li>
            ))}
        </ul>
      </div>
      <Banner />
    </div>
  );
}

export default Career;
