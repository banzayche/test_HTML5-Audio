import PropTypes from "prop-types";
import { memo } from "react";
import styled from "styled-components";

const StyledDiscoverySection = styled.div`
  margin-bottom: 30px;

  .sectionName {
    text-align: center;
    border-bottom-width: 1px;
    border-bottom-style: dashed;
    margin-bottom: 30px;
    margin-top: 30px;
  }

  .description {
    padding-bottom: 30px;
  }
`;

const DiscoverySection = memo(({children, sectionName, description}) => {
  return (
    <StyledDiscoverySection className="DiscoverySection">
      <h2 className="sectionName">{sectionName}</h2>
      {description? <p className="description">{description}</p> : ''}
      <div>{children}</div>
    </StyledDiscoverySection>
  );
});

DiscoverySection.propTypes = {
  children: PropTypes.any,
  sectionName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default DiscoverySection;