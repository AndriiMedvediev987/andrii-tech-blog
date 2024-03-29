// create new post - text and title
const newPostHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#post-title').value.trim();
  const text = document.querySelector('#post-text').value.trim();

  if (title && text) {
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({ title, text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
 }
};

document
  .querySelector('.new-post-form')
  .addEventListener('click', newPostHandler);