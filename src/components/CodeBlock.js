import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import PropTypes from "prop-types";
import classNames from "classnames";

const CodeSection = ({children, name, className}) => {
  return (
    <div className={classNames('CodeSection', className)}>
      {name ? <h3>{name}</h3> : ''}
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