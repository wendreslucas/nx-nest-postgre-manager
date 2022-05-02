import * as React from 'react';

import {
    Mjml,
    MjmlHead,
    MjmlTitle,
    MjmlPreview,
    MjmlBody,
    MjmlSection,
    MjmlColumn,
    MjmlButton,
    MjmlImage,
    MjmlStyle,
    MjmlText
} from 'mjml-react';

export const Standard = ({ title, text, logo, btnText, link, footer }) => {
  let updatedFooter = footer;
  if (typeof footer === 'string') {
    updatedFooter = JSON.parse(footer)
  }

  return (
    <Mjml>
      <MjmlHead>
      </MjmlHead>
      <MjmlBody width={500}>
      <MjmlSection fullWidth backgroundColor="#fff">
        <MjmlColumn>
            <MjmlImage align="center" src={logo} width={100}/>
        </MjmlColumn>
      </MjmlSection>
        <MjmlSection>
          <MjmlColumn>
            <MjmlText align="center" fontSize={24}>{title}</MjmlText>
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection>
          <MjmlColumn align="center">
            <MjmlText fontSize={18}>{text}</MjmlText>
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection>
          <MjmlColumn>
            <MjmlButton padding="20px" color="#000000" fontSize={16} backgroundColor="#cecece" href={link}>
              {btnText}
            </MjmlButton>
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection>
          {Object.keys(updatedFooter).map(key => {
            return (
              <MjmlColumn>
                <MjmlButton padding="20px" color="#9B9B9B" fontSize={16} backgroundColor="#fff" href={updatedFooter[key]}>
                  {key}
                </MjmlButton>
            </MjmlColumn>)
          })}
        </MjmlSection>
      </MjmlBody>
    </Mjml>
  );
};
