function getURL(resourse) {
	return `https://jsonplaceholder.typicode.com/${resourse}`;
}

function makePostCard(title, body, postId) {
	let $card = document.createElement('div');
	$card.classList.add('card');

	let $title = document.createElement('div');
	$title.classList.add('card__title');
	$title.innerHTML = title;
	$card.appendChild($title);

	let $body = document.createElement('div');
	$body.classList.add('card__body');
	$body.innerHTML = body;
	$card.appendChild($body);

	let $userBlock = document.createElement('div');
	$userBlock.classList.add('user__block');
	$userBlock.id = 'userBlock_id_' + postId;
	$card.appendChild($userBlock);

	let $openUser = document.createElement('button');
	$openUser.classList.add('card__btn-user');
	$openUser.id = 'card_btn_user_' + postId;
	$openUser.innerHTML = 'About author';
	$userBlock.appendChild($openUser);

	let $commentsBlock = document.createElement('div');
	$commentsBlock.classList.add('comments__block');
	$commentsBlock.id = 'commentsBlock_id_' + postId;
	$card.appendChild($commentsBlock);

	let $openComments = document.createElement('button');
	$openComments.classList.add('card__btn-comments');
	$openComments.id = 'card_btn_comments_' + postId;
	$openComments.innerHTML = 'Comments to post';
	$commentsBlock.appendChild($openComments);

	return $card;
}

function makeComments(name, body, commentId) {

	let $comment = document.createElement('div');
	$comment.classList.add('comment');

	let $name = document.createElement('div');
	$name.classList.add('comment__title');
	$name.innerHTML = name;
	$comment.appendChild($name);

	let $body = document.createElement('div');
	$body.classList.add('comment__body');
	$body.innerHTML = body;
	$comment.appendChild($body);

	return $comment;
}

function makeUser(name, username, email) {
	let $user = document.createElement('div');
	$user.classList.add('user');

	let $name = document.createElement('div');
	$name.classList.add('user__name');
	$name.innerHTML = `Name: ${name}`;
	$user.appendChild($name);

	let $username = document.createElement('div');
	$username.classList.add('user__username');
	$username.innerHTML = `Username: ${username}`;
	$user.appendChild($username);

	let $useremail = document.createElement('div');
	$useremail.classList.add('user__email');
	$useremail.innerHTML = `Email: ${email}`;
	$user.appendChild($useremail);

	return $user;	
}

let postId = [];

fetch(getURL('posts')) 
	.then(response => response.json())
	.then(posts => {
		for(let post of posts.slice(0, 9)){
			postId.push(post.id)
			let $wrapper = document.querySelector('.wrapper');
			$wrapper.appendChild(makePostCard(post.title, post.body, post.id));
		}
	})

	.then(users => fetch(getURL('users')))
	.then(response => response.json())
	.then(users => {
		for(let user of users.slice(0, 9)) {
			for(let idOfPost of postId) {
				if(user.id == idOfPost) {
					let $button = document.getElementById('card_btn_user_' + idOfPost)
					$button.addEventListener('click', function(){
						let $card = document.getElementById('userBlock_id_' + idOfPost)
						$card.appendChild(makeUser(user.name, user.username, user.email));
					}, {once: true})
				}
			}
		}
	})

	.then(comments => fetch(getURL('comments')))
	.then(response => response.json())
	.then(comments => {
		for(let comment of comments.slice(0, 45)) {
			for(let idOfPost of postId) {
				if(comment.postId == idOfPost) {
					let $button = document.getElementById('card_btn_comments_' + idOfPost)
					$button.addEventListener('click', function(){
						let $card = document.getElementById('commentsBlock_id_' + idOfPost)
						$card.appendChild(makeComments(comment.name, comment.body, comment.id));
					}, {once: true})
				}
			}
		}
	})

	// for(let idOfComment of commentsId) {
						// 	for(let user of arrayUsers.slice(0,9)) {
						// 		if(idOfComment == user.id) {
						// 			let $nameOfComment = document.getElementById('comment_btn_' + idOfComment)
						// 			if ($nameOfComment) {
						// 				$nameOfComment.addEventListener('click', function() {
						// 					let $comment = document.getElementById('comment_id_' + idOfComment)
						// 					$comment.appendChild(makeUsers(user.name, user.username, user.email));
						// 				})
						// 			}
						// 		}
						// 	}
						// }


		



















// for(let comment of comments.slice(0, 45)) {
// 			for(let $postId of postId) {
// 				if(comment.postId === $postId) {
// 					let $buttons = document.getElementsByClassName('card__btn')
// 					for(let $button of $buttons){
// 						$button.addEventListener('click', function(){
// 							let $card = document.getElementById('card_id_' + $postId)
// 							$card.appendChild(makeComments(comment.name, comment.body));
// 						})
// 					}
// 				}
// 			}
// 		}





