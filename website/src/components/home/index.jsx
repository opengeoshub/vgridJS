import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {Banner, BannerContainer, ProjectName, GetStartedLink} from './styled';
import styled from 'styled-components';
import {isMobile} from '../common';

export default function renderPage({children}) {
  const {siteConfig} = useDocusaurusContext();

  // Note: The Layout "wrapper" component adds header and footer etc
  return (
    <>
      <Banner>
        <BannerContainer>
          <ProjectName>{siteConfig.title}</ProjectName>
          <p>{siteConfig.tagline}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <GetStartedLink href="./docs/">INTRODUCTION</GetStartedLink>
          </div>
        </BannerContainer>
      </Banner>
      {children}
    </>
  );
}
