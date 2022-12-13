const data = [{
    id: 1,
    name: "Invicta Men's Pro Diver",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    category: "Dress",
},
    {
        id: 11,
        name: "Invicta Men's Pro Diver 2",
        img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
        price: 74,
        category: "Dress",
    },
    {
        id: 2,
        name: "Timex Men's Expedition Scout ",
        img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
        price: 40,
        category: "Sport",
    },
    {
        id: 3,
        name: "Breitling Superocean Heritage",
        img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
        price: 200,
        category: "Luxury",
    },
    {
        id: 4,
        name: "Casio Classic Resin Strap ",
        img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
        price: 16,
        category: "Sport",
    },
    {
        id: 5,
        name: "Garmin Venu Smartwatch ",
        img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
        price: 74,
        category: "Casual",
    },
];

const productsWrapper = document.querySelector(".products")
const searchInput = document.querySelector(".search")
const category = document.querySelector(".cat")
const priceRange = document.querySelector(".priceRange")
const priceValue = document.querySelector(".priceValue")

const displayProducts = (arrayOfProducts) => {
    productsWrapper.innerHTML = arrayOfProducts.map(item => `<div class="product">
    <img src="${item.img}" alt="" />
    <span class="name">${item.name}</span>
    <span class="priceText">${item.price} $</span>
  </div>`).join("")
}

displayProducts(data)

searchInput.addEventListener("keyup", (event) => {
    const value = event.target.value.toLowerCase()
    if (value) {
        const filteredArray = data.filter(item => item.name.toLowerCase().includes(value))
        displayProducts(filteredArray);
    } else {
        displayProducts(data);
    }
})

const setCategory = () => {
    const allCategories = data.map((product) => product.category)
    const filteredCategory = allCategories.filter((item, index) =>
        allCategories.indexOf(item) === index
    );

    category.innerHTML = filteredCategory.map(category => `<span class="category">${category}</span>`).join("")

    category.addEventListener("click", (event) => {
        const selectedCategory = event.target.textContent;

        if (selectedCategory) {
            const sortProductsByCategory = data.filter(product => product.category === selectedCategory)
            displayProducts(sortProductsByCategory);
        } else {
            displayProducts(data);
        }
    })
}

const setPrices = () => {
    const priceList = data.map(product => product.price)

    const minPrice = Math.min(...priceList)
    const maxPrice = Math.max(...priceList)

    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceRange.value = maxPrice;
    priceRange.step = 10;

    priceValue.textContent = `$ ${maxPrice}`

    priceRange.addEventListener("input", (event) => {
        const value = event.target.value;
        priceValue.textContent = `$ ${value}`

        const filteredArray = data.filter(product => product.price <= value)
        displayProducts(filteredArray);
    })
}

setCategory()
setPrices()