import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    // 当需要监视所有函数组件时设置为 true
    trackAllPureComponents: false,
  });
}