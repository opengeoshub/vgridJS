"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[617],{6263:(i,e,o)=>{o.r(e),o.d(e,{default:()=>b});o(6540);var t=o(4586),n=o(3540);const r=i=>"@media screen and (max-width: 480px)",a=n.Ay.section`
  position: relative;
  height: 30rem;
  background: var(--ifm-color-gray-400);
  color: var(--ifm-color-gray-200);
  z-index: 0;
  ${r} {
    height: 80vh;
  }
`,l=n.Ay.div`
  position: relative;
  padding: 2rem;
  max-width: 80rem;
  width: 100%;
  height: 100%;
  margin: 0;
`,d=(0,n.Ay)(l)`
  position: absolute;
  bottom: 0;
  height: auto;
  padding-left: 4rem;
  z-index: 0;
  pointer-events: none;
  ${r} {
    pointer-events: auto;
    padding-left: 2rem;
  }
`,p=(n.Ay.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`,n.Ay.section`
  &:nth-child(2n + 1) {
    background: var(--ifm-color-gray-300);
  }
`,n.Ay.h1`
  font-size: 5em;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: 700;
  margin: 0;
  margin-bottom: 16px;
`),s=n.Ay.a`
  pointer-events: all;
  font-size: 12px;
  line-height: 44px;
  letter-spacing: 2px;
  font-weight: bold;
  margin: 12px 0;
  padding: 0 2rem;
  pointer-events: all;
  display: inline-block;
  text-decoration: none;
  transition: background-color 250ms ease-in, color 250ms ease-in;
  background-color: var(--ifm-color-primary-lightest);
  border: solid 2px var(--ifm-color-primary);
  color: var(--ifm-color-gray-900);
  border-image: linear-gradient(
    to right,
    var(--ifm-color-gray-700) 0%,
    var(--ifm-color-gray-400) 100%
  );
  border-image-slice: 2;
  width: fit-content;
  &:active {
    color: var(--ifm-color-white);
  }
  &:hover {
    color: var(--ifm-color-white);
    background-color: var(--ifm-color-primary);
  }
`;var c=o(4848);function h({children:i}){const{siteConfig:e}=(0,t.A)();return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a,{children:(0,c.jsxs)(d,{children:[(0,c.jsx)(p,{children:e.title}),(0,c.jsx)("p",{children:e.tagline}),(0,c.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:(0,c.jsx)(s,{href:"./docs/",children:"INTRODUCTION"})})]})}),i]})}n.Ay.div`
  font-size: 14px;
  position: absolute;
  top: 0;
  right: 0;
  width: 344px;
  background: var(--ifm-background-surface-color);
  box-shadow: var(--ifm-global-shadow-lw);
  margin: 24px;
  padding: 10px 24px;
  max-height: 96%;
  overflow-x: hidden;
  overflow-y: auto;
  overflow-y: overlay;
  outline: none;
  z-index: 1;

  ${r} {
    width: auto;
    left: 0;
    padding: 10px 106x;
    ${i=>!i.$expanded&&"\n      background: transparent;\n      box-shadow: none;\n      pointer-events: none;\n    "}
  }
`,n.Ay.div`
  display: none;
  width: 16px;
  height: 16px;
  font-family: serif;
  font-size: 0.8em;
  text-align: center;
  line-height: 16px;
  border-radius: 50%;
  background: ${i=>i.$expanded?"none":"var(--ifm-color-gray-900)"};
  color: ${i=>i.$expanded?"var(--ifm-color-black)":"var(--ifm-color-white)"};
  ${r} {
    display: block;
    position: relative;
    top: ${i=>i.$expanded?"0":"-18px"};
    left: ${i=>i.$expanded?"0":"24px"};
    width: 32px;
    height: 32px;
    line-height: 24px;
    font-size: 1em;
    background: ${i=>i.$expanded?"none":"white"};
    color: ${i=>i.$expanded?"var(--ifm-color-black)":"var(--ifm-color-gray-900)"};
    border-radius: 32px;
    padding: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    pointer-events: auto;
  }
`,n.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font: bold 1.25em var(--ifm-font-family-base);
  margin: 8px 0;
  ${r} {
    cursor: pointer;
    ${i=>!i.$expanded&&"\n      > div:first-child {\n        display: none;\n      }\n      justify-content: flex-end;\n    "}
  }
`,n.Ay.div`
  div > * {
    vertical-align: middle;
    white-space: nowrap;
  }
  div > label {
    display: inline-block;
    width: 40%;
    margin-right: 10%;
    color: var(--ifm-color-content-secondary);
    margin-top: 2px;
    margin-bottom: 2px;
  }
  div > input,
  div > a,
  div > button,
  div > select {
    font: normal 11px/16px var(--ifm-font-family-base);
    line-height: 20px;
    text-transform: none;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
    padding: 0 4px;
    width: 50%;
    height: 20px;
    text-align: left;
  }
  div > button {
    color: initial;
  }
  div > button:disabled {
    color: var(--ifm-color-gray-300);
    cursor: default;
    background: var(--ifm-color-gray-300);
  }
  div > input {
    border: solid 1px var(--ifm-color-gray-300);
    &:disabled {
      background: var(--ifm-color-white);
    }
    &[type='checkbox'] {
      height: auto;
    }
  }
  p {
    margin-bottom: 12px;
    white-space: initial;
  }
  ${r} {
    display: ${i=>i.$expanded?"block":"none"};
  }
