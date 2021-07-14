import styled from '@emotion/styled';
import { SmileOutlined } from '@ant-design/icons';

const FooterBlock = styled.footer`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 15px;
`;

const Footer = () => {
  return (
    <FooterBlock>
      Happy Guitar Learn{' '}
      <SmileOutlined style={{ color: 'violet', paddingLeft: '5px' }} />
    </FooterBlock>
  );
};

export default Footer;
