
import React from 'react';
import servicesData from '../../api/servicesData';
import styles from './Services.module.css'; 

const ServicesPage = () => {
  const { services, managers } = servicesData;

  return (
    <div>
      <h2 className={styles.heading}>Our Services</h2>
      <p className={styles.introText}>A nod to the allure and elegance the products aim to provide.</p>
      
      <div className={styles.servicesSection}>
        {services.map(service => (
          <div key={service.id} className={styles.service}>
            <img src={service.imageUrl} alt={service.title} className={styles.serviceImage} />
            <h3 className={styles.serviceTitle}>{service.title}</h3>
            <p className={styles.serviceDescription}>{service.description}</p>
          </div>
        ))}
      </div>

      <h2 className={styles.heading}>Meet Our Managers</h2>
      <div className={styles.managersSection}>
        {managers.map(manager => (
          <div key={manager.id} className={styles.manager}>
            <img src={manager.imageUrl} alt={manager.name} className={styles.managerImage} />
            <h3 className={styles.managerName}>{manager.name}</h3>
            <p className={styles.managerRole}><strong>{manager.role}</strong></p>
            <p className={styles.managerBio}>{manager.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
