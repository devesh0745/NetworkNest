{
    //method to submit the form data for new post using AJAX.
    let createPost=function(){
        let newPostForm=$('#new-post-form');

        newPostForm.submit(function(e){
            //To prevent default submission of the form.
            e.preventDefault();

            //To manually submit data using ajax
            $.ajax({
                type:'post',
                url:'/posts/create',
                //It will convert form data in json format
                data:newPostForm.serialize(),
                success: function(data){
                    //data is json data
                    let newPost=newPostDom(data.data.post);
                    $(`#post-list-container>ul`).prepend(newPost);
                },error: function(error){
                    console.log("error");
                }
            })
        });
    }

    //method to create post in a DOM
    let newPostDom=function(post){
        return $(`<li id="post-${post._id}">
        
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">del</a>
            </small>
        
            ${post.content}
            ${post.user.name}
        <div class="post-comment">
                <form action="/comments/create" method="post">
                    <input type="text" name="content" id="" placeholder="Add Comment" required>
                    <!--value will pass the post id which will be used in action when form is submitted-->
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" name="" id="">
                </form>
            <div class="post-comment-list">
                <ul id="post-comment-${post._id}">
                        
                </ul>

            </div>
        </div>
        
    </li>`)
    }

    //method to delete post from DOM
/*    let deletePost=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                //will get the href link in url
                url:$(deleteLink).prop('href'),
            })
        })
    }*/

    createPost();
}