import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import Root from './Root';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(<Root />);
