import PropTypes from "prop-types";
import { memo } from "react";
import './DiscoverySection.scss';

const DiscoverySection = memo(({children, sectionName, description}) => {
  return (
    <div className="DiscoverySection">
      <h2 className="DiscoverySection__sectionName">{sectionName}</h2>
      {description? <p className="DiscoverySection__description">{description}</p> : ''}
      <div className="DiscoverySection__listContainer">
        {children}
      </div>
    </div>
  );
});

DiscoverySection.propTypes = {
  children: PropTypes.any,
  sectionName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default DiscoverySection;