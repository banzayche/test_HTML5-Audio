import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import PropTypes from "prop-types";
import classNames from "classnames";
import styled from "styled-components";

const StyledH3 = styled.h3`
  font-weight: 200;
  font-size: 14px;
`;

const CodeSection = ({children, name, className}) => {
  return (
    <div className={classNames('CodeSection', className)}>
      {name ? <StyledH3>{name}</StyledH3> : ''}
      <SyntaxHighlighter language="jsx" style={darcula}  customStyle={{fontSize: '10px'}}>
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

CodeSection.propTypes = {
  children: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string
}

export default CodeSection;