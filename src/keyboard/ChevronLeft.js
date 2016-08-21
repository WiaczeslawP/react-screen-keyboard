import React from 'react';

const ChevronLeft = ({viewBox = '0 0 24 24', width = 24, height = 24, fill, classes}) =>
	<svg {...{width, height, fill, classes, viewBox}}>
		<path xmlns="http://www.w3.org/2000/svg" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
	</svg>
;

export default ChevronLeft;
