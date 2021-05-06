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
    <div className="cr-max-w-6xl cr-mx-auto cr-px-2 sm:cr-px-6 cr-py-2">
      <h1 className="cr-text-3xl sm:cr-text-5xl cr-mb-6">Careers</h1>
      <div className="cr-bg-white cr-shadow cr-overflow-hidden sm:cr-rounded-md">
        <ul>
          {isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <li
                className={i !== 0 ? 'cr-border-t cr-border-gray-200' : ''}
                key={i}
              >
                <CareerItem isLoading />
              </li>
            ))}
          {data &&
            data.map((job, index) => (
              <li
                className={index !== 0 ? 'cr-border-t cr-border-gray-200' : ''}
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
