// script.js

document.addEventListener('DOMContentLoaded', (event) => {
    loadState();
});

function toggleSection(section) {
    document.getElementById('educativo').classList.add('section-hidden');
    document.getElementById('geral').classList.add('section-hidden');
    
    document.getElementById(section).classList.remove('section-hidden');
    localStorage.setItem('activeSection', section);
}

function addPost(section) {
    const postText = document.getElementById(`${section}-post-text`).value;
    const postMedia = document.getElementById(`${section}-post-media`).files[0];
    const postContainer = document.getElementById(`${section}-posts`);

    if (postText.trim() || postMedia) {
        const postId = Date.now(); // Unique ID for each post
        const post = document.createElement('div');
        post.className = 'post';
        post.dataset.id = postId;

        if (postText.trim()) {
            const postContent = document.createElement('p');
            postContent.textContent = postText;
            post.appendChild(postContent);
        }

        if (postMedia) {
            if (postMedia.type.startsWith('image/')) {
                const postImage = document.createElement('img');
                postImage.src = URL.createObjectURL(postMedia);
                post.appendChild(postImage);
            } else if (postMedia.type.startsWith('video/')) {
                const postVideo = document.createElement('video');
                postVideo.src = URL.createObjectURL(postMedia);
                postVideo.controls = true;
                post.appendChild(postVideo);
            }
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Deletar';
        deleteButton.onclick = function() {
            deletePost(section, postId);
        };
        post.appendChild(deleteButton);

        const commentSection = document.createElement('div');
        commentSection.className = 'comment-section';

        const commentForm = document.createElement('div');
        commentForm.className = 'comment-form';

        const commentInput = document.createElement('textarea');
        commentInput.placeholder = 'Escreva um comentário...';

        const commentButton = document.createElement('button');
        commentButton.textContent = 'Comentar';
        commentButton.onclick = function() {
            addComment(commentSection, commentInput.value);
            commentInput.value = '';
        };

        commentForm.appendChild(commentInput);
        commentForm.appendChild(commentButton);

        commentSection.appendChild(commentForm);
        post.appendChild(commentSection);
        postContainer.appendChild(post);

        savePost(section, { id: postId, text: postText, media: postMedia ? URL.createObjectURL(postMedia) : null, mediaType: postMedia ? postMedia.type : null });

        document.getElementById(`${section}-post-text`).value = '';
        document.getElementById(`${section}-post-media`).value = '';
    }
}

function addComment(commentSection, commentText) {
    if (commentText.trim()) {
        const comment = document.createElement('div');
        comment.className = 'comment';

        const commentContent = document.createElement('p');
        commentContent.textContent = commentText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Deletar';
        deleteButton.onclick = function() {
            comment.remove();
        };

        comment.appendChild(commentContent);
        comment.appendChild(deleteButton);
        commentSection.appendChild(comment);
    }
}

function savePost(section, post) {
    let posts = JSON.parse(localStorage.getItem(`${section}Posts`)) || [];
    posts.push(post);
    localStorage.setItem(`${section}Posts`, JSON.stringify(posts));
}

function deletePost(section, postId) {
    let posts = JSON.parse(localStorage.getItem(`${section}Posts`)) || [];
    posts = posts.filter(post => post.id !== postId);
    localStorage.setItem(`${section}Posts`, JSON.stringify(posts));
    loadPosts(section);
}

function loadState() {
    const activeSection = localStorage.getItem('activeSection') || 'educativo';
    toggleSection(activeSection);
    loadPosts('educativo');
    loadPosts('geral');
}

function loadPosts(section) {
    const posts = JSON.parse(localStorage.getItem(`${section}Posts`)) || [];
    const postContainer = document.getElementById(`${section}-posts`);
    postContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.dataset.id = post.id;

        if (post.text) {
            const postContent = document.createElement('p');
            postContent.textContent = post.text;
            postElement.appendChild(postContent);
        }

        if (post.media) {
            if (post.mediaType.startsWith('image/')) {
                const postImage = document.createElement('img');
                postImage.src = post.media;
                postElement.appendChild(postImage);
            } else if (post.mediaType.startsWith('video/')) {
                const postVideo = document.createElement('video');
                postVideo.src = post.media;
                postVideo.controls = true;
                postElement.appendChild(postVideo);
            }
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Deletar';
        deleteButton.onclick = function() {
            deletePost(section, post.id);
        };
        postElement.appendChild(deleteButton);

        const commentSection = document.createElement('div');
        commentSection.className = 'comment-section';

        const commentForm = document.createElement('div');
        commentForm.className = 'comment-form';

        const commentInput = document.createElement('textarea');
        commentInput.placeholder = 'Escreva um comentário...';

        const commentButton = document.createElement('button');
        commentButton.textContent = 'Comentar';
        commentButton.onclick = function() {
            addComment(commentSection, commentInput.value);
            commentInput.value = '';
        };

        commentForm.appendChild(commentInput);
        commentForm.appendChild(commentButton);

        commentSection.appendChild(commentForm);
        postElement.appendChild(commentSection);
        postContainer.appendChild(postElement);
    });
}
