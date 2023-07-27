let blogIndex = $('#blog')[0]
let page = $('.page')[0]
let blogIndexContainer = document.createElement('div')
let posts = []
let postCache = []
$.ajax({url:`${postSource}/posts`}).done(function(data){
    posts = data.posts
    try {
        for (let post of data.posts) {
            let div = document.createElement('div')
            div.innerHTML = `
            <a class="innerHeader"><span class='postCounter'>#${post.id+1}</span> <a class='innerHeader link' onclick='displayPost(${post.id})'>${post.title}</a></a>
            <br>
            <a>${new Date(post.postedAt*1000).toLocaleDateString()} • ${post.header}</a>
            `
            blogIndexContainer.appendChild(div)
        }
        blogIndex.innerHTML = blogIndexContainer.innerHTML
    } catch (error) {
        console.error(error)
        $("#blogLoad")[0].innerHTML = `<b>failed to display posts!</b><br>check developer console for details`
    }
	

}).fail(function(e) {
    console.log(e)
    if (e.status == 200) console.error(`got status code 200 - most likely JSON parsing error`)
    $("#blogLoad")[0].innerHTML = `<b>failed to load posts!</b><br>check developer console for details`
})

function displayPost(id) {
    let post = posts.find(post => post.id == id)
    if (!post) return;
    blogIndex.dataset.postopen = "1"
    blogIndex.style.height = '50vh'
    $('.pageHeader')[0].innerHTML = post.title
    $('.pageSubheader')[0].innerHTML = post.header
    blogIndex.innerHTML = `<a id='postLoad'>loading post...</a>`
    $('.links')[0].innerHTML = `<a class='link' onclick='exitPost()'>go back</a>`
    let cachedPost = postCache.find(post => post.id == id)
    if (!cachedPost) {
        $.ajax({url: `${postSource}/post/${id}`}).done(function(data) {
            try {
                postCache.push({id: id, content: data.content})
                parsePost(data.content)
            } catch (error) {
                console.error(error)
                blogIndex.innerHTML = `<b>failed to display post!</b><br>check developer console for details`
            }
        }).fail(function(e) {
            console.log(e)
            if (e.status == 200) console.error(`got status code 200 - most likely JSON parsing error`)
            blogIndex.innerHTML = `<b>failed to load post!</b><br>check developer console for details`
        })
    } else parsePost(cachedPost.content)
    
}

function exitPost() {
    blogIndex.dataset.postopen = ""
    blogIndex.style.height = '25vh'
    $('.links')[0].innerHTML = tabLinks.join(" • ")
    blogIndex.innerHTML = blogIndexContainer.innerHTML
    nav('blog')
}

function parsePost(content) {
    try {
        blogIndex.innerHTML = marked.parse(content.join('\n'))
    } catch (error) {
        console.error(error)
        blogIndex.innerHTML = `<b>failed to display post!</b><br>check developer console for details`
    }
}
