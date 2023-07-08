import PropTypes from "prop-types";
import CodeSection from "./CodeBlock";
import { memo } from "react";
import './DiscoveryCard.scss';

const DiscoveryCard = memo(({children, exampleUsageCode, code, exampleName, codeName, theme}) => {
  return (
    <div className="DiscoveryCard">
      <div className="DiscoveryCard__listContainer">
          <div className="DiscoveryCard__listContainer__children">{children}</div>
          {exampleUsageCode ? <CodeSection className={`DiscoveryCard__listContainer__codeExample DiscoveryCard__listContainer__codeExample--${theme}`} name={exampleName}>{exampleUsageCode}</CodeSection> : ''}
      </div>
    </div>
    );
});

DiscoveryCard.propTypes = {
  children: PropTypes.any,
  exampleUsageCode: PropTypes.string,
  code: PropTypes.string,
  exampleName: PropTypes.string,
  codeName: PropTypes.string,
  theme: PropTypes.string
}

export default DiscoveryCard;