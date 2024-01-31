document.addEventListener('DOMContentLoaded', function() {
    var greetingContainer = document.createElement('div');
    greetingContainer.className = 'border border-[#1EFE80] rounded p-5';

   
    var heading = document.createElement('h1');
    heading.className = 'text-4xl text-[#1EFE80]';

    var profileNameSpan = document.createElement('span');
    profileNameSpan.className = 'text-xl';
    profileNameSpan.textContent = ' Fundamentals of Software Engineering';
    profileNameSpan.style.color = 'white';

    heading.textContent = 'SECT-111  ';
    heading.appendChild(profileNameSpan);
    heading.textContent += '.';

    var paragraph1 = document.createElement('p');
    paragraph1.textContent = "Instructor:Nuniyat K.";
    

    var paragraph2 = document.createElement('p');
    paragraph2.innerHTML = 'You have <span class="text-yellow-300 text-4xl mx-2">4</span> pending tasks for the day';

    
    greetingContainer.appendChild(heading);
    greetingContainer.appendChild(paragraph1);
    greetingContainer.appendChild(paragraph2);

   
    var taskHeadingElement = document.getElementById('taskHeading');

    taskHeadingElement.insertAdjacentElement('afterend', greetingContainer);
});
