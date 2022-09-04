const loadNavBarData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const data = await res.json();
    displayNavBarData(data.data.news_category);
};
const displayNavBarData = (data) => {
    const navUl = document.getElementById('category_menu');
    data.forEach((item) => {
        const navLi = document.createElement('li');
        console.log(item)
        // navLi.classList.add('nav-item');
        navLi.innerHTML = `
        <a class="nav-link"  onclick="loadPosts('${item.category_id}', '${item.category_name}')" ">${item.category_name}</a>
        `
        navUl.appendChild(navLi);
    })

}
const loadPosts = async(id, category) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayPosts(data.data, category)
    console.log(data.data)
}
const displayPosts = (data, category) => {
    // const postap = document.getELementById('post_container')
    const menuUl = document.getElementById('post_container')
    menuUl.innerHTML = "";
    const postCount = document.getElementById('post_count');
    postCount.classList.add('post_count_css')
    const message = ` items found for category ${category}`
    postCount.innerHTML = `${data.length ? data.length.toString().concat(message) : "No Post Found"}`
    // console.log(postap)
    data.forEach((item) => {
        console.log(item)
        const postContent = document.createElement('div');
        postContent.innerHTML = `
    <div class="row mb-4 single_post d-flex align-items-center" >
                    <div class="col-md-3">
                        <img src="${item.thumbnail_url}" alt="">
                    </div>
                    <div class="col-md-9">
                        <h4>${item.title}</h4>
                        <p>${item.details.slice(0, 200)}</p>
                        <p>${item.details.slice(200, 350)}</p>
                        <div class="row d-flex align-items-center justify-content-center">
                            <div class="col-md-3 d-flex align-items-center gap-3">
                                <div class="w-25">
                                    <img class="w-100 rounded-circle" src="${item.author.img}" alt="">
                                </div>
                                <div class="w-75">
                                    <span>${item.author.name}</span>
                                    <span>${item.author.published_date ? item.author.published_date.slice(0, 10) :"No Date Found"}</span>
                                </div>
                            </div>
                            <div class="col-md-3 fs-4 fw-semibold d-flex align-items-center gap-2 justify-content-center">
                                <span ><i class="bi bi-eye"></i></span>
                                <span class="fs-5">${item.total_view}</span>
                            </div>
                            <div class="col-md-3">
                                <span class="text-warning fs-4">
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                </span>
                            </div>
                            <div class="col-md-3">
                                <span><i class="bi bi-arrow-right text-primary fs-2 "></i></span>
                            </div>
                        </div>
                    </div>
                </div>
    `
    menuUl.appendChild(postContent);
    })
}
loadPosts('08', 'All Results')
loadNavBarData()