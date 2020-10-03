import * as React from 'react';
import { useQuery } from 'react-query';
import './career.css';
import { CareerItem } from './components/career-item';

export default function Career() {
  const { data, isLoading } = useQuery(['careers'], () =>
    fetch('https://ecomm-service.herokuapp.com/job').then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res);
    })
  );

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-6 py-2">
      <h1 className="text-5xl mb-6">Careers</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul>
          {isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <li className={i !== 0 ? 'border-t border-gray-200' : ''} key={i}>
                <CareerItem isLoading />
              </li>
            ))}
          {data &&
            data.map((job, index) => (
              <li
                className={index !== 0 ? 'border-t border-gray-200' : ''}
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
    </div>
  );
}
