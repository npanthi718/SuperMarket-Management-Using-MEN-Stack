document.addEventListener('DOMContentLoaded', () => {
    const greetingElement = document.getElementById('greeting');
    const dateTimeElement = document.getElementById('date-time');

    const now = new Date();
    const hours = now.getHours();

    let greeting = 'Good Morning';
    if (hours >= 12 && hours < 18) greeting = 'Good Afternoon';
    else if (hours >= 18) greeting = 'Good Evening';

    greetingElement.textContent = `${greeting}! All of you. `;
    dateTimeElement.textContent = `Today's Date: ${now.toDateString()}, Time: ${now.toLocaleTimeString()}`;
});
