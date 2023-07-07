import PropTypes from "prop-types";
import CodeSection from "./CodeBlock";
import { memo } from "react";
import './DiscoveryCard.scss';

const DiscoveryCard = memo(({children, sectionName, exampleUsageCode, code, exampleName, codeName, description}) => {
  return (
    <div className="DiscoveryCard">
      {sectionName ? <h2>{sectionName}</h2> : ''}
      {description? <p>{description}</p> : ''}
      <div className="DiscoveryCard__listContainer">
          <div className="DiscoveryCard__listContainer__children">{children}</div>
          {exampleUsageCode ? <CodeSection className="DiscoveryCard__listContainer__codeExample" name={exampleName}>{exampleUsageCode}</CodeSection> : ''}
      </div>
      {code ? <CodeSection name={codeName}>{code}</CodeSection> : ''}
    </div>
    );
});

DiscoveryCard.propTypes = {
  children: PropTypes.any,
  sectionName: PropTypes.string,
  exampleUsageCode: PropTypes.string,
  code: PropTypes.string,
  exampleName: PropTypes.string,
  codeName: PropTypes.string,
  description: PropTypes.string
}

export default DiscoveryCard;