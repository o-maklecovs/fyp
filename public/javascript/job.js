const query = window.location.search;
const params = new URLSearchParams(query);
const jobId = params.get('id');

async function save(id) {
    const unsaveBtn = document.createElement('button');
    unsaveBtn.textContent = 'Unsave';
    unsaveBtn.addEventListener('click', () => unsave(id));
    saveBtn.remove();
    const jobControls = document.querySelector('.job-controls');
    jobControls.appendChild(unsaveBtn);
    await fetch(`/savejob?id=${id}`, {
        method: 'POST',
        mode: 'same-origin'
    });
}

async function unsave(id) {
    // unsave job
}

const saveBtn = document.querySelector('#save-job');

if (saveBtn) {
    saveBtn.addEventListener('click', () => save(jobId));
}

const unsaveBtn = document.querySelector('.unsave-job');

if (unsaveBtn) {
    unsaveBtn.addEventListener('click', () => unsave(jobId));
}