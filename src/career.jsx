import * as React from 'react';
import { useQuery } from 'react-query';
import styles from './career.module.css';
import { CareerItem } from './components/career-item';
import { Slot } from '@mkeeorg/federation-ui';

const Banner = React.lazy(() => import('marketing/banner'));

export function Career() {
  const { data, isLoading } = useQuery(['careers'], () =>
    fetch('https://ecomm-service.herokuapp.com/job').then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res);
    })
  );

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Careers</h1>
      <Slot slotId="careerPrelist" />
      <div className={styles.careerList}>
        <ul>
          {isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <li className={styles.careerItem} key={i}>
                <CareerItem isLoading />
              </li>
            ))}
          {data &&
            data.map((job) => (
              <li className={styles.careerItem} key={job._id}>
                <CareerItem
                  jobTitle={job.title}
                  department={job.department}
                  level={job.level}
                />
              </li>
            ))}
        </ul>
      </div>
      <Slot slotId="careerPostlist" />
      <Banner />
    </div>
  );
}

export default Career;
