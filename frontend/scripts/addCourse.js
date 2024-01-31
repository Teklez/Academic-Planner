document.addEventListener('submit', (e) => {
    e.preventDefault();
    addCourse();
});

function addCourse() {
    fetch('http://localhost:5500/course/create', {
        method: 'POST',
        headers: {
            'content-type': 'application/json; charset=utf-8',
            Authorization: localStorage.getItem(access_token),
        },
        body: JSON.stringify({
            courseName: document.getElementById('courseName').value.trim(),
            instructor: document.getElementById('instructor').value.trim(),
            courseCode: document.getElementById('courseCode').value.trim(),
            startDate: document.getElementById('startDate').value.trim(),
            endDate: document.getElementById('endDate').value.trim(),
        }),
    })
        .then((res) => {
            if (res.ok) {
                console.log('Course sent successfully.');
            } else {
                console.log('HTTP status: ', res.status);
            }
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
}
