var courseItemContainer=document.createElement('div');
courseItemContainer.className='h-full px-3';
var courseTitle=document.createElement('h4');
courseTitle.className='flex justify-between mb-3';
var titleSpan=document.createElement('span');
titleSpan.className='text-xl';
titleSpan.textContent='Fundamentals of Software Engineering';

var titleSpanTwo=document.createElement('span');
titleSpanTwo.className='text-[#1EFE80] font-semibold';
titleSpanTwo.textContent='SECT-111';
titleSpan.appendChild(titleSpanTwo);
courseTitle.appendChild(titleSpan);
cousreInstructor.appendChild(instructorSpan);
instructorSpan.appendChild(courseEcts);
courseEcts.appendChild(ectsSpan);
var cousreInstructor=document.createElement('h5');
cousreInstructor.className='';
cousreInstructor.textContent='Instructor:';
var instructorSpan=document.createElement('span');
instructorSpan.className='';
instructorSpan.textContent='Nuniyat K.';
var courseEcts=document.createElement('h5');
courseEcts.className='';
courseEcts.textContent='ECTS:';
var ectsSpan=document.createElement('span');
ectsSpan.className='text-[#1EFE80]';
ectsSpan.textContent='5';
document.getElementById('list-of-courses').appendChild(courseItemContainer);