`,n.Ay.a`
  display: block;
  text-align: right;
  margin-top: 8px;
  font: bold 12px/20px var(--ifm-font-family-base);
  color: var(--ifm-color-content-secondary);
  ${r} {
    display: ${i=>i.$expanded?"block":"none"};
  }
`,n.Ay.div`
  position: relative;
  width: 100%;

  &:last-child {
    margin-bottom: 20px;
  }

  > * {
    vertical-align: middle;
    white-space: nowrap;
  }
  label {
    display: inline-block;
    width: 40%;
    margin-right: 10%;
    margin-top: 2px;
    margin-bottom: 2px;
  }
  input,
  a,
  button {
    background: var(--ifm-background-surface-color);
    font-size: 0.9em;
    text-transform: none;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
    padding: 0 4px;
    margin: 0;
    width: 50%;
    height: 20px;
    line-height: 1.833;
    text-align: left;
  }
  button {
    color: initial;
  }
  button:disabled {
    color: var(--ifm-color-gray-500);
    cursor: default;
    background: var(--ifm-color-gray-300);
  }
  input {
    border: solid 1px var(--ifm-color-gray-500);
    &:disabled {
      background: var(--ifm-color-gray-300);
    }
    &[type='checkbox'] {
      height: auto;
    }
  }
  .tooltip {
    left: 50%;
    top: 24px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 200ms;
  }
  &:hover .tooltip {
    opacity: 1;
  }
`;n.Ay.div`
  height: 18px;
  line-height: 18px;
  font-size: 10px;

  > div {
    white-space: nowrap;
    left: 0;
    bottom: 0;
    position: absolute;
    height: 18px;
    padding-left: 20px;
    transition: width 0.5s;
  }
  .spinner--fill {
    background: $primary;
    color: $white;
    overflow: hidden;
  }
  .spinner--text {
    color: $black-40;
  }

  &.done {
    height: 0 !important;
    line-height: 0;
    font-size: 0;
    transition: height 0.5s 1s;

    > div {
      height: 0 !important;
      transition: height 0.5s 1s;
    }
  }
`;n.Ay.div`
  hr {
    margin: 12px -24px;
  }
  a {
    text-decoration: none;
    display: inline;
    color: var(--ifm-color-primary);
  }
  p {
    margin-bottom: 16px;
  }
  .legend {
    display: inline-block;
    width: 12px;
    height: 12px;
  }
  .stat {
    text-transform: uppercase;
    font-size: 0.833em;

    b {
      display: block;
      font-size: 3em;
      font-weight: bold;
      line-height: 1.833;
    }
  }
  hr {
    border: none;
    background: var(--ifm-color-gray-400);
    height: 1px;
  }
  .layout {
    display: table;
    width: 100%;

    > * {
      display: table-cell !important;
    }
    .col-1-3 {
      width: 33.33%;
    }
    .col-1-2 {
      width: 50%;
    }
    .text-right {
      text-align: right;
    }
    .text-center {
      text-align: center;
    }
  }
`;var g=o(6025),x=o(1656);const m=n.Ay.div`
  position: absolute;
  height: 100%;
  width: 50%;
  top: 0;
  right: 0;
  z-index: -1;
  border-top: solid 200px transparent;
  background-image: url(${i=>i.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right top;

  @media screen and (max-width: 768px) {
    display: none;
  }
`,f=n.Ay.div`
  max-width: 800px;
  padding: 64px 112px;
  width: 70%;
  font-size: 14px;

  h2 {
    font: bold 32px/48px;
    margin: 24px 0 16px;
    position: relative;
  }
  h3 {
    font: bold 16px/24px;
    margin: 16px 0 0;
    position: relative;
  }
  h3 > img {
    position: absolute;
    top: 0;
    width: 20px;
    left: -30px;
  }
  hr {
    border: none;
    background: #e1e8f0;
    height: 1px;
    margin: 24px 0 0;
    width: 32px;
    height: 2px;
  }
  @media screen and (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    padding: 48px 48px 48px 80px;
  }
`;function b(){const i=(0,g.Ay)("/");return(0,c.jsx)(x.A,{title:"Home",description:"Vgrid DGGS JS",children:(0,c.jsx)(h,{children:(0,c.jsxs)("div",{style:{position:"relative"},children:[(0,c.jsx)(m,{src:`${i}images/maps.jpg`}),(0,c.jsxs)(f,{children:[(0,c.jsxs)("h3",{children:[(0,c.jsx)("img",{src:`${i}images/vgrid.svg`}),"Pentagonal Discrete Global Grid System"]}),(0,c.jsxs)("p",{children:["A5 is a global geospatial index. It is the pentagonal equivalent of other DGGSs, like ",(0,c.jsx)("a",{href:"http://s2geometry.io/",children:"S2"})," or ",(0,c.jsx)("a",{href:"https://h3geo.org/",children:"H3"}),", but with higher accuracy and lower distortion."]}),(0,c.jsxs)("h3",{children:[(0,c.jsx)("img",{src:`${i}images/vgrid.svg`}),"Flexible representation of geospatial data"]}),(0,c.jsx)("p",{children:"A5 is used for representing points, lines, and polygons in a unified cell format, which is well suited for combining datasets and aggregating data."}),(0,c.jsxs)("h3",{children:[(0,c.jsx)("img",{src:`${i}images/vgrid.svg`}),"Uniform Cell Sizes with Minimal Distortion"]}),(0,c.jsx)("p",{children:"Data from all around the world can be directly compared due to the practically equal areas of all A5 cells."})]})]})})})}}}]);