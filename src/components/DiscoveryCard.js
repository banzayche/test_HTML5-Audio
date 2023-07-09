import PropTypes from "prop-types";
import { memo } from "react";
import CodeSection from "./CodeBlock";
import styled from "styled-components";

const StyledDiscoveryCard = styled.div`
  margin-bottom: 30px;

  .listContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    .children {
      width: 300px;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    .codeExample {
      width: 750px;

      .dark {
        opacity: 1;
      }
      .light {
        opacity: .7;
      }
    }
  }
`;

const DiscoveryCard = memo(({children, exampleUsageCode, code, exampleName, codeName, theme}) => {
  return (
    <StyledDiscoveryCard className="DiscoveryCard">
      <div className="listContainer">
          <div className="children">{children}</div>
          {exampleUsageCode ? <CodeSection className={`codeExample ${theme}`} name={exampleName}>{exampleUsageCode}</CodeSection> : ''}
      </div>
      {code ? <CodeSection name={codeName}>{code}</CodeSection> : ''}
    </StyledDiscoveryCard>
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